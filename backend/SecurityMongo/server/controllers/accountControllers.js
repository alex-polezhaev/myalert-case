import { api } from '../../api/index.js';
import { getPossibleOutputs } from '../src/combinations.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const deleteAccountController = async (req, res) => {
  const { accountId } = req.body;
  try {
    api('avito').delete('/avito/disconnect_account', { accountId });
    api('mongo').post('accounts/delete_account', { _id: accountId });
    api('mongo').post('inputs/delete_inputs', { account_id: accountId });
    api('mongo').post('outputs/delete_outputs', {
      account_id: accountId,
    });

    res.status(200).end();
  } catch (error) {
    handleServerError(res, error);
  }
};

// Returns the possible input/output account combinations for the frontend
export const getAccountsForInputOutputController = async (req, res) => {
  const { user_id } = req.headers;

  try {
    // Get avalible accounts to input
    const input_accs = await api('mongo')
      .put('accounts/find_by_query', {
        user_id,
        could_be_input: true,
      })
      .then(({ data }) => data)
      .catch((e) => (e.response.status === 404 ? [] : []));

    // Get avalible shared accounts to input
    const shared_input_accs = await api('mongo')
      .put('accounts/find_by_query', {
        shared: true,
        could_be_input: true,
      })
      .then(({ data }) => data)
      .catch(() => []);

    const all_inputs = [...input_accs, ...shared_input_accs];

    if ([...input_accs, ...shared_input_accs].length === 0) {
      res.status(200).send([]);
      return;
    }

    // Get avalible accounts to output
    const promises = all_inputs.map(
      (input) =>
        new Promise((resolve) => {
          getPossibleOutputs(user_id, input.service).then((outputs) => {
            resolve({
              ...input,
              outputs,
            });
          });
        }),
    );

    res.status(200).send(await Promise.all(promises));
  } catch (error) {
    handleServerError(res, error);
  }
};

export const getAccountsController = async (req, res) => {
  const { user_id } = req.headers;

  try {
    const individual = await api('mongo')
      .put('accounts/find_by_query', { user_id })
      .then(({ data }) => data)
      .catch(() => []);

    const shared = await api('mongo')
      .put('accounts/find_by_query', { shared: true })
      .then(({ data }) => data)
      .catch(() => []);

    res.status(200).send([individual, shared].flat(10));
  } catch (error) {
    handleServerError(res, error);
  }
};
