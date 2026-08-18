import { orderedProjects } from '@/data'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Container } from '@/components/ui/Section'
import { ActionLink } from '@/components/ui/ActionLink'
import { ProjectCard } from '@/components/project/ProjectCard'

/**
 * The 404 page.
 *
 * It is also rendered in place by /projects/:slug and /research/:slug when the
 * slug does not match anything, so a stale link to a renamed project lands
 * somewhere useful instead of on a blank screen.
 *
 * GitHub Pages has no server-side fallback for client-side routes, so the
 * deploy workflow copies index.html to 404.html. That makes Pages serve the
 * app for any unknown path, and the router then decides what to show.
 */
export function NotFound() {
  usePageMeta({ title: 'Page not found', path: '/404' })

  const suggestions = orderedProjects.slice(0, 3)

  return (
    <Container className="py-20 sm:py-28">
      <p className="overline mb-5">Error 404</p>
      <h1 className="text-title font-semibold text-ink">This page does not exist</h1>
      <p className="mt-5 max-w-lg text-lead text-ink-muted">
        The address is wrong, or something that used to be here has moved. The projects below are
        a reasonable place to restart.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <ActionLink href="/" variant="solid" icon="arrow-right">
          Home
        </ActionLink>
        <ActionLink href="/projects" variant="outline">
          All projects
        </ActionLink>
      </div>

      {suggestions.length ? (
        <div className="mt-20 grid gap-x-8 gap-y-12 border-t border-rule pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((project) => (
            <ProjectCard key={project.slug} project={project} headingLevel={2} />
          ))}
        </div>
      ) : null}
    </Container>
  )
}
