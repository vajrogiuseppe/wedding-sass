import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'   // ← type-only import

type LinkColorContextType = { isLight: boolean }
const LinkColorContext = createContext<LinkColorContextType>({ isLight: true })
export const useLinkColor = () => useContext(LinkColorContext)

export const LinkColorProvider = ({ isLight, children }: { isLight: boolean; children: ReactNode }) => (
  <LinkColorContext.Provider value={{ isLight }}>
    {children}
  </LinkColorContext.Provider>
)