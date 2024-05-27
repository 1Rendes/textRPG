export async function generateImage(description) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer sk-proj-WIuJh37IrjTRnWB6gY70T3BlbkFJc9xToem77jgzKri8S3Rf",
    },
    body: JSON.stringify({
      prompt: description,
      n: 1,
      size: "512x512",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.error.message}`);
  }

  const data = await response.json();
  return data.data[0].url; // URL згенерованого зображення
}

generateImage("A sunny beach with palm trees")
  .then((imageUrl) => {
    console.log("Generated Image URL:", imageUrl);
  })
  .catch((error) => console.error("Error generating image:", error));
