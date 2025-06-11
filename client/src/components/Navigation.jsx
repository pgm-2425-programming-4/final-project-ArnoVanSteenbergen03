import React from "react";
import { Link } from "@tanstack/react-router";
import { useFetchData } from "./FetchData";

export default function Navigation() {
  const { data: projects = [] } = useFetchData("projects");

  return (
    <nav className="navigation">
      <ul className="nav__list">
        <li className="nav__item">
          <Link to="/" activeProps={{ className: "active" }}>
            Home
          </Link>
        </li>
        <li className="nav__item">
          <h2 className="nav__title">PROJECTS</h2>
        </li>
        {projects.map((project) => (
          <li key={project.id} className="nav__item">
            <Link
              to={`/projects/${project.slug}`}
              activeProps={{ className: "active" }}
            >
              {project.project_name || `Project ${project.slug}`}
            </Link>
          </li>
        ))}
        <li className="nav__item">
          <h2 className="nav__title">INFO</h2>
        </li>
        <li className="nav__item">
          <Link to="/about" activeProps={{ className: "active" }}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
