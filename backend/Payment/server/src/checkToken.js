import createTinkoffToken from './createTinkoffToken.js';

const checkToken = (currentToken, body) => {
  if (!currentToken) return false;
  const validToken = createTinkoffToken(body);
  return currentToken === validToken;
};

export default checkToken;
