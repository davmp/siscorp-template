export async function handleSubmit(_: unknown, data: FormData) {
  try {
    const formData = Object.fromEntries(data.entries());

    await new Promise((r) => setTimeout(r, 2000));

    return formData;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to submit form");
  }
}
