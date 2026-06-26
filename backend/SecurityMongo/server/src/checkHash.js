import { checkMainHash } from './checkMainHash.js';
import { checkSettingsHash } from './checkSettingsHash.js';
import createHash from './createHash.js';

export const checkHash = async (user_id, accountId, outputs, settings) => {
  const currStrategyKey = Object.keys(settings)[0];
  const mainHash = createHash({
    accountId,
    outputs,
    strategy: currStrategyKey,
  });
  const settingsHash = createHash(settings);

  return {
    mainHash,
    settingsHash,
    mainHashExist: await checkMainHash(user_id, mainHash),
    settingsHashExist: await checkSettingsHash(user_id, settingsHash),
  };
};
