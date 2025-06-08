import { useState, useEffect } from "react";
import ProjectBoard from "../../components/ProjectBoard";
import Searchbar from "../../components/Searchbar";
import PaginatedBacklog from "../../components/PaginatedBacklog";
import { createFileRoute } from "@tanstack/react-router";

function ProjectPage() {
  const { slug } = Route.useParams();
  const [showBacklog, setShowBacklog] = useState(false);
  const [selectedStackType, setSelectedStackType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const params = new URLSearchParams({
          "filters[slug][$eq]": slug,
        });
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/projects?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        const data = await res.json();
        const projectData = data.data?.[0];
        setProjectName(projectData?.project_name || `Project ${slug}`);
        setProjectId(projectData?.id || null);
      } catch {
        setProjectName(`Project ${slug}`);
        setProjectId(null);
      }
    }
    fetchProject();
  }, [slug]);

  if (!projectId) return <p>Loading project...</p>;

  return (
    <div>
      <Searchbar
        onViewBacklog={() => setShowBacklog(true)}
        onStackTypeChange={setSelectedStackType}
        activeProjectName={projectName}
      />
      <h3>Welcome to project {projectName}</h3>
      {showBacklog ? (
        <>
          <button onClick={() => setShowBacklog(false)}>Back to board</button>
          <PaginatedBacklog projectId={projectId} />
        </>
      ) : (
        <ProjectBoard
          projectId={projectId}
          selectedStackType={selectedStackType}
        />
      )}
    </div>
  );
}

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectPage,
});
