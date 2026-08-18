# Editing your portfolio

Everything on this site comes from plain text files in one folder: **`src/data/`**.

You never have to touch a React component to change what the site says. Add a
project, reorder them, write a case study, change your bio, swap a link — all of
it happens in that folder, and the site rebuilds itself around whatever it finds.

This guide assumes you know basic Git and GitHub. It assumes nothing about React.

---

## Contents

- [Before you publish: a short checklist](#before-you-publish-a-short-checklist)
- [Where everything lives](#where-everything-lives)
- [The three commands you need](#the-three-commands-you-need)
- [Projects](#projects)
  - [Add a project](#add-a-project)
  - [Edit a project](#edit-a-project)
  - [Reorder projects](#reorder-projects)
  - [Feature a project](#feature-a-project)
  - [Hide a project without deleting it](#hide-a-project-without-deleting-it)
  - [Delete a project](#delete-a-project)
- [Images and screenshots](#images-and-screenshots)
- [Case studies](#case-studies)
  - [Every block you can use](#every-block-you-can-use)
- [Research](#research)
  - [Add a research entry](#add-a-research-entry)
  - [Upload a paper (PDF)](#upload-a-paper-pdf)
- [Your résumé](#your-résumé)
- [About, experience, education, certifications](#about-experience-education-certifications)
- [Skills](#skills)
- [Contact and social links](#contact-and-social-links)
- [Categories](#categories)
- [Site title, description and share image](#site-title-description-and-share-image)
- [Deploying](#deploying)
- [When something goes wrong](#when-something-goes-wrong)

---

## Before you publish: a short checklist

These are the things the site is currently waiting on from you. None of them
break anything — each one is simply hidden until you fill it in.

- [ ] **Résumé.** Put the PDF at `public/resume/` and set `resume` in
      `src/data/profile.ts`. Until then, every "Résumé" button is hidden.
- [ ] **LinkedIn.** Paste your profile URL into `src/data/links.ts`.
- [ ] **itch.io.** Same file, if you publish anything there.
- [ ] **Experience.** `src/data/experience.ts` has one honest entry (independent
      projects). Add internships, programmes and clubs as they happen.
- [ ] **Coursework.** `src/data/education.ts` has a commented-out `coursework`
      line. Fill it in with classes you have actually taken.
- [ ] **The RADIANT paper.** `src/data/research.ts` marks it as a draft and has
      no PDF attached. Confirm the status and attach the file.
- [ ] **Check the repository name.** The site is currently built for a repo
      called `portfolio` — see [Deploying](#deploying) if yours is named
      something else.

Search the project for `TODO(Desmond)` and you will find every one of these
marked in place.

---

## Where everything lives

```
src/data/
├── profile.ts          your name, bio, hero text, the facts panel, résumé
├── links.ts            email, GitHub, LinkedIn, itch.io
├── site.ts             browser tab title, share description, navigation
├── categories.ts       the project category vocabulary
├── skills.ts           the Engineering page
├── experience.ts       jobs, internships, programmes, leadership
├── education.ts        schools
├── certifications.ts   certificates and licences (empty for now)
├── research.ts         papers and investigations
├── types.ts            the shape of everything above (you rarely touch this)
└── projects/
    ├── index.ts        THE PROJECT LIST — order and which ones are live
    ├── _template.ts    copy this to make a new project
    ├── radiant.ts      one file per project
    ├── fusioncore.ts
    ├── engineering-explorer.ts
    └── fusion-sandbox.ts

public/                 files served as-is
├── images/projects/    project screenshots
├── papers/             research PDFs
├── resume/             your résumé
└── og-card.png         the picture shown when the site is shared
```

Everything else in `src/` is presentation. You should not need to open it.

---

## The three commands you need

Run these from the project folder.

**See your changes as you make them.** Leave it running; the browser updates as
you save.

```bash
npm run dev
```

**Check your content for mistakes.** Broken image paths, a project referring to
another project that does not exist, a table row with the wrong number of cells.

```bash
npm run check
```

**Build the site the way the server will.** This also type-checks everything.

```bash
npm run build
```

If `npm run check` and `npm run build` both pass, your change is safe to push.

---

## Projects

### Add a project

1. **Copy the template.** Duplicate `src/data/projects/_template.ts` and rename it
   after your project, for example `heat-sink.ts`.

2. **Rename the export** on the first line of the copy:

   ```ts
   export const heatSink: Project = {
   ```

3. **Fill in the required fields** and delete the ones you do not need. Only six
   are required:

   ```ts
   slug: 'heat-sink',              // the web address: /projects/heat-sink
   title: 'Passive Heat Sink',
   summary: 'One or two sentences for the card.',
   categories: ['mechanical', 'cad'],
   status: 'in-progress',
   date: 'Autumn 2026',
   ```

4. **Register it.** Open `src/data/projects/index.ts` and add two lines:

   ```ts
   import { heatSink } from './heat-sink'      // near the other imports

   export const projects: Project[] = [
     radiant,
     fusioncore,
     heatSink,                                  // <- wherever you want it
     engineeringExplorer,
     fusionSandbox,
   ]
   ```

5. Run `npm run check`, then look at it with `npm run dev`.

That is the whole process. The project now appears on `/projects`, gets its own
page at `/projects/heat-sink`, joins the category filters, and can be linked to
from skills and research.

> **If you skip step 4 the project will not appear.** That is deliberate — it
> lets you write a project file over several sittings without a half-finished
> page being live.

### Edit a project

Open its file in `src/data/projects/` and change the text. Save. Done.

The fields you will use most:

| Field          | What it does                                                        |
| -------------- | ------------------------------------------------------------------- |
| `title`        | The name shown everywhere                                           |
| `subtitle`     | The smaller italic line under the title                             |
| `summary`      | The blurb on the card. Keep it under about 220 characters           |
| `status`       | `active`, `in-progress`, `complete`, `maintained`, `paused`, `concept` |
| `date`         | Free text, shown exactly as written: `'Summer 2026'`, `'2025 – present'` |
| `technologies` | The small tags: tools, languages, materials                         |
| `repo`         | GitHub URL                                                          |
| `liveDemo`     | Where someone can use the thing                                     |
| `links`        | Anything else — itch.io, a PDF, a video                             |
| `achievements` | Short factual outcomes, shown as a list on the project page         |

### Reorder projects

Move the lines around in the `projects` array in `src/data/projects/index.ts`.
That is the entire mechanism — there is no `order: 3` number to keep in sync,
and nothing to renumber.

Featured projects are always pinned above the rest, so the array controls the
order *within* the featured group and *within* everything else.

### Feature a project

Add `featured: true` to its file. Featured projects appear on the home page in
the large alternating layout, and sit at the top of `/projects`.

Two to four featured projects looks right. If you mark none, the home page
quietly falls back to showing the first three.

### Hide a project without deleting it

Add `draft: true`. The file stays in the repository, the project disappears from
the site entirely, and nothing else breaks. Useful for something half-written.

### Delete a project

Remove its line from the array in `index.ts`. You can leave the file on disk or
delete it — a file that is not in the array is not on the site.

If another project or a skill referenced it, `npm run check` will tell you
exactly where.

---

## Images and screenshots

**Where they go:** `public/images/projects/`

**How to reference them:** always write the path from the site root, starting
with `/`. Do not include `/portfolio/` — the build adds that for you.

```ts
thumbnail: {
  src: '/images/projects/heat-sink.jpg',
  alt: 'The finished heat sink on a test bench, with a thermocouple taped to the base.',
  width: 1600,
  height: 1000,
},
```

Notes:

- **`alt` is required.** It is what someone using a screen reader hears instead
  of the picture. Describe what the image shows.
- **`width` and `height`** should be the real pixel size. Supplying them stops
  the page jumping around while images load. Give both or neither.
- **Size:** aim for about 1600 px wide. Save screenshots as `.jpg` at around
  80–85% quality — the existing ones are 60–120 kB each. A 2 MB PNG will make
  the page slow.
- **Aspect ratio:** cards use 8:5. Anything else gets cropped to fit.

**If you leave `thumbnail` out entirely**, the site draws a generated technical
plate instead — a drafting grid with a figure chosen from the project's
category. It looks intentional, so there is no hurry. `fusion-sandbox` currently
uses one; look at it on `/projects` to see.

---

## Case studies

A project with no `caseStudy` still gets a page: title, summary, facts, links,
outcomes. That is the right choice for a small project.

Adding a `caseStudy` turns that page into a full write-up with a contents rail
built automatically from your section titles.

```ts
caseStudy: {
  summary: 'The one-paragraph version of the whole page.',
  facts: [
    { label: 'Role', value: 'Sole author' },
    { label: 'Duration', value: 'Six weeks' },
  ],
  sections: [
    {
      title: 'Motivation',
      kicker: 'Why',            // the small line above the title
      blocks: [
        { kind: 'text', text: 'A paragraph.' },
      ],
    },
  ],
}
```

**Sections are yours to name.** There is no required set and no required order.
Use as many or as few as the project deserves. Ones that work well:

Motivation · What I built · How it works · Design process · Results ·
Challenges · Trade-offs · What I learned · What I would do differently · Next

Figures, tables and equations are **numbered automatically** across the whole
page, so a caption can say "Fig. 3" and be right.

### Every block you can use

Each block goes in a section's `blocks` array. `_template.ts` has all of them in
one place if you would rather copy than read.

**Paragraphs** — a string, or an array for several paragraphs.

```ts
{ kind: 'text', text: ['First paragraph.', 'Second paragraph.'] }
```

**A list**

```ts
{ kind: 'list', items: ['One', 'Two'], ordered: false }
```

**Term and explanation** — good for naming the parts of something.

```ts
{ kind: 'definitions', items: [
  { term: 'Chain-reaction lab', description: 'What it is and why it is there.' },
]}
```

**A figure** — `width` can be `'text'` (the reading column) or `'wide'` (the
full column, the default).

```ts
{ kind: 'figure', width: 'wide', image: {
  src: '/images/projects/heat-sink-cad.png',
  alt: 'Section view of the heat sink showing the fin spacing.',
  caption: 'Fin pitch was set by the smallest gap the printer could bridge.',
  width: 1600, height: 900,
}}
```

**Several images side by side**

```ts
{ kind: 'gallery', columns: 2, images: [
  { src: '/images/projects/a.png', alt: 'Before.' },
  { src: '/images/projects/b.png', alt: 'After.' },
]}
```

**An equation** — written as plain text with real symbols (σ, τ, ², ⟨⟩), so
there is no maths library to install and it copies and pastes properly.

```ts
{ kind: 'equation',
  expression: 'σ = F / A',
  where: [
    { symbol: 'σ', meaning: 'normal stress' },
    { symbol: 'F', meaning: 'applied force' },
    { symbol: 'A', meaning: 'cross-sectional area' },
  ],
  caption: 'Optional line underneath.',
}
```

**A note or a caveat** — `tone: 'caution'` gives it an accent bar. Use these for
assumptions, limitations and trade-offs.

```ts
{ kind: 'callout', tone: 'caution', title: 'The trade I made', text: '…' }
```

**A table** — every row must have the same number of cells as `columns`.
`npm run check` enforces that.

```ts
{ kind: 'table',
  caption: 'Optional.',
  columns: ['Option', 'Mass', 'Verdict'],
  rows: [
    ['Aluminium', '120 g', 'Chosen'],
    ['Steel', '340 g', 'Too heavy'],
  ],
}
```

**Measured numbers**

```ts
{ kind: 'metrics', items: [
  { value: '12 kN', label: 'Peak load', note: 'measured' },
  { value: '0.8 mm', label: 'Max deflection' },
]}
```

**A numbered walk-through** — design process, build sequence, method.

```ts
{ kind: 'steps', items: [
  { title: 'First', text: 'What happened first.' },
  { title: 'Then', text: 'What happened next.' },
]}
```

**Code**

```ts
{ kind: 'code', language: 'python', code: 'def solve(k, f):\n    return k.solve(f)' }
```

**A pulled-out line**

```ts
{ kind: 'quote', text: 'A short line.', attribution: 'Source' }
```

**A video** — put the file in `public/video/`.

```ts
{ kind: 'video', src: '/video/test-run.mp4', alt: 'The rig running for 30 seconds.' }
```

**An embed** — an itch.io widget, a live demo, a slide deck.

```ts
{ kind: 'embed', src: 'https://itch.io/embed/000000', title: 'Playable build', aspect: '16/9' }
```

---

## Research

Everything lives in `src/data/research.ts`. The order of the array is the order
shown on `/research`.

### Add a research entry

Copy the commented example at the bottom of the file into the array. The
required fields are `slug`, `title`, `authors`, `date`, `status`, `topics` and
`abstract`.

**Status is doing real work on this site** — it is printed next to the title, so
keep it accurate:

| Status         | Means                                       |
| -------------- | ------------------------------------------- |
| `exploring`    | reading around a subject, no question yet   |
| `researching`  | working a question, nothing written up      |
| `draft`        | being written                               |
| `under-review` | submitted somewhere, waiting                |
| `published`    | out in the world, with a link or a DOI      |

Only ever use `published` when something is actually published. `npm run check`
warns if an entry claims to be published with no PDF, link or DOI attached.

**Optional extras:**

- `body` — an array of sections using exactly the same blocks as a case study.
  Adding one gives the entry its own page at `/research/<slug>`. Without it the
  entry stays a card on the index.
- `progress` — a short honest list of what is done and what is not. This is what
  makes a "researching" entry worth reading before there is a result.
- `relatedProject` — the slug of a project, which becomes a link.
- `doi` — the bare identifier (`10.1234/abcd`), not a URL.
- `citation` — how you would like to be cited, shown in a copy-friendly block.

### Upload a paper (PDF)

1. Put the file in `public/papers/`, e.g. `public/papers/divertor-study.pdf`.
2. Point at it from the entry:

   ```ts
   pdf: '/papers/divertor-study.pdf',
   ```

Path from the site root, starting with `/`, same rule as images. A "PDF" link
appears automatically.

---

## Your résumé

1. Put the PDF in `public/resume/`, e.g.
   `public/resume/Desmond-Wong-Resume.pdf`.
2. In `src/data/profile.ts`, replace `resume: null` with:

   ```ts
   resume: {
     href: '/resume/Desmond-Wong-Resume.pdf',
     label: 'Résumé (PDF)',
     updated: 'August 2026',
   },
   ```

A Résumé button appears in the header, the hero, the About page, the footer and
the contact block. While it is `null`, all of those are hidden — there is never
a dead link.

**To update it later,** overwrite the PDF and change `updated`. Keeping the same
filename means anyone who bookmarked the link still gets the current version.

---

## About, experience, education, certifications

**Your bio** is `about` in `src/data/profile.ts` — an array with one string per
paragraph. Add, remove or rewrite them freely.

Also in that file:

- `tagline` — the big serif sentence on the home page
- `intro` — the paragraph under it
- `facts` — the small panel (Focus, Studying, Based in, Currently). Updating
  **Currently** whenever your work changes is the single cheapest thing you can
  do to keep the site looking alive.
- `focus` — the three columns under the hero
- `disciplines` — the small line at the very top, e.g. Nuclear · Fusion · Simulation
- `photo` — optional. The layout is designed to look right without one.

**Experience** is `src/data/experience.ts`. Newest first. Copy the commented
example at the bottom of the file. If the array is empty the whole section
disappears from the About page rather than showing an empty heading.

**Education** is `src/data/education.ts`. Same idea. `coursework` is optional —
list classes you have actually taken, not a full transcript.

**Certifications** is `src/data/certifications.ts` and is currently empty on
purpose, so the section is hidden. Add one entry and it appears.

---

## Skills

`src/data/skills.ts`, grouped into four groups that become the four blocks on
the Engineering page.

There is deliberately **no proficiency level, star rating or percentage bar**.
Instead, a skill can point at the projects that prove it:

```ts
{
  name: 'Reactor physics',
  note: 'Point kinetics, delayed neutrons, Doppler feedback, xenon poisoning.',
  evidence: ['radiant', 'fusioncore'],
}
```

Those slugs turn into links to the project pages. A skill with no `evidence` is
fine — it just renders without links. Misspell a slug and `npm run check` tells
you.

To add a whole new group, copy one of the four objects and give it a new `id`.

---

## Contact and social links

`src/data/links.ts`.

```ts
{
  id: 'linkedin',
  label: 'LinkedIn',
  display: 'linkedin.com/in/yourname',   // the text shown
  href: 'https://linkedin.com/in/yourname',
  icon: 'linkedin',
  primary: true,                          // also show it in the hero
}
```

**Leave `href` as an empty string for anything you do not have yet.** Empty
entries are skipped everywhere — header, hero, footer, contact block — so the
site never shows a dead link. That is why LinkedIn and itch.io are not currently
visible.

Available `icon` values: `email`, `github`, `linkedin`, `itch`, `document`,
`link`.

---

## Categories

`src/data/categories.ts`. To add one:

```ts
{
  id: 'thermal',
  label: 'Thermal',
  description: 'Heat transfer, cooling and thermal management.',
},
```

As soon as you save, your editor will offer `'thermal'` as a valid option in
every project's `categories` field, and flag any typo in red.

**A category only appears as a filter once a visible project uses it**, so it is
safe to define one months before you have the project for it. Nothing empty is
ever shown to a visitor.

Each category also picks the drawing style used for generated placeholder
plates — see `CATEGORY_FIGURE` in
`src/components/media/GeneratedPlate.tsx` if you add a category and want to
choose which figure it gets.

---

## Site title, description and share image

`src/data/site.ts` holds the browser tab title, the description search engines
show, and the canonical URL.

The **share image** (what appears when the link is pasted into a message) is
`public/og-card.png`, 1200×630. Replace the file to change it; keep the size.

Two files repeat some of this for the very first page load, before any
JavaScript runs. If you change the title or description in `site.ts`, update
them in `index.html` too — it is the only duplication in the project, and it
exists so that the page has a sensible title even before the app starts.

---

## Deploying

Push to `main`. That is it.

```bash
git add .
git commit -m "Add heat sink project"
git push
```

A GitHub Action (`.github/workflows/deploy.yml`) then runs `npm run check`,
regenerates the sitemap, type-checks, builds, and publishes. **If the content
check or the build fails, nothing is deployed** and the old site stays up. You
will see a red mark in the repository's Actions tab.

**One-time setup**, if the site has never been deployed:

1. Push the repository to GitHub.
2. Repository → Settings → Pages → Source: **GitHub Actions**.
3. Wait for the Action to finish. The URL appears in the Actions log.

**If your repository is not called `portfolio`**, change the address in two
places so links, images and the sitemap all agree:

- `vite.config.ts` → `BASE_PATH` (e.g. `'/my-site/'`). GitHub Pages paths are
  **case-sensitive**, so it must match the repository name exactly.
- `src/data/site.ts` → `url`.

**Using a custom domain, or a repo named `DESWo.github.io`?** Set `BASE_PATH` to
`'/'` and `url` to your domain.

---

## When something goes wrong

**`npm run check` fails.** Read the message — it names the file and the field.
The usual causes are a misspelled project slug in `relatedProjects` or
`evidence`, or an image path with no file behind it.

**`npm run build` fails with a red squiggle in your editor.** You have a typo in
a field name or a value. The most common: a `status` that is not one of the
allowed words, a category id that is not in `categories.ts`, or a missing comma.

**A project does not appear.** Either it is not in the array in
`src/data/projects/index.ts`, or it has `draft: true`.

**An image does not appear.** The path must start with `/` and be relative to
`public/`. `public/images/projects/x.jpg` is written `/images/projects/x.jpg`.
Never include `/portfolio/` yourself.

**A link 404s after deploying but works locally.** `BASE_PATH` in
`vite.config.ts` does not match the repository name. Remember it is
case-sensitive.

**The site looks unstyled for a moment on first load.** That is the fonts
loading. They are served from the site itself and cached after the first visit.

**You want to undo everything.** Every change is one file in `src/data/`.
`git checkout src/data` puts it all back.
