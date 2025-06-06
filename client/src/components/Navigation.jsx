import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export default function Navigation() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/projects`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        const data = await res.json();
        setProjects(data.data || []);
      } catch (err) {
        console.log(err)
        setProjects([]);
      }
    }
    fetchProjects();
  }, []);

  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>
              {project.project_name || `Project ${project.id}`}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}