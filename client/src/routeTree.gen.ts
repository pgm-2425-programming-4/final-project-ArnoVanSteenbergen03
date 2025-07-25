/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as IndexImport } from "./routes/index";
import { Route as ProjectsSlugImport } from "./routes/projects/$slug";
import { Route as AboutImport } from "./routes/about.";
import { Route as ProjectsSlugBacklogImport } from "./routes/projects/$slug/backlog";

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const ProjectsSlugRoute = ProjectsSlugImport.update({
  id: "/projects/$slug",
  path: "/projects/$slug",
  getParentRoute: () => rootRoute,
} as any);

const AboutRoute = AboutImport.update({
  id: "/about/",
  path: "/about/",
  getParentRoute: () => rootRoute,
} as any);

const ProjectsSlugBacklogRoute = ProjectsSlugBacklogImport.update({
  id: "/backlog",
  path: "/backlog",
  getParentRoute: () => ProjectsSlugRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/about/": {
      id: "/about/";
      path: "/about";
      fullPath: "/about";
      preLoaderRoute: typeof AboutImport;
      parentRoute: typeof rootRoute;
    };
    "/projects/$slug": {
      id: "/projects/$slug";
      path: "/projects/$slug";
      fullPath: "/projects/$slug";
      preLoaderRoute: typeof ProjectsSlugImport;
      parentRoute: typeof rootRoute;
    };
    "/projects/$slug/backlog": {
      id: "/projects/$slug/backlog";
      path: "/backlog";
      fullPath: "/projects/$slug/backlog";
      preLoaderRoute: typeof ProjectsSlugBacklogImport;
      parentRoute: typeof ProjectsSlugImport;
    };
  }
}

// Create and export the route tree

interface ProjectsSlugRouteChildren {
  ProjectsSlugBacklogRoute: typeof ProjectsSlugBacklogRoute;
}

const ProjectsSlugRouteChildren: ProjectsSlugRouteChildren = {
  ProjectsSlugBacklogRoute: ProjectsSlugBacklogRoute,
};

const ProjectsSlugRouteWithChildren = ProjectsSlugRoute._addFileChildren(
  ProjectsSlugRouteChildren
);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/about": typeof AboutRoute;
  "/projects/$slug": typeof ProjectsSlugRouteWithChildren;
  "/projects/$slug/backlog": typeof ProjectsSlugBacklogRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/about": typeof AboutRoute;
  "/projects/$slug": typeof ProjectsSlugRouteWithChildren;
  "/projects/$slug/backlog": typeof ProjectsSlugBacklogRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/about/": typeof AboutRoute;
  "/projects/$slug": typeof ProjectsSlugRouteWithChildren;
  "/projects/$slug/backlog": typeof ProjectsSlugBacklogRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "/about" | "/projects/$slug" | "/projects/$slug/backlog";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/about" | "/projects/$slug" | "/projects/$slug/backlog";
  id:
    | "__root__"
    | "/"
    | "/about/"
    | "/projects/$slug"
    | "/projects/$slug/backlog";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  AboutRoute: typeof AboutRoute;
  ProjectsSlugRoute: typeof ProjectsSlugRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  ProjectsSlugRoute: ProjectsSlugRouteWithChildren,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about/",
        "/projects/$slug"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about/": {
      "filePath": "about..tsx"
    },
    "/projects/$slug": {
      "filePath": "projects/$slug.tsx",
      "children": [
        "/projects/$slug/backlog"
      ]
    },
    "/projects/$slug/backlog": {
      "filePath": "projects/$slug/backlog.tsx",
      "parent": "/projects/$slug"
    }
  }
}
ROUTE_MANIFEST_END */
