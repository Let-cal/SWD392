const API_BASE_URL =
  "https://zodiacjewerlyswd.azurewebsites.net/api/collections";

const deleteCollection = async (collectionId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_BASE_URL}/${collectionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete collection.");
    }

    return response.json();
  } catch (error) {
    console.error("Error deleting collection:", error);
    throw error;
  }
};
export default deleteCollection;
