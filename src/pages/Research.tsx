import { visibleResearch } from '@/data'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Container, Section } from '@/components/ui/Section'
import { PageHeader } from '@/components/ui/PageHeader'
import { ResearchCard } from '@/components/research/ResearchCard'

export function Research() {
  usePageMeta({
    title: 'Research',
    description:
      'Technical writing and investigations by Desmond Wong, covering fusion reactor architectures, plasma physics and nuclear energy.',
    path: '/research',
  })

  return (
    <>
      <PageHeader
        overline="Writing & investigation"
        title="Research"
        description="Work in progress as much as work finished. Each entry says exactly what stage it is at, and nothing here claims a result it does not have."
        meta={
          visibleResearch.length
            ? `${visibleResearch.length} ${visibleResearch.length === 1 ? 'entry' : 'entries'}`
            : undefined
        }
      />

      <Section divider={false} padded={false} className="pb-20 sm:pb-24">
        <Container>
          {visibleResearch.length === 0 ? (
            <p className="border-y border-rule py-16 text-center text-ink-muted">
              Nothing published here yet.
            </p>
          ) : (
            <div className="border-t border-rule pt-10">
              {visibleResearch.map((entry, i) => (
                <ResearchCard key={entry.slug} entry={entry} index={i} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
