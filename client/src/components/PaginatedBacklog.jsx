import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Backlog from "./Backlog";
import Pagination from "./Pagination";

const fetchTasks = async (page) => {
  const res = await axios.get("http://localhost:1337/api/tasks", {
  params: {
    "populate[task_status]": "*",
    "filters[task_status][slug][$eq]": "backlog",
    "pagination[page]": page,
    "pagination[pageSize]": 5,
  },
});

  const { data, meta } = res.data;

  return {
    tasks: data.map((task) => ({
      id: task.id,
      title: task.attributes.title,
      status: task.attributes.task_status?.data?.attributes?.name || "Onbekend",
    })),
    currentPage: meta.pagination.page,
    totalPages: meta.pagination.pageCount,
  };
};



function PaginatedBacklog() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["backlog", page],
    queryFn: () => fetchTasks(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Bezig met laden...</p>;
  if (isError) return <p>Er ging iets mis!</p>;

  return (
    <>
      <Backlog tasks={data.tasks} />
      <Pagination
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />
    </>
  );
}

export default PaginatedBacklog;
