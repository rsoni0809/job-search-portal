import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import useFetchJobs from "./useFetchJobs";
import { container } from "react-bootstrap";
import { Job } from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);
  console.log("jobs", jobs);
  const handleParamChange = e => {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams(prevParams => {
      return { ...prevParams, [param]: value };
    });
  };
  return (
    <container className="my-4 ml-4 ">
      <h1 className="mb-4">IT Jobs </h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>loading... </h1>} {error && <h2>Error... try again</h2>}
      {jobs.map(job => {
        return <Job key={job.id} job={job} />;
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </container>
  );
}

export default App;
