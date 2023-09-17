const dataExtractorForUser = (response) => {
  // Assuming the API response contains users in the "users" property
  return response.data || [];
};

export default dataExtractorForUser;
