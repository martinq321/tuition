#!/usr/bin/env python3
"""Build the site directory from the curriculum, audited resources and teaching pathways."""
from collections import Counter
from html import escape
import json
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "site-map"
AUDIT = "development/curriculum/activity-audit.json"
PATHS = "data/theme-paths.json"
LABELS = {
    "source-reviewed": "Source reviewed", "browser-checked": "Browser checked",
    "logic-checked": "Logic checked", "prototype": "Prototype",
    "available-unmapped": "Published word game", "awaiting-learner-pilot": "Awaiting learner pilot",
    "needs-repair": "Needs repair",
}
COURSE_GROUPS = [
    ("workshops", "Teaching workshops"), ("short-lessons", "Short lessons"),
    ("hubs", "Stage pathways"),
]


SECTIONS = [
    ("Full investigation catalogue", "puzzles/index.html"),
    ("Student collection", "students/index.html"),
    ("Learning site", "development/index.html"),
    ("Learning pathways", "development/curriculum/index.html"),
    ("My journey", "development/explore/journey.html"),
    ("My notebook", "development/learning.html#progress"),
    ("Session planner", "puzzles/planner.html"),
    ("Educator guide", "puzzles/educators.html"),
    ("Curriculum coverage and activity audit", "development/curriculum/map.html"),
]


def read(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))


def check_path(path):
    parts = urlsplit(path)
    dest = (ROOT / parts.path).resolve()
    if parts.scheme or parts.netloc or not dest.is_relative_to(ROOT) or not dest.is_file():
        raise ValueError(f"Broken site-map destination: {path}")


def build_data():
    audit = read(AUDIT)
    choices = read(PATHS)
    positions = {}
    for theme in choices["themes"]:
        for number, key in enumerate(theme["steps"], 1):
            if key in positions:
                raise ValueError(f"{key} appears in two progression paths")
            positions[key] = (theme["id"], number)
    checks = {c["activity_id"]: c for c in audit["release_checks"]}
    categories = {row["id"] for row in choices["categories"]}
    resources = audit["activities"]
    if set(positions) != {item["id"] for item in resources}:
        raise ValueError("The paths must cover every audited activity exactly once")
    if choices["evidence"].keys() - positions.keys():
        raise ValueError("Unknown activity in evidence overrides")
    activities = []
    for resource in resources:
        key = resource["id"]
        if resource["category"] not in categories:
            raise ValueError(f"Unknown category on {key}")
        theme, number = positions[key]
        check_path(resource["path"])
        readiness = resource["status"]
        development = "Interactive activity"
        evidence_path = AUDIT
        note = resource["evidence"]["source_checks"][0].rstrip(".") + "."
        if readiness == "available-unmapped":
            development = "Word game"
            note = "Published as a word game; curriculum alignment has not been reviewed."
        if key in checks and checks[key]["result"] == "passed":
            readiness = "browser-checked"
            note = checks[key]["scope"].removeprefix("Browser: ").strip()
            note = note[:1].upper() + note[1:]
            note = f'{checks[key]["date"]} · {note}'
        override = choices["evidence"].get(key, {})
        evidence_path = override.get("evidencePath", evidence_path)
        check_path(evidence_path)
        activities.append({
            "id": key, "title": resource["title"], "path": resource["path"],
            "category": resource["category"], "theme": theme, "position": number,
            "description": resource["accessible_entry"], "development": override.get("development", development),
            "readiness": override.get("readiness", readiness), "readinessNote": override.get("note", note),
            "evidencePath": evidence_path,
        })

    courses = []
    for record in audit["course_resources"]:
        key = record["id"]
        group = "short-lessons" if record.get("lesson_id") else "hubs" if key.endswith("-hub") else "workshops"
        path = record["path"] + record.get("launch_hash", "")
        check_path(path)
        note = record.get("gaps", ["Source and teaching materials inspected."])[0]
        status = "source-reviewed"
        if key == "year6-fractions":
            status = "awaiting-learner-pilot"
            note = "The mathematical checks and representative browser tasks passed. A learner pilot and physical-device checks are pending."
        if key == "year5-volume":
            status = "needs-repair"
            note = "The final task asks for every possible cuboid; the checker currently accepts a single valid product."
        courses.append(dict(id=key, title=record["title"], path=path, group=group,
                            readiness=status, readinessNote=note, evidencePath=AUDIT))
    years = []
    for year in range(1, 14):
        path = f"curriculum/year-{year}/index.html"
        check_path(path)
        data = read(f"curriculum/data/year-{year}.json")
        years.append(dict(year=year, title=f"Year {year}", path=path,
                          unitCount=sum(len(term["units"]) for term in data["terms"])))
    for _, path in SECTIONS:
        check_path(path)
    sections = [dict(title=title, path=path) for title, path in SECTIONS]
    return dict(version=1, sections=sections, categories=choices["categories"], themes=choices["themes"],
                activities=activities, courses=courses, years=years)


def route(path, label):
    return f'<a data-public-route href="../{escape(path, quote=True)}">{escape(label)}</a>'


def readiness(resource):
    return (f'<details class="evidence"><summary>{escape(LABELS[resource["readiness"]])}</summary>'
            f'<p>{escape(resource["readinessNote"])}</p></details>')


def render(data):
    by_id = {a["id"]: a for a in data["activities"]}
    groups = []
    for theme in data["themes"]:
        steps = []
        for key in theme["steps"]:
            act = by_id[key]
            steps.append(f'<li data-map-item data-category="{act["category"]}" data-status="{act["readiness"]}">'
                         f'{route(act["path"], act["title"])}<p>{escape(act["description"])}</p>{readiness(act)}</li>')
        groups.append(f'<details class="path" id="{theme["id"]}" data-path><summary>'
                      f'<span>{escape(theme["title"])}</span> <span class="count">{len(steps)} activities</span>'
                      f'</summary><p>{escape(theme["description"])}</p><ol>{"".join(steps)}</ol></details>')
    years = "".join(f'<li>{route(y["path"], y["title"])} <small>{y["unitCount"]} units</small></li>' for y in data["years"])
    sections = "".join(f'<li>{route(r["path"],r["title"])}</li>' for r in data["sections"])
    courses = []
    for key, title in COURSE_GROUPS:
        items = "".join(f'<li>{route(r["path"],r["title"])}{readiness(r)}</li>' for r in data["courses"] if r["group"] == key)
        courses.append(f'<details class="path"><summary>{title}</summary><ul>{items}</ul></details>')
    statuses = Counter(r["readiness"] for r in data["activities"])
    category_options = "".join(f'<option value="{c["id"]}">{escape(c["title"])}</option>' for c in data["categories"])
    status_options = "".join(f'<option value="{key}">{escape(label)} ({statuses[key]})</option>' for key,label in LABELS.items() if statuses[key])
    return f'''<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Site map · Maths Wednesdays</title><link rel="stylesheet" href="../assets/css/site-map.css"><script defer src="../assets/js/site-map.js"></script></head>
<body><a class="skip" href="#content">Skip to site map</a><header><div class="wrap bar">{route('index.html', 'Maths Wednesdays')}<nav aria-label="Site map sections"><a href="#curriculum">Curriculum</a><a href="#activities">Investigations</a><a href="#teaching">Teaching resources</a></nav></div></header>
<main class="wrap" id="content"><h1>Site map</h1>
<section id="curriculum"><h2>{route('curriculum/index.html','Mathematics curriculum')}</h2><p>Browse units and learning objectives for each year in England.</p><ul class="years">{years}</ul></section>
<section id="activities"><h2>Investigation pathways</h2><p>Open a theme for its suggested activity order. You can start at any step. Open a status to see what was checked.</p>
<div class="filters" id="filters" hidden><label>Search activities<input id="search" type="search" placeholder="Name or topic"></label><label>Category<select id="category"><option value="">All categories</option>{category_options}</select></label>
<label>Evidence<select id="status"><option value="">All statuses</option>{status_options}</select></label><button type="button" id="clear">Clear filters</button></div><p id="matches" role="status" aria-live="polite"></p>
<div id="pathways">{"".join(groups)}</div>
<p class="source">Evidence is scoped to the checks recorded for each activity. Phone hardware and assistive-technology testing require separate observations. {route(AUDIT,'Activity audit')}</p></section>
<section id="teaching"><h2>Teaching resources</h2><p>Open a workshop, short lesson or stage pathway. The notes describe its teaching scope and any recorded gaps.</p>{"".join(courses)}</section>
<section id="collections"><h2>Collections and tutor resources</h2><ul class="admin-list">{sections}</ul></section>
</main>
<footer class="wrap">{route('index.html','Home')} · {route('curriculum/index.html','Curriculum')} · <a href="routes.json">Site map data</a></footer></body></html>
'''


def main():
    data = build_data()
    OUT.mkdir(exist_ok=True)
    (OUT / "routes.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (OUT / "index.html").write_text(render(data), encoding="utf-8")
    print(f"Built {len(data['themes'])} pathways, {len(data['activities'])} activities, "
          f"{len(data['courses'])} teaching resources and {len(data['years'])} years.")


if __name__ == "__main__":
    main()
