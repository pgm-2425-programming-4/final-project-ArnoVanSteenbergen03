import React from "react";
import { useParams } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import PaginatedBacklog from "../../../components/PaginatedBacklog";

export default function ProjectBacklog() {
  const { id } = useParams({ strict: false });

  return (
    <div>
      <h2>Backlog for Project {id}</h2>
      <PaginatedBacklog projectId={id} />
    </div>
  );
}

export const Route = createFileRoute("/projects/$id/backlog")({
  component: ProjectBacklog,
});
