import { createHash } from 'crypto';

const createHashCustom = (data) => {
  const stringData = JSON.stringify(data);
  const hash = createHash('sha256').update(stringData).digest('hex');
  return hash;
};

export default createHashCustom;
