import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import withFetch from "../../src/HOC/fetchHOC"; // Import your withFetch component
// import { jest } from "@jest/globals";

// global.jest = jest;

// Mock the dataExtractor function
const dataExtractor = jest.fn((response) => response);

describe("withFetch", () => {
  it("fetches data and renders the wrapped component with filtered data", async () => {
    const entity = "user"; // Provide a mock entity
    const WrappedComponent = ({ data }) => (
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );

    // Mock the fetch function to return a resolved Promise with your desired response data
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ]),
    });

    // Render the component with your withFetch HOC
    render(
      <withFetch
        WrappedComponent={WrappedComponent}
        entity={entity}
        dataExtractor={dataExtractor}
      />
    );

    // Wait for the asynchronous fetchData function to complete
    await waitFor(() => {
      // Assert that the fetchData function was called with the expected URL
      expect(global.fetch).toHaveBeenCalledWith(
        `https://jsonplaceholder.typicode.com/${entity}`
      );

      // Assert that the dataExtractor function was called with the response data
      expect(dataExtractor).toHaveBeenCalledWith([
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ]);

      // Assert that the rendered component displays the filtered data
      expect(screen.getByText("User 1")).toBeInTheDocument();
      expect(screen.getByText("User 2")).toBeInTheDocument();
    });
  });

  it("filters data based on search input", async () => {
    const entity = "user"; // Provide a mock entity
    const WrappedComponent = ({ data }) => (
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );

    // Mock the fetch function to return a resolved Promise with your desired response data
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
        { id: 3, name: "User 3" },
      ]),
    });

    // Render the component with your withFetch HOC
    render(
      <withFetch
        WrappedComponent={WrappedComponent}
        entity={entity}
        dataExtractor={dataExtractor}
      />
    );

    // Wait for the asynchronous fetchData function to complete
    await waitFor(() => {
      // Assert that the fetchData function was called with the expected URL
      expect(global.fetch).toHaveBeenCalledWith(
        `https://jsonplaceholder.typicode.com/${entity}`
      );

      // Mock user input to filter the data
      fireEvent.change(screen.getByPlaceholderText("Search by name"), {
        target: { value: "User 1" },
      });

      // Assert that the rendered component displays the filtered data
      expect(screen.getByText("User 1")).toBeInTheDocument();
      expect(screen.queryByText("User 2")).not.toBeInTheDocument();
      expect(screen.queryByText("User 3")).not.toBeInTheDocument();
    });
  });
});
