/**
 * Every shape of content this site can render.
 *
 * You almost never need to edit this file. It exists so that your editor can
 * autocomplete fields and underline typos in red *while you are writing
 * content* in the other files in this folder. If you want a new kind of field
 * on a project (say, a `client` name), add it here first as an optional
 * property and the rest of the codebase will tell you where it can be shown.
 *
 * Rule of thumb used throughout: anything marked `?` is optional and the UI
 * simply omits it when missing. Nothing renders an empty box or a broken
 * image because a field was left out.
 */

import type { CategoryId } from './categories.ts'

/* ------------------------------------------------------------------ */
/* Shared primitives                                                    */
/* ------------------------------------------------------------------ */

/** A link out of the site. `label` is what a screen reader announces. */
export interface ExternalLink {
  label: string
  href: string
  /** Optional short note shown next to the link, e.g. "PDF, 1.2 MB". */
  note?: string
}

/**
 * An image. `src` is a path under `public/`, written from the site root:
 *   public/images/projects/radiant-hero.png  ->  src: '/images/projects/radiant-hero.png'
 * The build rewrites that prefix for GitHub Pages, so never hard-code
 * '/portfolio/' yourself.
 *
 * `alt` is required on purpose: it is what someone using a screen reader hears
 * instead of the picture. Describe what the image shows, not that it is an
 * image. If the image is purely decorative, use an empty string.
 */
export interface ImageRef {
  src: string
  alt: string
  caption?: string
  /** Natural pixel size. Supplying it stops the page jumping while images load. */
  width?: number
  height?: number
}

/* ------------------------------------------------------------------ */
/* Case-study content blocks                                            */
/* ------------------------------------------------------------------ */

/**
 * A case study is a list of sections, and each section is a list of blocks.
 * Blocks are the paragraphs, figures, tables and equations the page can draw.
 * Add only the ones you need — a project is never forced to have all of them.
 */
export type Block =
  /** One or more paragraphs of plain prose. */
  | { kind: 'text'; text: string | string[] }
  /** A bulleted or numbered list. */
  | { kind: 'list'; items: string[]; ordered?: boolean }
  /** A labeled list: term on the left, explanation on the right. */
  | { kind: 'definitions'; items: { term: string; description: string }[] }
  /** A single image with an automatic "Fig. n" label. */
  | { kind: 'figure'; image: ImageRef; width?: 'text' | 'wide' | 'full' }
  /** Two or more images side by side. */
  | { kind: 'gallery'; images: ImageRef[]; columns?: 2 | 3 }
  /**
   * A display equation. Written as plain text with real Unicode symbols
   * (⟨σv⟩, τ, ², ×) rather than LaTeX, so it needs no maths library and
   * still copies and pastes correctly.
   */
  | {
      kind: 'equation'
      expression: string
      /** Symbol definitions rendered underneath as "where …". */
      where?: { symbol: string; meaning: string }[]
      caption?: string
    }
  /** A short aside: a note, a caveat, or a limitation worth stating plainly. */
  | { kind: 'callout'; tone?: 'note' | 'caution'; title?: string; text: string }
  /** A data table. `columns` and every row must be the same length. */
  | { kind: 'table'; columns: string[]; rows: string[][]; caption?: string }
  /** Big numbers with labels — results, dimensions, measured values. */
  | { kind: 'metrics'; items: { value: string; label: string; note?: string }[] }
  /** A numbered walk-through: design process, build sequence, method. */
  | { kind: 'steps'; items: { title: string; text: string }[] }
  /** A source snippet. Displayed as-is; no syntax highlighting, by design. */
  | { kind: 'code'; code: string; language?: string; caption?: string }
  /** A short pulled-out line. Use sparingly. */
  | { kind: 'quote'; text: string; attribution?: string }
  /** A locally hosted video file under public/. */
  | { kind: 'video'; src: string; poster?: string; caption?: string; alt: string }
  /** An embedded page — an itch.io widget, a live demo, a slide deck. */
  | { kind: 'embed'; src: string; title: string; aspect?: '16/9' | '4/3' | '1/1' }

/** One titled section of a case study. */
export interface CaseStudySection {
  /**
   * URL anchor and contents-rail entry. Leave it out and one is generated
   * from the title ("What I built" -> "what-i-built").
   */
  id?: string
  title: string
  /** Small line above the title, e.g. "Method" or "Result". */
  kicker?: string
  blocks: Block[]
}

/** The optional long-form page behind a project. */
export interface CaseStudy {
  /** Wide image at the top of the case study. */
  hero?: ImageRef
  /** One or two sentences under the title. Sets up everything that follows. */
  summary?: string
  /** Headline facts shown in the sidebar: role, duration, team size, scale. */
  facts?: { label: string; value: string }[]
  sections: CaseStudySection[]
}

/* ------------------------------------------------------------------ */
/* Projects                                                             */
/* ------------------------------------------------------------------ */

export type ProjectStatus =
  | 'active' // being worked on right now
  | 'in-progress' // started, not finished
  | 'complete' // finished and shipped
  | 'maintained' // finished, still fixed and updated
  | 'paused' // set down, may come back to it
  | 'concept' // designed but not built

export interface Project {
  /** URL segment and internal id: lowercase, hyphens, no spaces. Must be unique. */
  slug: string
  title: string
  /** Optional second line, e.g. an expansion of an acronym. */
  subtitle?: string
  /** One or two sentences for the card. Aim for under 220 characters. */
  summary: string
  /** Categories drive the filters on /projects. First one is the primary label. */
  categories: CategoryId[]
  status: ProjectStatus
  /** Free text — "2026", "2025 – present", "Summer 2026". Shown as written. */
  date: string
  /**
   * Used for sorting when you ask for it, and for the machine-readable date in
   * search-engine metadata. Format: 'YYYY' or 'YYYY-MM' or 'YYYY-MM-DD'.
   */
  sortDate?: string
  /** Put it on the home page and pin it to the top of /projects. */
  featured?: boolean
  /** Card and index-row image. Omit and a generated technical plate is drawn. */
  thumbnail?: ImageRef
  /** Tools, languages, libraries. Shown as small tags. */
  technologies?: string[]
  repo?: string
  liveDemo?: string
  /** Anything else: itch.io, a paper, a video, a write-up elsewhere. */
  links?: ExternalLink[]
  /** Short factual outcomes. Never invent these. */
  achievements?: string[]
  /** Slugs of research entries related to this project. */
  relatedResearch?: string[]
  /** Slugs of other projects worth reading next. */
  relatedProjects?: string[]
  /** Omit this and the project stays a card with no page of its own. */
  caseStudy?: CaseStudy
  /**
   * Set to true to keep a project in the codebase but off the site — useful
   * for something half-written that you are not ready to show.
   */
  draft?: boolean
}

/* ------------------------------------------------------------------ */
/* Research                                                             */
/* ------------------------------------------------------------------ */

export type ResearchStatus =
  | 'exploring'
  | 'researching'
  | 'draft'
  | 'under-review'
  | 'published'

export interface ResearchEntry {
  slug: string
  title: string
  /** List yourself and anyone else, in the order they should be credited. */
  authors: string[]
  /** Free text: "August 2026", "2026 – present". */
  date: string
  sortDate?: string
  status: ResearchStatus
  /** Field of study. Shown as a small tag and used by the filters. */
  topics: string[]
  /** A paragraph. What the question is and how it is being approached. */
  abstract: string
  /** Path to a PDF under public/, e.g. '/papers/tokamak-comparison.pdf'. */
  pdf?: string
  /** Journal, preprint server, conference, blog. */
  publication?: ExternalLink
  /** Only fill this in once a DOI actually exists. */
  doi?: string
  /** Slug of the project this work grew out of, or feeds. */
  relatedProject?: string
  figures?: ImageRef[]
  /** How you would like this cited. Rendered in a copy-friendly block. */
  citation?: string
  /** Optional long-form page, same block system as a project case study. */
  body?: CaseStudySection[]
  /** Notes on progress. Honest and short: what is done, what is not. */
  progress?: string[]
  draft?: boolean
}

/* ------------------------------------------------------------------ */
/* Experience, education, certifications                                */
/* ------------------------------------------------------------------ */

export interface Experience {
  /** Unique id, used as a React key. Lowercase, hyphens. */
  id: string
  /** The job, program or role. */
  role: string
  /** The company, school, lab or club. Omit for self-directed work. */
  organization?: string
  location?: string
  /** Free text: "Jun 2026 – Aug 2026", "2025 – present". */
  period: string
  sortDate?: string
  kind?: 'work' | 'internship' | 'program' | 'leadership' | 'coursework' | 'independent'
  /** A sentence of context. */
  summary?: string
  /** What you actually did. Two to four lines reads best. */
  highlights?: string[]
  technologies?: string[]
  links?: ExternalLink[]
}

export interface Education {
  id: string
  institution: string
  /** "High School Diploma", "B.S. Nuclear Engineering". */
  credential?: string
  location?: string
  period: string
  /** "Class of 2027", "Expected 2031". */
  note?: string
  /** Relevant classes. Only list ones you have actually taken. */
  coursework?: string[]
  highlights?: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  /** Leave out if it does not expire. */
  expires?: string
  credentialId?: string
  href?: string
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

/**
 * Deliberately has no "level" or percentage. A number out of ten means
 * nothing to a reader and is impossible to defend in an interview. Instead
 * every skill can point at the projects that demonstrate it, and the site
 * turns those into links.
 */
export interface Skill {
  name: string
  /** One short clause on how it is used. Not a definition of the tool. */
  note?: string
  /** Slugs of projects that show this skill in use. */
  evidence?: string[]
}

export interface SkillGroup {
  id: string
  title: string
  /** A line explaining what this group covers. */
  description?: string
  skills: Skill[]
}

/* ------------------------------------------------------------------ */
/* Categories, profile, site                                            */
/* ------------------------------------------------------------------ */

export interface Category {
  id: string
  label: string
  /** Shown on the projects page when the filter is active. */
  description?: string
}

export interface Profile {
  name: string
  /** The line under your name. Concise and factual. */
  role: string
  /**
   * The small line at the very top of the home page, e.g.
   * ['Nuclear', 'Fusion', 'Simulation']. Joined with a middot.
   */
  disciplines?: string[]
  location?: string
  /** The one-sentence positioning statement in the hero. */
  tagline: string
  /** Hero paragraph. One paragraph, no more. */
  intro: string
  /** The About page, one string per paragraph. */
  about: string[]
  /** Small labeled facts in the hero panel. Keep to four or five. */
  facts?: { label: string; value: string }[]
  /** Optional headshot. The site looks fine without one. */
  photo?: ImageRef
  /** Focus areas listed on the home page. */
  focus?: { title: string; description: string }[]
  /**
   * Subjects you work in, for the structured-data block that search engines
   * read. Never shown on the page — it is the machine-readable version of
   * what the home page already says in prose.
   */
  knowsAbout?: string[]
  /** Set to null until a real PDF exists in public/resume/. */
  resume: { href: string; label: string; updated?: string } | null
}

export interface SiteConfig {
  /** Browser tab title and the fallback share title. */
  title: string
  /** The short name in the header. */
  shortName: string
  description: string
  /** Full public URL including trailing slash. Must match `base` in vite.config.ts. */
  url: string
  /** Share-preview image under public/. */
  ogImage?: string
  /** Language tag for <html lang>. */
  locale: string
  /** Shown in the footer next to the year. */
  footerNote?: string
}
