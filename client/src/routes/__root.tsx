import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navigation from '../components/Navigation'
import Searchbar from '../components/Searchbar'
import { useState } from 'react'
import PaginatedBacklog from '../components/PaginatedBacklog'
import '../App.css'

export const Route = createRootRoute({
  component: function RootLayout() {
    const [showBacklog, setShowBacklog] = useState(false)

    const handleViewBacklog = () => setShowBacklog(true)

    return (
      <main className="content">
        <Navigation />
        <Searchbar onViewBacklog={handleViewBacklog} />
        {showBacklog && <PaginatedBacklog projectId={1} />}
        <Outlet />
      </main>
    )
  }
})