const checkExpiresAt = (expiresAt) => {
  const now = new Date();
  const expiresAtDate = new Date(expiresAt);
  const expiresAtMinus3Hours = new Date(expiresAtDate.setHours(expiresAtDate.getHours() - 3));
  return now >= expiresAtMinus3Hours;
};

export default checkExpiresAt;
