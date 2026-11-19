#!/usr/bin/env python3
"""Audit learner-facing HTML and keep old standalone asset URLs compatible."""
import argparse
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
SKIP = {"Platform-pilot", "Handoff", ".git"}
DIAGNOSTICS = re.compile(r"\b(?:search (?:budget|steps|nodes)|nodes (?:visited|explored)|solver diagnostics)\b", re.I)
DATA_SCRIPT = {"application/json", "application/ld+json", "x-shader/x-vertex", "x-shader/x-fragment", "text/plain"}


class CheckPage(HTMLParser):
    def __init__(self, path, problems):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.problems = problems
        self.script = ""
        self.details = []
        self.refs = []
        self.feed(path.read_text(encoding="utf-8"))
        self.close()

    def issue(self, message):
        self.problems.append(f"{self.path.relative_to(ROOT)}:{self.getpos()[0]} {message}")

    def handle_starttag(self, tag, items):
        attrs = dict(items)
        if tag == "details":
            self.details.append("open" not in attrs)
        if tag == "script":
            self.script = "ignore" if attrs.get("type", "").lower() in DATA_SCRIPT or attrs.get("src") else "executable"
        if tag == "style" or "style" in attrs or any(key.startswith("on") for key in attrs):
            self.issue("move authored CSS and event bindings into a site asset")
        if tag == "meta" and attrs.get("name", "").lower() == "viewport":
            viewport = attrs.get("content", "")
            limit = re.search(r"maximum-scale\s*=\s*([\d.]+)", viewport, re.I)
            if re.search(r"user-scalable\s*=\s*(?:no|0)\b", viewport, re.I) or (limit and float(limit[1]) < 2):
                self.issue("keep browser zoom available")
        if tag == "script" and attrs.get("src"):
            self.refs.append(attrs["src"])
        if tag == "link" and "stylesheet" in attrs.get("rel", "").split():
            self.refs.append(attrs.get("href", ""))

    def handle_endtag(self, tag):
        if tag == "script":
            self.script = ""
        if tag == "details" and self.details:
            self.details.pop()

    def handle_data(self, data):
        if self.script == "executable" and data.strip():
            self.issue("inline executable JavaScript")
        if not self.script and not any(self.details) and DIAGNOSTICS.search(data):
            self.issue("move solver diagnostics into a closed disclosure")


def aliases(sync, problems):
    manifest = json.loads((ASSETS / "legacy-asset-aliases.json").read_text())
    for canonical, legacy_paths in manifest.items():
        content = (ROOT / canonical).read_bytes()
        for legacy in legacy_paths:
            target = ROOT / legacy
            if target.is_file() and target.read_bytes() == content:
                continue
            if sync:
                target.write_bytes(content)
            else:
                problems.append(f"{legacy} differs from {canonical}. Use --sync-legacy after editing its canonical file.")
    return len(manifest)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--sync-legacy", action="store_true", help="refresh compatibility copies from the canonical asset files")
    args = parser.parse_args()
    problems = []
    count = aliases(args.sync_legacy, problems)
    pages = 0
    for path in sorted(ROOT.rglob("*.html")):
        if path.relative_to(ROOT).parts[0] in SKIP:
            continue
        page = CheckPage(path, problems)
        pages += 1
        local_assets = set()
        for ref in page.refs:
            url = urlsplit(ref)
            if url.scheme or url.netloc:
                continue
            target = ((ROOT if url.path.startswith("/") else path.parent) / unquote(url.path).lstrip("/")).resolve()
            if target.is_relative_to(ROOT):
                local_assets.add(target.relative_to(ROOT).as_posix())
            if not target.is_relative_to(ROOT) or not target.is_file():
                problems.append(f"{path.relative_to(ROOT)}: unresolved asset {ref}")
        shared_entries = {"mw-design/themes.js", "mw-design/main.css", "assets/css/curriculum-map.css",
                          "assets/css/site-map.css", "assets/css/reading.css"}
        if not local_assets.intersection(shared_entries):
            problems.append(f"{path.relative_to(ROOT)}: learner page needs the shared reading stylesheet")
    for entry in ["mw-design/main.css", "assets/css/curriculum-map.css", "assets/css/site-map.css"]:
        if "reading.css" not in (ROOT / entry).read_text():
            problems.append(f"{entry}: include the shared readable type scale")
    for css in ROOT.rglob("*.css"):
        if css.relative_to(ROOT).parts[0] in SKIP:
            continue
        for selector, size in re.findall(r"([^{}]+)\{[^{}]*?font-size\s*:\s*([0-9.]+)px\s*!important", css.read_text(), re.I):
            # Peg markings sit inside individual counters. Their full descriptions accompany the board.
            if float(size) < 16 and ".turn .peg" not in selector:
                problems.append(f"{css.relative_to(ROOT)}: forced {size}px interface text in {selector.strip()}")
    if problems:
        raise SystemExit("\n".join(problems))
    print(f"Checked {pages} public pages, their local scripts and styles, and {count} compatibility groups.")


if __name__ == "__main__":
    main()
