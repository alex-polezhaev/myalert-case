import { api } from '../../api/index.js';

export const getAccountById = async (accountID) => {
  const accountsArr = api('mongo')
    .put(
      '/accounts/find_by_query',
      {
        _id: accountID,
      },
    );
  if (accountsArr.length === 0) return null;
  return accountsArr[0];
};
