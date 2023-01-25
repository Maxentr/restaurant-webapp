"use client"

import React from "react"
import Header from "components/ui/Header"
import withAuth from "components/withAuth"
import HeaderContent from "components/pages/admin/HeaderContent"

type AdminLayoutProps = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <Header content={<HeaderContent />}>
      <div className="p-16">{children}</div>
    </Header>
  )
}

export default withAuth(AdminLayout)
