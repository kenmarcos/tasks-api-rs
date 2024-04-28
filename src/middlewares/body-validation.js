export const bodyValidation = (title, description) => {
  const messagesError = [];

  if (title === undefined) {
    messagesError.push({ title: "Title is required" });
  }

  if (description === undefined) {
    messagesError.push({ description: "Description is required" });
  }

  return messagesError;
};
