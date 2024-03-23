import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from "@tanstack/react-router";
import Header from "@/components/Header";

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

export function LayoutComponent() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <Footer > */}
    </div>
  )
}