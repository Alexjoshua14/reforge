'use client'

import { ThemeProvider } from "./ThemeProvider";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"

      themes={['dark', 'light', 'case-study']}
    >
      {children}
    </ThemeProvider>
  )
}