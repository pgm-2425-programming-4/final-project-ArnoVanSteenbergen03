import { createFileRoute } from '@tanstack/react-router'
import ProjectBoard from '../../components/ProjectBoard'
import Searchbar from '../../components/Searchbar'
import PaginatedBacklog from '../../components/PaginatedBacklog'
import { useState } from 'react';

function ProjectPage() {
  const { id } = Route.useParams();
  const [showBacklog, setShowBacklog] = useState(false);

  return (
    <div>
      <Searchbar onViewBacklog={() => setShowBacklog(true)} />
      <h3>Welcome to project {id}</h3>
      {showBacklog ? (
        <>
          <button onClick={() => setShowBacklog(false)}>Back to board</button>
          <PaginatedBacklog projectId={id} />
        </>
      ) : (
        <ProjectBoard projectId={id} />
      )}
    </div>
  );
}

export const Route = createFileRoute('/projects/$id')({
  component: ProjectPage,
});