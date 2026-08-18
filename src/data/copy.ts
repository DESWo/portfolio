/**
 * ============================================================================
 * EVERY OTHER WORD ON THE SITE
 * ============================================================================
 *
 * The rest of `src/data` holds *your* content — projects, research, education.
 * This file holds the words around it: section headings, button labels, the
 * sentence shown when a category is empty, the text a screen reader announces
 * for the menu button.
 *
 * Between this file and the others, nothing a visitor can read is written
 * inside a component. If you want to change a word on the site, it is either
 * here or in one of the files next to this one — you never need to open a
 * `.tsx` file to rewrite the site's voice.
 *
 * ---------------------------------------------------------------------------
 * PLACEHOLDERS
 * ---------------------------------------------------------------------------
 *
 * Some lines carry a count that the site works out for itself. Those are
 * written as `{name}` and filled in when the page renders:
 *
 *     count: '{projects} projects · {categories} categories'
 *                -> '9 projects · 6 categories'
 *
 * You can move a placeholder, or delete it, or write the line without any at
 * all. What you cannot do is invent a new one — `npm run check` fails on a
 * `{placeholder}` the page has no value for, so a typo is caught before it
 * ships rather than showing up as literal braces on the live site.
 *
 * Lines written as `{ one: …, other: … }` pick a wording by count, so the site
 * says "1 entry" and "2 entries" rather than "1 entries".
 *
 * ---------------------------------------------------------------------------
 * A NOTE ON THE `meta` BLOCKS
 * ---------------------------------------------------------------------------
 *
 * Each page has a `meta` with a `title` and `description`. Those are not shown
 * on the page — they are the browser tab, the Google result, and the preview
 * card when someone pastes a link into Slack or a message. They are worth
 * writing properly, and they are the one piece of copy here that is aimed at
 * someone who has not arrived yet.
 */

export const copy = {
  /* ------------------------------------------------------------------ chrome
   * The header, the mobile menu, and the footer — the parts that are on every
   * page. Navigation *destinations* live in src/data/site.ts; these are only
   * the labels around them.
   */
  chrome: {
    /** Sits next to your name in the header. Shown only when it differs. */
    badge: 'Portfolio',
    /** Announced by a screen reader for the logo link. */
    homeLabel: '{name} — home',
    /** The résumé button in the header. Hidden entirely when you have no PDF. */
    resume: 'Résumé',
    /** Announced for the hamburger button, which changes as it opens. */
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    /** Announced for each navigation landmark. */
    navPrimary: 'Primary',
    navPrimaryMobile: 'Primary (mobile)',
    navSite: 'Site',
    navElsewhere: 'Elsewhere',
  },

  footer: {
    /** Headings above the two link columns. */
    site: 'Site',
    elsewhere: 'Elsewhere',
    /** The year is filled in from the clock, so this never goes stale. */
    copyright: '© {year} {name}',
  },

  /* -------------------------------------------------------------------- home
   * The home page in reading order: the buttons under your intro, then the
   * three-column focus block, then the project and research sections.
   */
  home: {
    /** The two buttons under the intro paragraph in the hero. */
    viewProjects: 'View projects',
    about: 'About',

    /** The three-column block. Only shown when `profile.focus` has entries. */
    focus: {
      overline: 'What I work on',
      title: 'Three things, mostly',
    },

    /** The featured projects. */
    work: {
      overline: 'Selected work',
      title: 'Projects',
      description:
        'Each one started as something I wanted to understand. The case studies go through the model, the assumptions, and what I would do differently.',
      action: 'All projects',
    },

    /** The research list. Hidden when src/data/research.ts is empty. */
    research: {
      overline: 'Research',
      title: 'Open questions',
      description:
        'Technical writing and investigations, including work that has not produced a result yet. The status next to each one is accurate.',
      action: 'All research',
    },
  },

  /* ---------------------------------------------------------------- projects */
  projects: {
    meta: {
      title: 'Projects',
      description:
        'Engineering projects by Desmond Wong: reactor and plasma simulations, structural solvers, and interactive technical explainers.',
    },
    overline: 'Work',
    title: 'Projects',
    description:
      'Things I built to understand how something works. Most have a case study going through the model, the assumptions and the trade-offs.',
    count: '{projects} projects · {categories} categories',

    /** The filter row. `all` is the button that clears the filter. */
    all: 'All',
    /** Announced for the grid/index switch, and used in each button's tooltip. */
    layoutLabel: 'Layout',
    grid: 'Grid',
    index: 'Index',
    viewTitle: '{label} view',

    /** Shown when a filter matches nothing. */
    empty: 'No projects in this category yet.',
  },

  /* ---------------------------------------------------------------- research */
  research: {
    meta: {
      title: 'Research',
      description:
        'Technical writing and investigations by Desmond Wong, covering fusion reactor architectures, plasma physics and nuclear energy.',
    },
    overline: 'Writing & investigation',
    title: 'Research',
    description:
      'Work in progress as much as work finished. Each entry says exactly what stage it is at, and nothing here claims a result it does not have.',
    count: { one: '{count} entry', other: '{count} entries' },
    empty: 'Nothing published here yet.',
    /** The link on each card through to the full entry. */
    readMore: 'Read more',
    pdf: 'PDF',
  },

  /* ------------------------------------------------------------- engineering */
  engineering: {
    meta: {
      title: 'Engineering',
      description:
        'Tools, methods and subject matter Desmond Wong has used in practice, each linked to the project that demonstrates it.',
    },
    overline: 'Capabilities',
    title: 'Engineering & tools',
    description:
      'What I can actually do, and where I have done it. Everything with a link next to it has a repository behind it — there are no self-assessed proficiency levels on this page because I do not think they mean anything.',
    count: '{skills} entries · {groups} groups',
  },

  /* ------------------------------------------------------------------- about
   * Headings only. The prose on this page is `profile.about` in
   * src/data/profile.ts, and each section disappears when its data file is
   * empty — so these headings are never shown over nothing.
   */
  about: {
    meta: { title: 'About' },
    /**
     * The masthead. The heading and the line under it are your name and role
     * from src/data/profile.ts, so only the small label above them is here.
     */
    overline: 'About',
    /** The same overline sits above all three record sections. */
    recordOverline: 'Record',
    experience: 'Experience',
    education: 'Education',
    certifications: 'Certifications',
    /** The link on a certification that has a verification URL. */
    verify: 'Verify',
  },

  /* ---------------------------------------------------------- project detail */
  project: {
    /** The back link at the top of the page. */
    back: 'All projects',
    /** Headings in the left-hand rail. */
    links: 'Links',
    builtWith: 'Built with',
    outcomes: 'Outcomes',
    /** Labels generated for `liveDemo` and `repo`, which are URLs not labels. */
    liveSite: 'Live site',
    sourceCode: 'Source code',

    relatedResearch: 'Related research',
    nextToRead: 'Next to read',

    /**
     * Shown in place of the article when a project has no `caseStudy`. The
     * second half is appended only when the project has links to offer, so the
     * sentence stays true either way.
     */
    noCaseStudy: 'There is no long-form write-up for this one yet. The summary above is the whole story for now',
    noCaseStudyWithLinks: ', and the links have the rest',
    noCaseStudyEnd: '.',

    /** The previous/next pager at the foot of the page. */
    pagerLabel: 'Project navigation',
    previous: 'previous',
    next: 'next',

    /** The browser tab when a slug matches nothing. */
    notFound: 'Project not found',
  },

  /* --------------------------------------------------------- research detail */
  researchDetail: {
    back: 'All research',
    topics: 'Topics',
    links: 'Links',
    abstract: 'Abstract',
    /** Used twice: on the card in the list, and again on the entry's own page. */
    progress: 'Where it stands',
    citation: 'Cite as',
    downloadPdf: 'Download PDF',
    /** The DOI link text. The identifier itself is appended. */
    doi: 'DOI {doi}',
    notFound: 'Research not found',
  },

  /* ----------------------------------------------------------------- article
   * The sticky rail beside a long case study, and the small labels a case
   * study's own blocks draw around your figures, tables and equations.
   *
   * Figures and tables are numbered across the whole page the way they are in
   * a report, so a caption can say "Fig. 3" and mean it. The number itself is
   * worked out for you; only the word in front of it is here.
   */
  article: {
    contents: 'Contents',
    figure: 'Fig. {number}',
    table: 'Table {number}',
    /** The heading over an equation's symbol definitions. */
    where: 'where',
  },

  /* ------------------------------------------------------------------ small
   * Labels on individual controls and generated images. Short, and mostly
   * read aloud rather than seen.
   */
  small: {
    /** The first link on every page, reachable by pressing Tab once. */
    skipToContent: 'Skip to content',
    /** Sits at the end of a shortened tag row, e.g. "+4". */
    moreTags: '+{count}',
    /**
     * Alt text for the drawn plate a project without a screenshot gets. The
     * first form is used when there is a title to name, the second when there
     * is not.
     */
    plate: '{label} — placeholder technical plate',
    plateUntitled: 'Placeholder technical plate',
  },

  /* ------------------------------------------------------------------ theme
   * The light/dark/system button in the header. It cycles, so each state has
   * both a name and a description of what pressing it will do next — the
   * control has to be usable without seeing which icon is showing.
   */
  theme: {
    light: 'Light theme',
    dark: 'Dark theme',
    system: 'System theme',
    toDark: 'Switch to dark theme',
    toLight: 'Switch to light theme',
    toSystem: 'Follow the system theme',
    /** How the two are read out together. */
    announce: '{current}. {next}.',
  },

  /* ------------------------------------------------------------------- cards
   * The links at the foot of a project card, on the home page and elsewhere.
   * The first changes depending on whether there is a case study to read.
   */
  cards: {
    readCaseStudy: 'Read the case study',
    projectDetails: 'Project details',
    live: 'Live',
    source: 'Source',
  },

  /* ----------------------------------------------------------------- contact
   * The block at the foot of the home page and the About page. There is no
   * form — see the note in src/components/layout/ContactStrip.tsx.
   */
  contact: {
    overline: 'Contact',
    title: 'Get in touch',
    description:
      'Email is the surest way to reach me. I am interested in engineering programmes, research opportunities, and anyone working on the problems above.',
    /** The résumé row, shown only once you have a PDF. */
    resume: 'Résumé',
    resumeUpdated: 'Updated {date}',
  },

  /* --------------------------------------------------------------- not found
   * Also shown in place of a project or research entry whose slug matches
   * nothing, so a stale link lands somewhere useful.
   */
  notFound: {
    meta: { title: 'Page not found' },
    overline: 'Error 404',
    title: 'This page does not exist',
    description:
      'The address is wrong, or something that used to be here has moved. The projects below are a reasonable place to restart.',
    home: 'Home',
    allProjects: 'All projects',
  },
}
