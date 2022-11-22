import React, { ReactNode } from "react"

type GuestLayoutProps = {
  content: ReactNode
  children: ReactNode
}

const Header = ({ content, children }: GuestLayoutProps) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-gray-50">
      <nav className="sticky top-0 h-16 flex flex-grow flex-row items-center justify-between bg-gray-900 px-4">
        { content }
      </nav>
      <div className="w-full h-[calc(100%-64px)] flex flex-col gap-8 bg-gray-50">
        {children}
      </div>
    </div>
  )
}

export default Header
