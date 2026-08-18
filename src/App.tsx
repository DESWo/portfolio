import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { Projects } from '@/pages/Projects'
import { ProjectDetail } from '@/pages/ProjectDetail'
import { Research } from '@/pages/Research'
import { ResearchDetail } from '@/pages/ResearchDetail'
import { Engineering } from '@/pages/Engineering'
import { About } from '@/pages/About'
import { NotFound } from '@/pages/NotFound'

/**
 * The route table. Adding a page means adding a component under src/pages,
 * a <Route> here, and — if it should be in the navigation — an entry in
 * `primaryNav` in src/data/site.ts.
 *
 * Nothing is lazily loaded on purpose. The whole site is a handful of pages
 * and the content is text; splitting it would buy a few kilobytes and cost a
 * loading state on every navigation.
 *
 * `basename` comes from Vite, so the router agrees with the deployment prefix
 * set in vite.config.ts without either being written down twice.
 */
export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/:slug" element={<ResearchDetail />} />
          <Route path="/engineering" element={<Engineering />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
