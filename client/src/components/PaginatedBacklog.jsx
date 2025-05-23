import React, { useState, useEffect } from "react";
import Backlog from "./Backlog";
import Pagination from "./Pagination";

export default function PaginatedBacklog() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 5;

  useEffect(() => {
    async function fetchTasks(page) {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          populate: "task_status",
          "filters[task_status][slug][$eq]": "backlog",
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
        });

        const res = await fetch(
          `https://finalprojectserver.netlify.app/api/tasks?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        if (!data.data) {
          throw new Error("No data field in response");
        }

        const formattedTasks = data.data.map((item) => ({
          id: item.id,
          title: item.title,
          status: item.task_status?.slug || "unknown",
        }));

        setTasks(formattedTasks);
        setPageCount(data.meta.pagination.pageCount);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks(currentPage);
  }, [currentPage]);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  return (
    <>
      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && <Backlog tasks={tasks} />}
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChanged={handlePageChange}
      />
    </>
  );
}
