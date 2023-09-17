import fetch from "node-fetch"; // Import node-fetch for making HTTP requests
import dataExtractorForUser from "../../src/utils/dataextract.js"; // Import the dataExtractorForUser function

describe("dataExtractorForUser function", () => {
  it("should extract users from API response", async () => {
    const url = "https://dummyjson.com/users";

    const response = await fetch(url);
    expect(response.status).toBe(200);

    // Parse the JSON response
    const responseData = await response.json();

    const users = dataExtractorForUser(responseData);

    expect(Array.isArray(users)).toBe(true);

    users.forEach((user) => {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("firstName");
      expect(user).toHaveProperty("lastName");
      // Add more properties as needed
    });
  });
});
