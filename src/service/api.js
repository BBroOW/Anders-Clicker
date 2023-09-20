export async function getMemes() {
    try {
      const apiUrl = "https://api.imgflip.com/get_memes";
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data; // Return the data object from the API response
    } catch (error) {
      console.error("Error fetching memes:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  }

