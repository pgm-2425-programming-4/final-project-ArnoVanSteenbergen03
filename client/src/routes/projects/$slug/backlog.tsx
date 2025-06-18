import React from "react";
import { useParams } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import PaginatedBacklog from "../../../components/PaginatedBacklog";

function ProjectBacklog() {
  const { slug } = useParams({ strict: false });

  return (
    <div>
      <h2>Backlog for Project {slug}</h2>
      <PaginatedBacklog project={slug} />
    </div>
  );
}

export const Route = createFileRoute("/projects/$slug/backlog")({
  component: ProjectBacklog,
});
