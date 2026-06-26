import { api } from '../../api/index.js';

export const getActiveInputs = async () => {
  const active_users = await api('mongo')
    .put('users/find_by_query', {})
    .then((res) => res.data);

  const active_inputs = await Promise.all(
    active_users.map((user) =>
      api('mongo')
        .put('inputs/find_by_query', { user_id: user._id })
        .then((res) => res.data)
        .catch(() => [])),
  ).then((arr) => arr.flat(10));

  return active_inputs;
};
