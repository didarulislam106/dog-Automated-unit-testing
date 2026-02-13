export async function getRandomDogImage() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');

    if (!response.ok) {
      throw new Error(`Dog API returned status ${response.status}`);
    }

    const data = await response.json();

    if (!data.message || !data.status) {
      throw new Error('Invalid response shape from Dog API');
    }

    return {
      imageUrl: data.message,
      status: data.status,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch dog image: ${reason}`);
  }
}
