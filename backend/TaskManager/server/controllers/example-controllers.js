const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

// const handleAsyncServerError = (res) => (error) => {
//   console.error(error);
//   res.status(500).json({ error });
// };

export const exampleController = (req, res) => {
  try {
    res.status(200).end();
  } catch (error) {
    handleServerError(res, error);
  }
};
