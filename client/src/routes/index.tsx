import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <p>Welcome to my website!</p>
      <p>This is a Kanban style app</p>
    </div>
  );
}
