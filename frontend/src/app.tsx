import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './components/theme/theme-provider'
import { Toaster } from './components/ui/sonner'
import { ProjectProvider } from './context/project-context'
import { queryClient } from './lib/react-query'
import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="project.manager-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | project.manager" />
        <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <ProjectProvider>
            <RouterProvider router={router} />
          </ProjectProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
