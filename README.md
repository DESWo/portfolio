# Desmond Wong — engineering portfolio

Nuclear and fusion energy, physical simulation, and the models and sources
behind them.

**To change what the site says, read [PORTFOLIO_EDITING_GUIDE.md](PORTFOLIO_EDITING_GUIDE.md).**
This file is about how it is put together.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
```

Node 22.18 or newer. The check and sitemap scripts import the `.ts` data files
directly, which needs Node's built-in type stripping.

```bash
npm run check    # content integrity: dangling slugs, missing files, bad tables
npm run build    # tsc -b && vite build — this is also the typecheck
npm run sitemap  # regenerate public/sitemap.xml and robots.txt
npm run preview  # serve the production build locally
```

## The idea

Content and presentation are completely separated. Everything a visitor reads
lives in `src/data/` as plain TypeScript objects. Components know how to *draw*
a project, a research entry or a case-study block; they know nothing about any
particular one.

The practical test: adding a project means creating one file and adding it to
one array. No component is touched, no route is registered, no CSS is written.
The project appears on the home page, joins the filters on `/projects`, gets its
own page, and can be linked to from skills and research — because every one of
those reads from the same array.

Three ideas do most of the work:

**One registry decides order.** `src/data/projects/index.ts` exports an array.
Its order is the display order. There is no `order: 3` field to keep in sync and
nothing to renumber when something moves.

**Case studies are data, not markup.** A case study is a list of sections, and
each section is a list of typed blocks — `text`, `figure`, `table`, `equation`,
`steps`, `callout`, and so on. `src/components/content/Blocks.tsx` is the only
file that knows how each one is drawn, and it numbers figures, tables and
equations continuously across a page the way a report does. Adding a new kind of
block means adding one variant to the `Block` union in `src/data/types.ts` and
one case to that renderer.

**Missing content is designed for.** Every optional field has a defined absence.
No résumé means no résumé buttons anywhere, not a broken link. An empty
`experience.ts` means no Experience section, not an empty heading. A project
with no thumbnail gets a generated technical plate keyed to its category rather
than a grey box. This is what makes the site safe to leave half-filled while
real content accumulates.

## Layout

```
src/
├── data/               all content — see the editing guide
├── components/
│   ├── layout/         header, footer, contact block, theme toggle
│   ├── ui/             the small shared pieces: Section, Tag, Icon, Reveal
│   ├── content/        the case-study renderer and its contents rail
│   ├── project/        card, index row, featured home-page block
│   ├── research/       research card
│   ├── media/          images, and the generated placeholder plates
│   └── home/           the hero
├── pages/              one file per route
├── hooks/              theme, scroll reveal, per-page metadata
├── lib/utils.ts        class names, asset paths, slugs
├── assets/fonts/       the four font subsets the site actually uses
└── index.css           the design system: palette, type scale, base styles
```

## Notes on the build

**Dependencies.** Three at runtime: `react`, `react-dom`, `react-router-dom`.
Icons are hand-drawn SVG in one file rather than an icon package, motion is CSS
plus one `IntersectionObserver` hook rather than an animation library, and the
fonts are subset files in `src/assets/fonts` rather than three font packages.

**Fonts.** Inter for the interface, Literata for long-form reading, Geist Mono
for labels and anything measured. Only the Latin and Greek subsets ship — Greek
because the equations use σ and τ. Each `@font-face` carries a `unicode-range`,
so a visitor reading English never downloads the Greek file. Self-hosting them
this way instead of importing the font packages took the stylesheet from 36 kB
to 8 kB gzipped.

**Theme.** Semantic custom properties defined twice, in `:root` and
`[data-theme='dark']`, then handed to Tailwind by reference with `@theme inline`.
Restyling the whole site means editing about fifteen values in one place. The
theme is applied by a small inline script in `index.html` before first paint, so
the page never flashes the wrong one.

**Routing.** `basename` comes from Vite's `BASE_URL`, so the router and the
deployment prefix cannot disagree. GitHub Pages has no server-side fallback for
client-side routes, so the deploy workflow copies `index.html` to `404.html`;
Pages then serves the app for any deep link and the router decides what to show.

**Metadata.** Each route sets its own title, description, canonical URL and
share tags through `usePageMeta`. The tags in `index.html` are the defaults for
the first paint. The home page also emits a `Person` JSON-LD block.

**Accessibility.** One focus style, never removed. Every image carries `alt`, and
`npm run check` fails if one does not. Colour is never the only signal — status
uses a filled or hollow dot *and* a spelled-out label. Every text pairing in the
palette has been checked against WCAG AA in both themes; the faintest tone sits
at 4.6:1 and is the lightest text used anywhere. All motion is disabled under
`prefers-reduced-motion`, and reveal animations are additionally forced visible
in JavaScript so content can never be left invisible if an observer does not
fire.

**Checking.** `npm run check` imports the real data files and validates what
types cannot see: cross-references between projects, research and skills; that
every image, PDF and video path has a file behind it; that table rows match
their column count; that slugs are unique and URL-safe. CI runs it before the
build, so a broken reference fails the deploy rather than shipping.

## Deploying

Push to `main`. `.github/workflows/deploy.yml` checks, builds and publishes to
GitHub Pages. See the editing guide for first-time setup and for what to change
if the repository is renamed.

## Licence

MIT for the code. The written content, screenshots and images are © Desmond
Wong — see [LICENSE](LICENSE).
