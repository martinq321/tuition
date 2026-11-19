#!/usr/bin/env python3
"""Check the curriculum's published references, unit routes and static links."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
CURRICULUM = ROOT / "curriculum"
DATA = CURRICULUM / "data"
# DfE subject-content code ranges. The two qualifications use different codes.
GCSE = dict(N=16, A=25, R=16, G=25, P=9, S=6)
A_LEVEL = dict(A=1, B=11, C=4, D=6, E=9, F=7, G=6, H=8, I=4,
               J=5, K=1, L=4, M=3, N=3, O=3, P=1, Q=5, R=6, S=1)


def load(name):
    return json.loads((DATA / name).read_text(encoding="utf-8"))


def require(condition, message):
    if not condition:
        raise ValueError(message)


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.ids = set()
        self.links = set()
        self.feed(path.read_text(encoding="utf-8"))
        self.close()

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        identifier = values.get("id")
        if identifier:
            require(identifier not in self.ids, f"Duplicate id {identifier} on {self.path}")
            self.ids.add(identifier)
        require(not any(k.startswith("on") for k in values), f"Inline handler on {self.path}")
        if tag == "script":
            require(values.get("src"), f"Inline script on {self.path}")
        for key in ("href", "src"):
            if values.get(key):
                self.links.add(values[key])


def check_spec(actual, sections, title):
    expected = {f"{letter}{i}" for letter, count in sections.items() for i in range(1, count + 1)}
    require(actual == expected, f"{title} references differ: {sorted(actual ^ expected)}")


def main():
    pages = {path: Page(path) for path in CURRICULUM.rglob("index.html")}
    map_path = ROOT / "site-map/index.html"
    link_targets = {**pages, map_path: Page(map_path)}
    investigations = load("investigation-links.json")
    activity_data = json.loads((ROOT / "development/curriculum/activity-audit.json").read_text())
    activities = {a["id"]: ROOT / a["path"] for a in activity_data["activities"]}
    themes = json.loads((ROOT / "data/theme-paths.json").read_text())["themes"]
    theme_for = {activity:t["id"] for t in themes for activity in t["steps"]}
    activity_count = 0
    expected = {CURRICULUM / "index.html"}
    connections = load("connections.json")
    unit_keys = set()
    gcse_codes, a_level_codes = set(), set()
    objective_count = 0
    for year in range(1, 14):
        content = load(f"year-{year}.json")
        year_root = CURRICULUM / f"year-{year}"
        expected.add(year_root / "index.html")
        for term in content["terms"]:
            for unit in term["units"]:
                key = f"year-{year}/units/{unit['slug']}"
                unit_keys.add(key)
                path = CURRICULUM / key / "index.html"
                expected.add(path)
                require(path in pages, f"Missing unit page {key}")
                rendered = pages[path].links
                for edge in investigations.get(key, []):
                    activity = edge["activity"]
                    require(any((path.parent / unquote(urlsplit(link).path)).resolve() == activities[activity]
                                for link in rendered), f"Missing activity link {key} to {activity}")
                    require(any(urlsplit(link).fragment == theme_for[activity] for link in rendered),
                            f"Missing theme link {key} to {theme_for[activity]}")
                    activity_count += 1
                objective_count += len(unit["objectives"]) + len(unit.get("higher", []))
                reference = "#page=" + str(unit["sourcePage"])
                require(any(link.endswith(reference) for link in pages[path].links),
                        f"Missing official PDF page reference for {key}")
                if year in (10, 11):
                    gcse_codes.update(unit["specCodes"])
                if year in (12, 13):
                    a_level_codes.update(unit["specCodes"])
    check_spec(gcse_codes, GCSE, "GCSE")
    check_spec(a_level_codes, A_LEVEL, "A-level")
    require(set(pages) == expected, "Generated page list is out of date")
    require(connections.keys() == unit_keys, "Progression links must use the current unit IDs")
    pairs = set()
    for key, neighbours in connections.items():
        require(key not in neighbours and len(neighbours) == len(set(neighbours)), f"Invalid links for {key}")
        for other in neighbours:
            require(other in unit_keys and key in connections[other], f"Unpaired unit link {key} to {other}")
            pairs.add(tuple(sorted((key, other))))
    for path, page in pages.items():
        for link in page.links:
            url = urlsplit(link)
            if url.scheme == "https":
                continue
            require(not url.scheme and not url.netloc, f"Unsupported link {link} on {path}")
            dest = (path.parent / unquote(url.path)).resolve() if url.path else path
            require(dest.is_relative_to(ROOT) and dest.is_file(), f"Missing {link} on {path}")
            if url.fragment:
                require(dest in link_targets and unquote(url.fragment) in link_targets[dest].ids,
                        f"Missing anchor {link} on {path}")
    print(f"Checked {len(pages)} pages, {len(unit_keys)} units, {objective_count} objectives "
          f"and {len(pairs)} connected pairs across 13 years, with {activity_count} investigation links.")


if __name__ == "__main__":
    main()
