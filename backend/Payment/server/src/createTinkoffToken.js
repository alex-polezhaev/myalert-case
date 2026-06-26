import { createHash } from 'crypto';
/**
 * @name createTinkoffToken
 * @param tokenBody - Request body that will be signed
 * @description Implementation of the signing algorithm that produces the request signature (token)
 * @link https://www.tinkoff.ru/kassa/dev/payments/#section/Podpis-zaprosa - Description of the signing algorithm
 * @link https://tokentcs.web.app - Use this link to verify the request signature (token)
 */

const createTinkoffToken = (tokenBody) => {
  const Password = process.env.TINKOFF_TERM_PASS;
  const newTokenBody = { ...tokenBody, Password };
  const concatedVals = Object
    .keys(newTokenBody)
    .sort()
    .reduce((acc, key) => `${acc}${newTokenBody[key]}`, '');
  return createHash('sha256').update(concatedVals).digest('hex');
};

export default createTinkoffToken;
