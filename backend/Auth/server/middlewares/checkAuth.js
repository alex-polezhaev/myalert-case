const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const checkAuth = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      next();
    } else res.status(401).end('User is not authenticated');
  } catch (err) {
    handleServerError(res, err);
  }
};
