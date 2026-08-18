import { copy, visibleResearch } from '@/data'
import { plural } from '@/lib/utils'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Container, Section } from '@/components/ui/Section'
import { PageHeader } from '@/components/ui/PageHeader'
import { ResearchCard } from '@/components/research/ResearchCard'

export function Research() {
  usePageMeta({
    title: copy.research.meta.title,
    description: copy.research.meta.description,
    path: '/research',
  })

  return (
    <>
      <PageHeader
        overline={copy.research.overline}
        title={copy.research.title}
        description={copy.research.description}
        meta={
          visibleResearch.length ? plural(visibleResearch.length, copy.research.count) : undefined
        }
      />

      <Section divider={false} padded={false} className="pb-20 sm:pb-24">
        <Container>
          {visibleResearch.length === 0 ? (
            <p className="border-y border-rule py-16 text-center text-ink-muted">
              {copy.research.empty}
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
