import React from "react";
import withFetch from "../HOC/fetchHOC";

const Userlist = ({ data }) => {
  let renderedUser = data.map((usr) => {
    return <li key={usr.id}>{`${usr.firstName} ${usr.lastName}`}</li>;
  });

  return (
    <>
      <div>{renderedUser}</div>
    </>
  );
};

const dataExtractorForUser = (response) => {
  // Assuming the API response contains users in the "users" property
  return response.data || [];
};

const SearchUser = withFetch(Userlist, "users", dataExtractorForUser);

export default SearchUser;
