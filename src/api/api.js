export const getFetchUsers = async (BASE_URL) => {
  try {
    const response = await fetch(`${BASE_URL}`);

    return await response.json();
  } catch (error) {
    console.error("[Fetch Error]:", error);

    return [];
  }
};
