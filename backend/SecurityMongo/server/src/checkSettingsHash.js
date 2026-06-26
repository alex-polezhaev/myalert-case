import { api } from '../../api/index.js';

export const checkSettingsHash = async (userID, settingsHash) => api('mongo')
  .put('inputs/find_by_query', { user_id: userID, 'uniq_hashes.settings_hash': settingsHash })
  .then(() => true)
  .catch((error) => {
    if (error.response && error.response.status === 404) return false;
    return true;
  });
