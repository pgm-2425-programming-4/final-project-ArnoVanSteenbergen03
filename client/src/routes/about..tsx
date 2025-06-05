import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about/')({
  component: About,
})

function About() {
  return <h2>About Page</h2>;
}