import React from "react";
import SearchUser from "./components/Userlist";
import SearchTasks from "./components/Todolist";

const App = () => {
  return (
    <div>
      <h1>HOC</h1>
      <section className="section">
        <div>
          <SearchUser />
        </div>
        <div>
          <SearchTasks />
        </div>
      </section>
    </div>
  );
};

export default App;
