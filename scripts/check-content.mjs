/**
 * Content check — run it with `npm run check`.
 *
 * This is the safety net for editing src/data. TypeScript already catches
 * misspelled field names and invalid category ids while you type; this catches
 * the things a type system cannot see:
 *
 *   - a `relatedProjects` or skill `evidence` slug that points at nothing
 *   - an image, PDF or video path with no file behind it in public/
 *   - a table row with the wrong number of cells
 *   - two projects sharing a slug, or a slug that will not work in a URL
 *   - missing alt text
 *
 * It imports the real data files, so it can never drift from what the site
 * renders. Errors fail the build in CI. Warnings are advice.
 */
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const publicDir = join(root, 'public')

const data = await import('../src/data/index.ts')
const {
  orderedProjects,
  visibleResearch,
  skillGroups,
  profile,
  contactLinks,
  CATEGORIES,
  site,
  copy,
} = data

const errors = []
const warnings = []
const notes = []

const err = (where, message) => errors.push({ where, message })
const warn = (where, message) => warnings.push({ where, message })

const projectSlugs = new Set(orderedProjects.map((p) => p.slug))
const researchSlugs = new Set(visibleResearch.map((r) => r.slug))
const categoryIds = new Set(CATEGORIES.map((c) => c.id))

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/

/** A path written from the site root must exist under public/. */
function checkAsset(where, path, field) {
  if (!path) return
  if (/^(https?:|mailto:|tel:|data:)/i.test(path)) return
  if (!path.startsWith('/')) {
    err(where, `${field} "${path}" should start with "/" and be written from the site root`)
    return
  }
  if (!existsSync(join(publicDir, path.replace(/^\//, '')))) {
    err(where, `${field} "${path}" has no file at public${path}`)
  }
}

function checkImage(where, image, field) {
  if (!image) return
  checkAsset(where, image.src, field)
  if (image.alt === undefined) {
    err(where, `${field} is missing alt text`)
  } else if (image.alt.trim() && image.alt.trim().length < 8) {
    warn(where, `${field} alt text is very short: "${image.alt}"`)
  }
  if ((image.width && !image.height) || (image.height && !image.width)) {
    warn(where, `${field} has only one of width/height — give both or neither`)
  }
}

/** Walk every block in a case study or research body. */
function checkBlocks(where, sections) {
  sections.forEach((section, si) => {
    if (!section.title || !section.title.trim()) err(where, `section ${si + 1} has no title`)
    if (!Array.isArray(section.blocks) || section.blocks.length === 0) {
      warn(where, `section "${section.title}" has no blocks`)
      return
    }

    section.blocks.forEach((block, bi) => {
      const at = `${where} > "${section.title}" block ${bi + 1} (${block.kind})`
      switch (block.kind) {
        case 'figure':
          checkImage(at, block.image, 'image')
          break
        case 'gallery':
          if (!block.images || block.images.length === 0) err(at, 'gallery has no images')
          for (const [i, im] of (block.images ?? []).entries()) checkImage(at, im, `image ${i + 1}`)
          break
        case 'video':
          checkAsset(at, block.src, 'src')
          checkAsset(at, block.poster, 'poster')
          if (!block.alt || !block.alt.trim())
            err(at, 'video needs an `alt` describing what happens in it')
          break
        case 'table': {
          const cols = block.columns ? block.columns.length : 0
          if (!cols) err(at, 'table has no columns')
          for (const [i, row] of (block.rows ?? []).entries()) {
            if (row.length !== cols)
              err(at, `row ${i + 1} has ${row.length} cells but there are ${cols} columns`)
          }
          break
        }
        case 'text': {
          const parts = Array.isArray(block.text) ? block.text : [block.text]
          if (parts.some((p) => !p || !p.trim())) err(at, 'contains an empty paragraph')
          break
        }
        case 'embed':
          if (!/^https?:\/\//i.test(block.src)) err(at, `embed src "${block.src}" must be a full URL`)
          if (!block.title || !block.title.trim())
            err(at, 'embed needs a title (screen readers announce it)')
          break
        case 'equation':
          if (!block.expression || !block.expression.trim()) err(at, 'equation has no expression')
          break
        default:
          break
      }
    })
  })
}

/* ---------------------------------------------------------------- projects */
const seenSlugs = new Set()
for (const project of orderedProjects) {
  const where = `project "${project.slug}"`

  if (seenSlugs.has(project.slug)) err(where, 'duplicate slug — every project needs its own')
  seenSlugs.add(project.slug)

  if (!SLUG_RE.test(project.slug))
    err(where, 'slug must be lowercase letters, numbers and single hyphens')
  if (!project.title || !project.title.trim()) err(where, 'missing title')
  if (!project.summary || !project.summary.trim()) err(where, 'missing summary')
  else if (project.summary.length > 260)
    warn(where, `summary is ${project.summary.length} characters — it will crowd the card`)

  if (!project.categories || project.categories.length === 0)
    err(where, 'needs at least one category')
  for (const id of project.categories ?? []) {
    if (!categoryIds.has(id))
      err(where, `unknown category "${id}" — add it to src/data/categories.ts`)
  }

  checkImage(where, project.thumbnail, 'thumbnail')

  for (const slug of project.relatedProjects ?? []) {
    if (slug === project.slug) warn(where, 'lists itself in relatedProjects')
    else if (!projectSlugs.has(slug)) err(where, `relatedProjects "${slug}" is not a project`)
  }
  for (const slug of project.relatedResearch ?? []) {
    if (!researchSlugs.has(slug)) err(where, `relatedResearch "${slug}" is not a research entry`)
  }

  for (const link of project.links ?? []) {
    if (!link.label || !link.label.trim()) err(where, 'a link has no label')
    if (link.href) checkAsset(where, link.href, `link "${link.label}"`)
  }
  for (const [field, url] of [
    ['repo', project.repo],
    ['liveDemo', project.liveDemo],
  ]) {
    if (url && !/^https?:\/\//i.test(url)) err(where, `${field} should be a full URL`)
  }

  if (project.caseStudy) {
    checkImage(where, project.caseStudy.hero, 'case study hero')
    if (!project.caseStudy.sections || project.caseStudy.sections.length === 0)
      err(where, 'caseStudy has no sections')
    else checkBlocks(where, project.caseStudy.sections)
  }
}

if (!orderedProjects.some((p) => p.featured)) {
  warn('projects', 'nothing is marked `featured: true` — the home page falls back to the first three')
}

/* ---------------------------------------------------------------- research */
const seenResearch = new Set()
for (const entry of visibleResearch) {
  const where = `research "${entry.slug}"`
  if (seenResearch.has(entry.slug)) err(where, 'duplicate slug')
  seenResearch.add(entry.slug)

  if (!SLUG_RE.test(entry.slug)) err(where, 'slug must be lowercase and hyphenated')
  if (!entry.authors || entry.authors.length === 0) err(where, 'needs at least one author')
  if (!entry.abstract || !entry.abstract.trim()) err(where, 'missing abstract')
  if (!entry.topics || entry.topics.length === 0)
    warn(where, 'has no topics, so it will not show any tags')

  checkAsset(where, entry.pdf, 'pdf')
  for (const [i, figure] of (entry.figures ?? []).entries()) {
    checkImage(where, figure, `figure ${i + 1}`)
  }

  if (entry.relatedProject && !projectSlugs.has(entry.relatedProject))
    err(where, `relatedProject "${entry.relatedProject}" is not a project`)
  if (entry.doi && /^https?:/i.test(entry.doi))
    err(where, 'doi should be the bare identifier (10.xxxx/yyy), not a URL')
  if (entry.status === 'published' && !entry.pdf && !entry.publication && !entry.doi)
    warn(where, 'is marked published but has no PDF, publication link or DOI')

  if (entry.body) checkBlocks(where, entry.body)
}

/* ------------------------------------------------------------------ skills */
for (const group of skillGroups) {
  if (!group.skills || group.skills.length === 0) warn(`skill group "${group.id}"`, 'has no skills')
  for (const skill of group.skills ?? []) {
    for (const slug of skill.evidence ?? []) {
      if (!projectSlugs.has(slug))
        err(`skill "${skill.name}"`, `evidence "${slug}" is not a project slug`)
    }
  }
}

/* ----------------------------------------------------------------- profile */
checkImage('profile', profile.photo, 'photo')
if (profile.resume) checkAsset('profile', profile.resume.href, 'resume.href')
else notes.push('No résumé is set, so the résumé buttons are hidden. See src/data/profile.ts.')

for (const link of contactLinks) {
  if (!link.href.trim()) {
    notes.push(`Contact link "${link.label}" is empty, so it is hidden. See src/data/links.ts.`)
  } else if (!/^(https?:|mailto:|tel:)/i.test(link.href)) {
    err('links', `"${link.label}" href should be a full URL or a mailto: address`)
  }
}

if (site.ogImage) checkAsset('site', site.ogImage, 'ogImage')
if (!site.url.endsWith('/')) warn('site', 'site.url should end with a trailing slash')

/* -------------------------------------------------------------------- copy
 * src/data/copy.ts is prose, so there is not much a type can say about it.
 * The one thing that can genuinely break the page is a `{placeholder}` the
 * component has no value for — it would render as literal braces on the live
 * site. Below is the list of what each line is actually given. Anything else
 * is an error, which is what makes it safe to tell someone they can move a
 * placeholder around or delete it.
 *
 * If you add a placeholder to a component, add it here too.
 */
const PLACEHOLDERS = {
  'chrome.homeLabel': ['name'],
  'footer.copyright': ['year', 'name'],
  'projects.count': ['projects', 'categories'],
  'projects.viewTitle': ['label'],
  'research.count.one': ['count'],
  'research.count.other': ['count'],
  'engineering.count': ['skills', 'groups'],
  'researchDetail.doi': ['doi'],
  'contact.resumeUpdated': ['date'],
  'article.figure': ['number'],
  'article.table': ['number'],
  'small.moreTags': ['count'],
  'small.plate': ['label'],
  'theme.announce': ['current', 'next'],
}

function checkCopy(node, path = []) {
  for (const [key, value] of Object.entries(node)) {
    const here = [...path, key]
    const dotted = here.join('.')

    if (value && typeof value === 'object') {
      checkCopy(value, here)
      continue
    }

    if (typeof value !== 'string') {
      err('copy', `${dotted} should be a line of text`)
      continue
    }

    if (!value.trim()) {
      err(
        'copy',
        `${dotted} is empty — a heading or label with no words leaves a blank space on the page`,
      )
    }

    const allowed = PLACEHOLDERS[dotted] ?? []
    for (const match of value.matchAll(/\{(\w+)\}/g)) {
      if (!allowed.includes(match[1])) {
        err(
          'copy',
          allowed.length
            ? `${dotted} uses {${match[1]}}, which the page does not supply — it can only use ${allowed.map((a) => `{${a}}`).join(' or ')}`
            : `${dotted} uses {${match[1]}}, but this line is not given any values to fill in`,
        )
      }
    }
  }
}

checkCopy(copy)

// A placeholder listed above that no longer appears anywhere is dead weight in
// this file rather than a fault on the site, so it is only worth a warning.
for (const dotted of Object.keys(PLACEHOLDERS)) {
  const value = dotted.split('.').reduce((o, k) => (o == null ? o : o[k]), copy)
  if (value === undefined) {
    warn('copy', `PLACEHOLDERS in scripts/check-content.mjs lists ${dotted}, which no longer exists`)
  }
}

/* ------------------------------------------------------------------ report */
const rule = '-'.repeat(70)
console.log(rule)
console.log(
  `Content check: ${orderedProjects.length} projects, ${visibleResearch.length} research entries`,
)
console.log(rule)

for (const n of notes) console.log(`  note     ${n}`)
for (const w of warnings) console.log(`  warning  ${w.where}: ${w.message}`)
for (const e of errors) console.log(`  ERROR    ${e.where}: ${e.message}`)
if (notes.length + warnings.length + errors.length === 0) console.log('  Nothing to report.')

console.log(rule)
if (errors.length === 0) {
  console.log(`Passed. ${warnings.length} warning(s), ${notes.length} note(s).`)
} else {
  console.log(`Failed: ${errors.length} error(s), ${warnings.length} warning(s).`)
  process.exit(1)
}
