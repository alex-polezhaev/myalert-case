import { api } from '../../api/index.js';

export const checkMainHash = async (userID, mainHash) => api('mongo')
  .put('inputs/find_by_query', { user_id: userID, 'uniq_hashes.main_hash': mainHash })
  .then(() => true)
  .catch((error) => {
    if (error.response && error.response.status === 404) return false;
    return true;
  });
