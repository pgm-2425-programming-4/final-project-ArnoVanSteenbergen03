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
  const [project, setProject] = useState(null);

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
        setProject(projectData || null);
      } catch {
        setProjectName(`Project ${slug}`);
        setProject(null);
      }
    }
    fetchProject();
  }, [slug]);

  if (!project) return <p>Loading project...</p>;

  return (
    <div>
      <Searchbar
        onViewBacklog={() => setShowBacklog(true)}
        onStackTypeChange={setSelectedStackType}
        activeProjectName={projectName}
        currentProject={project}
      />
      <h3>Welcome to project {projectName}</h3>
      {showBacklog ? (
        <>
          <PaginatedBacklog project={project} />
          <button
            className="backlog__button"
            onClick={() => setShowBacklog(false)}
          >
            Back to board
          </button>
        </>
      ) : (
        <ProjectBoard
          project={project}
          selectedStackType={selectedStackType}
        />
      )}
    </div>
  );
}

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectPage,
});
