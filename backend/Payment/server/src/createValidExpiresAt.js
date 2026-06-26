const createValidExpiresAt = (expiresAt, days = 30) => {
  const today = new Date();
  const expireAt = new Date(expiresAt);

  if (expireAt < today) {
    return new Date(today.setDate(new Date().getDate() + days));
  }
  return new Date(expireAt.setDate(expireAt.getDate() + days));
};

export default createValidExpiresAt;
