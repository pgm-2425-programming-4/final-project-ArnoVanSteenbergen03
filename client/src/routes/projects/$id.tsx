import { createFileRoute } from '@tanstack/react-router';

function ProjectPage() {
  const { id } = Route.useParams();
  // You can fetch and display project data here using the id
  return (
    <div>
      <h2>Project {id}</h2>
      {/* Add your project details or tasks here */}
    </div>
  );
}

export const Route = createFileRoute('/projects/$id')({
  component: ProjectPage,
});