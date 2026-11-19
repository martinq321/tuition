#!/usr/bin/env python3
"""Generate the public curriculum using Python's standard library."""
import html
import json
import posixpath
import re
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "curriculum" / "data"
HOME = "curriculum/index.html"
STAGES = [
    ("Key Stage 1", [1, 2]),
    ("Lower Key Stage 2", [3, 4]),
    ("Upper Key Stage 2", [5, 6]),
    ("Key Stage 3", [7, 8, 9]),
    ("GCSE Mathematics", [10, 11]),
    ("A-level Mathematics", [12, 13]),
]


def esc(value):
    return html.escape(str(value), quote=True)


def year_path(number):
    return f"curriculum/year-{number}/index.html"


def unit_path(number, unit):
    return f"curriculum/year-{number}/units/{unit['slug']}/index.html"


def rel(page, target):
    return posixpath.relpath(target, posixpath.dirname(page))


def stage(number):
    return next(title for title, numbers in STAGES if number in numbers)


def unit_list(year):
    return [(term["name"], unit) for term in year["terms"] for unit in term["units"]]


def layout(path, title, description, body):
    home = rel(path, HOME)
    css = rel(path, "assets/css/curriculum-map.css")
    script = rel(path, "assets/js/curriculum-map.js")
    return f'''<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{esc(description)}">
  <title>{esc(title)}</title>
  <link rel="stylesheet" href="{css}">
  <script defer src="{script}"></script>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="mast"><div class="wrap mast-row">
    <a class="brand" href="{home}"><span class="mark" aria-hidden="true">m</span><span>Maths curriculum</span></a>
    <nav aria-label="Main navigation"><a href="{home}#years">Years 1–13</a><a href="{home}#find">Find a unit</a></nav>
  </div></header>
  <main id="main" class="wrap">{body}</main>
  <footer class="wrap foot"><span>Mathematics curriculum for England</span><a href="{home}">All years</a></footer>
</body>
</html>
'''


def crumbs(path, ancestors):
    links = [f'<a href="{rel(path, dest)}">{esc(label)}</a>' for dest, label in ancestors]
    return '<nav class="crumbs" aria-label="Breadcrumb">' + ' <span aria-hidden="true">/</span> '.join(links) + '</nav>'


def year_chips(page, years, current=None):
    links = []
    for year in years:
        selected = ' aria-current="page"' if year == current else ''
        links.append(f'<a href="{rel(page, year_path(year))}"{selected}>Year {year}</a>')
    return ''.join(links)


def per_year_note(number):
    if number <= 6:
        return "The programme of study gives primary content by year. Schools may introduce content earlier or later within the key stage. The term order here is a suggested teaching sequence."
    if number <= 9:
        return "The national programme specifies content across Key Stage 3. The year and term allocations here form a suggested teaching sequence."
    if number <= 11:
        return "This is a suggested two-year GCSE sequence for England. Foundation and Higher share core content. Higher-only objectives are identified within each unit."
    return "This is a suggested two-year sequence for standard A-level Mathematics in England. It covers pure mathematics, statistics and mechanics. Check the chosen exam board for assessment and large-data-set details."


def render_sources(sources, unit=None):
    links = []
    numbered = False
    for source in sources:
        url = source["url"]
        parts = urlsplit(url)
        if unit and not numbered and unit.get("sourcePage") and parts.path.lower().endswith(".pdf"):
            url = urlunsplit((parts.scheme, parts.netloc, parts.path, parts.query, f"page={int(unit['sourcePage'])}"))
            numbered = True
        note = f'<p>{esc(source["description"])}</p>' if source.get("description") else ''
        links.append(f'<li><a href="{esc(url)}">{esc(source["title"])}</a>{note}</li>')
    return '<section class="sources" aria-label="Curriculum sources"><h2>Curriculum sources</h2><ul>' + ''.join(links) + '</ul></section>'


def goals_list(goals):
    return '<ul class="goals">' + ''.join(f'<li>{esc(goal)}</li>' for goal in goals) + '</ul>'


def goals(unit, number):
    common = unit.get("objectives", [])
    higher = unit.get("higher", [])
    shared_label = "Foundation and Higher" if number in (10, 11) else "Learning objectives"
    sections = []
    for label, items in [(shared_label, common), ("Higher only", higher)]:
        if items:
            sections.append(f'<section class="outcomes"><h2>{label}</h2>{goals_list(items)}</section>')
    return ''.join(sections)


DOMAINS = {
    "A": "algebra", "AL": "algebra", "AS": "addition subtraction",
    "D": "statistics probability data", "FR": "fractions", "G": "geometry measures",
    "GS": "geometry shape", "MD": "multiplication division", "ME": "measurement",
    "N": "number", "NPV": "number place value", "OP": "four operations",
    "PD": "position direction geometry", "R": "ratio proportion", "RA": "ratio proportion",
    "ST": "statistics data", "W": "reasoning proof problem solving",
}


def search_units(years):
    items = []
    for year in years:
        number = year["year"]
        for term, unit in unit_list(year):
            info = f"Year {number} · {term}"
            tags = [stage(number), unit.get("strand", ""), *unit.get("specCodes", [])]
            for code in unit.get("objectiveIds", []):
                parts = code.split("-")
                if len(parts) > 1:
                    domain = DOMAINS.get(parts[1], "")
                    if domain and domain not in tags:
                        tags.append(domain)
            if number in (10, 11):
                if unit.get("objectives"):
                    tags.extend(["Foundation", "Higher"])
                if unit.get("higher"):
                    tags.append("Higher only")
            text = " ".join([unit["title"], info, *tags, *unit.get("objectives", []), *unit.get("higher", [])])
            items.append(f'<li data-year="{number}" data-search="{esc(text)}"><a href="{rel(HOME, unit_path(number, unit))}">{esc(unit["title"])}</a><span>{esc(info)}</span></li>')
    return ''.join(items)


def home_page(years):
    stage_sections = []
    for title, numbers in STAGES:
        links = year_chips(HOME, numbers)
        stage_sections.append(f'<section class="stage"><h3>{esc(title)}</h3><div class="year-links">{links}</div></section>')
    body = f'''
<section class="hero"><p class="eyebrow">England · Years 1–13</p>
<h1>Mathematics curriculum</h1>
<p class="lede">Explore each year’s units and learning objectives, from counting in Year 1 to pure mathematics, statistics and mechanics at A-level.</p></section>
<section id="years"><div class="section-head"><h2>Browse by year</h2></div>
<div class="stage-grid">{''.join(stage_sections)}</div></section>
<section id="find" class="find"><h2>Find a unit</h2>
<div data-search-ui hidden><label for="query">Search unit titles and learning objectives</label>
<input id="query" type="search" placeholder="Try fractions, quadratic graphs or vectors" autocomplete="off">
<p class="status" id="search-status" aria-live="polite"></p>
<ul class="results" id="results" hidden>{search_units(years)}</ul></div>
<noscript><p>Choose a year above for its full list of units and learning objectives.</p></noscript></section>'''
    return layout(HOME, "Mathematics curriculum for England · Years 1–13", "Browse mathematics units, learning objectives and curriculum sources for Years 1–13 in England.", body)


def unit_entry(year, term, unit):
    number = year["year"]
    unit_url = rel(year_path(number), unit_path(number, unit))
    preview = (unit.get("objectives") or unit.get("higher"))[0]
    label = unit.get("strand", "")
    if number in (10, 11):
        label = "Foundation and Higher" if unit.get("objectives") else "Higher only"
        if unit.get("higher") and unit.get("objectives"):
            label += " · Higher extension"
    meta = f'<span class="unit-meta">{esc(label)}</span>' if label else ''
    objective_count = len(unit.get("objectives", [])) + len(unit.get("higher", []))
    shared = unit.get("objectives", [])
    higher = unit.get("higher", [])
    content = ""
    if shared:
        if number in (10, 11):
            content += '<h4>Foundation and Higher</h4>'
        content += goals_list(shared)
    if higher:
        content += '<h4>Higher only</h4>' + goals_list(higher)
    return (f'<li class="unit-entry">{meta}<h3><a href="{unit_url}">{esc(unit["title"])}</a></h3>'
            f'<p class="preview">{esc(preview)}</p><details class="year-objectives">'
            f'<summary>View objectives ({objective_count})</summary>{content}</details></li>')


def pager(path, previous, following):
    parts = []
    for side, entry in (("Previous", previous), ("Next", following)):
        if entry:
            dest, label = entry
            parts.append(f'<a class="page-{side.lower()}" href="{rel(path, dest)}"><span>{side}</span>{esc(label)}</a>')
    return '<nav class="pager" aria-label="Previous and next">' + ''.join(parts) + '</nav>'


def year_page(year, sources):
    number = year["year"]
    path = year_path(number)
    term_sections = []
    anchors = []
    for term in year["terms"]:
        label = term["name"]
        slug = label.lower()
        anchors.append(f'<a href="#{slug}">{esc(label)}</a>')
        entries = ''.join(unit_entry(year, label, unit) for unit in term["units"])
        term_sections.append(f'<section class="term" id="{slug}"><div class="section-head"><h2>{esc(label)}</h2></div><ul class="unit-grid">{entries}</ul></section>')
    notes = f'<aside class="sequence-note"><h2>About this sequence</h2><p>{esc(per_year_note(number))}</p></aside>'
    prev = (year_path(number - 1), f"Year {number - 1}") if number > 1 else None
    nxt = (year_path(number + 1), f"Year {number + 1}") if number < 13 else None
    body = f'''
{crumbs(path, [(HOME, "Curriculum")])}
<section class="hero"><p class="eyebrow">{esc(stage(number))}</p><h1>Year {number} mathematics</h1>
<p class="lede">{esc(year["intro"])}</p></section>
<div class="year-tools"><nav class="term-links" aria-label="Jump to term">{''.join(anchors)}</nav>
<button type="button" class="expand" data-toggle-objectives hidden>Show all objectives</button></div>
{''.join(term_sections)}{notes}{render_sources(sources)}{pager(path, prev, nxt)}'''
    return layout(path, f"Year {number} mathematics · England curriculum", year["intro"], body)


def connected_units(path, keys, lookup):
    if not keys:
        return ""
    links = []
    for key in keys:
        destination, number, title = lookup[key]
        links.append(f'<li><a href="{rel(path, destination)}">Year {number} · {esc(title)}</a></li>')
    return '<section class="related"><h2>Connected units</h2><ul>' + ''.join(links) + '</ul></section>'


def investigation_index(units):
    links = json.loads((DATA / "investigation-links.json").read_text())
    audit = json.loads((ROOT / "development/curriculum/activity-audit.json").read_text())
    activities = {a["id"]: a for a in audit["activities"]}
    themes = json.loads((ROOT / "data/theme-paths.json").read_text())["themes"]
    theme_for = {activity: theme for theme in themes for activity in theme["steps"]}
    covered = set()
    for unit, entries in links.items():
        if unit not in units or not entries:
            raise ValueError(f"Unknown or empty investigation unit: {unit}")
        seen = set()
        for entry in entries:
            activity = entry["activity"]
            if activity not in activities or activity not in theme_for or activity in seen or not entry["prompt"].strip():
                raise ValueError(f"Invalid investigation link in {unit}: {entry}")
            seen.add(activity)
            covered.add(theme_for[activity]["id"])
    if covered != {t["id"] for t in themes}:
        raise ValueError("Every investigation theme needs a curricular application")
    return links, activities, theme_for


def investigation_section(path, entries, activities, theme_for):
    if not entries:
        return ""
    rows = []
    for entry in entries:
        activity = activities[entry["activity"]]
        theme = theme_for[entry["activity"]]
        rows.append(f'<li><a href="{esc(rel(path, activity["path"]))}">{esc(activity["title"])}</a>'
                    f'<p>{esc(entry["prompt"])}</p><a href="{rel(path, "site-map/index.html")}#{esc(theme["id"])}">'
                    f'Theme: {esc(theme["title"])}</a></li>')
    return '<section class="related investigations"><h2>Try an investigation</h2><ul>' + ''.join(rows) + '</ul></section>'


def unit_page(year, term, unit, prev, nxt, sources, related, investigations):
    number = year["year"]
    path = unit_path(number, unit)
    title = unit["title"]
    strand = f' · {esc(unit["strand"])}' if unit.get("strand") else ''
    codes = ''
    if unit.get("specCodes"):
        codes = '<p class="codes">Specification references <strong>' + ', '.join(esc(c) for c in unit["specCodes"]) + '</strong></p>'
    prev_target = (unit_path(number, prev), prev["title"]) if prev else (year_path(number), f"Year {number} overview")
    next_target = (unit_path(number, nxt), nxt["title"]) if nxt else (year_path(number), f"Year {number} overview")
    body = f'''
{crumbs(path, [(HOME, "Curriculum"), (year_path(number), f"Year {number}")])}
<div class="unit-layout"><article class="unit-content">
<header class="unit-head"><p class="eyebrow">Year {number} · {esc(term)}{strand}</p><h1>{esc(title)}</h1></header>
{goals(unit, number)}{codes}{investigations}</article><aside class="unit-side">
<a class="back-year" href="{rel(path, year_path(number))}#{term.lower()}">All {esc(term.lower())} units in Year {number}</a>
{related}{render_sources(sources, unit)}</aside></div>
{pager(path, prev_target, next_target)}'''
    return layout(path, f"{title} · Year {number} mathematics", f"Learning objectives and curriculum sources for {title}, Year {number} mathematics in England.", body)


def validate(year, expected):
    if year["year"] != expected or [t["name"] for t in year["terms"]] != ["Autumn", "Spring", "Summer"]:
        raise ValueError(f"Invalid year or terms in Year {expected}")
    seen = set()
    for term, unit in unit_list(year):
        slug = unit["slug"]
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug) or slug in seen:
            raise ValueError(f"Invalid or duplicate Year {expected} slug: {slug}")
        seen.add(slug)
        if not (unit.get("objectives") or unit.get("higher")):
            raise ValueError(f"Year {expected} unit {slug} has no learning objectives")
    if not all(t["units"] for t in year["terms"]):
        raise ValueError(f"Empty term in Year {expected}")


def main():
    years = [json.loads((DATA / f"year-{n}.json").read_text(encoding="utf-8")) for n in range(1, 14)]
    sources = json.loads((DATA / "sources.json").read_text(encoding="utf-8"))["years"]
    connection_file = DATA / "connections.json"
    connections = json.loads(connection_file.read_text(encoding="utf-8")) if connection_file.exists() else {}
    lookup = {
        f"year-{year['year']}/units/{unit['slug']}": (unit_path(year["year"], unit), year["year"], unit["title"])
        for year in years for _, unit in unit_list(year)
    }
    unknown = connections.keys() - lookup.keys()
    if unknown:
        raise ValueError(f"Unknown source units in connections: {sorted(unknown)}")
    investigations, activities, themes = investigation_index(lookup)
    pages = {}
    for n, year in enumerate(years, 1):
        validate(year, n)
        refs = sources[str(n)]
        if not refs:
            raise ValueError(f"Missing sources for Year {n}")
        pages[year_path(n)] = year_page(year, refs)
        units = unit_list(year)
        for index, (term, unit) in enumerate(units):
            prev = units[index - 1][1] if index else None
            nxt = units[index + 1][1] if index + 1 < len(units) else None
            path = unit_path(n, unit)
            key = f"year-{n}/units/{unit['slug']}"
            related = connected_units(path, connections.get(key, []), lookup)
            applications = investigation_section(path, investigations.get(key, []), activities, themes)
            pages[path] = unit_page(year, term, unit, prev, nxt, refs, related, applications)
    pages[HOME] = home_page(years)
    for page, content in pages.items():
        path = ROOT / page
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")
    print(f"Built {len(years)} year pages and {len(pages)-len(years)-1} unit pages.")


if __name__ == "__main__":
    main()
