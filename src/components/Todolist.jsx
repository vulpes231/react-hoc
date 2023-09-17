import React from "react";
import withFetch from "../HOC/fetchHOC";

const TodoList = ({ data }) => {
  let renderedTasks = null;
  renderedTasks = data.map((task) => {
    return <div className="text-red-500" key={task.id}>{`${task.todo} `}</div>;
  });

  return (
    <>
      <div>{renderedTasks}</div>
    </>
  );
};

// In TodoList.jsx
const dataExtractorForTodo = (response) => {
  // Assuming the API response contains todos in the "todos" property
  return response.data.todos || [];
};

const SearchTasks = withFetch(TodoList, "todo", dataExtractorForTodo);

export default SearchTasks;
