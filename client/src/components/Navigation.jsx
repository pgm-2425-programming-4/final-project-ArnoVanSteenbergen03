import React from "react";
import { Link } from "@tanstack/react-router";
import { useFetchData } from "./FetchData";

export default function Navigation() {
  const { data: projects = [] } = useFetchData("projects");

  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/" activeProps={{ className: "active" }}>
            Home
          </Link>
        </li>
        <li>
          <h2>PROJECTS</h2>
        </li>
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              to={`/projects/${project.slug}`}
              activeProps={{ className: "active" }}
            >
              {project.project_name || `Project ${project.slug}`}
            </Link>
          </li>
        ))}
        <li>
          <h2>INFO</h2>
        </li>
        <li>
          <Link to="/about" activeProps={{ className: "active" }}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
