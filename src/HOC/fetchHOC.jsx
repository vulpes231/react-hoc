import React from "react";

const withFetch = (WrappedComponent, entity, dataExtractor) => {
  class withFetchApi extends React.Component {
    state = {
      data: [],
      search: "",
    };

    componentDidMount() {
      const fetchData = async () => {
        const url = `https://dummyjson.com/${entity}`;
        const res = await fetch(url);
        const response = await res.json();

        // console.log(response);

        const extractedData = dataExtractor(response);
        console.log(extractedData);

        if (response && dataExtractor && typeof dataExtractor === "function") {
          // Use the callback version of setState to ensure the state update is applied correctly
          this.setState((prevState) => ({
            ...prevState,
            data: extractedData,
          }));
        }
      };

      fetchData();
      console.log(this.state.data);
    }

    render() {
      let { search, data } = this.state;

      let filteredData = data
        .filter((d) => {
          if (entity === "user") {
            const { firstName, lastName } = d;
            return (
              firstName.toLowerCase().includes(search.toLowerCase()) ||
              lastName.toLowerCase().includes(search.toLowerCase())
            );
          }

          if (entity === "todo") {
            const { todo } = d;
            return (
              todo.toLowerCase().includes(search.toLowerCase()) ||
              todo.toLowerCase().includes(search.toLowerCase())
            );
          }
        })
        .slice(0, 10);

      return (
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) =>
              this.setState({ ...this.state, search: e.target.value })
            }
            placeholder="Search by name"
          />
          <WrappedComponent data={filteredData} />
        </div>
      );
    }
  }
  return withFetchApi;
};

export default withFetch;
