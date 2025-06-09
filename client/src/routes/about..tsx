import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about/")({
  component: About,
});

function About() {
  return (
    <>
      <h1>About this project</h1>
      <p>
        This project is a demonstration of using React Router for file-based
        routing. We learned how to use React for building user interfaces and we
        also used Strapi for our data management.
      </p>


      <p>Made by Van Steenbergen Arno</p>
      <a href="https://www.linkedin.com/in/arno-van-steenbergen-a6092a290/" target="_blank">Linkedin</a>
    </>
  );
}
