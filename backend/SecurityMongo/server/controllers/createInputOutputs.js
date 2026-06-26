import { api } from '../../api/index.js';

export const createInputOutputs = async (data) => {
  const {
    accountId,
    active,
    comment,
    user_id,
    settings,
    mainHash,
    settingsHash,
    output_accs,
  } = data;

  const input_account = await api('mongo')
    .put('accounts/find_by_query', {
      _id: accountId,
    })
    .then((resp) => resp.data[0]);

  const input_payload = {
    active,
    comment,
    title: input_account.title,
    user_id,
    input_service: input_account.service,
    account_id: input_account._id,
    service_data: input_account.data,
    settings,
    uniq_hashes: {
      main_hash: mainHash,
      settings_hash: settingsHash,
    },
  };

  // Temporary
  input_payload.active = true;

  // Create input and outputs
  const input = await api('mongo')
    .post('inputs/new_input', input_payload)
    .then((resp) => resp.data);

  await Promise.all(
    output_accs.map((acc) =>
      api('mongo').post('output/new_output', {
        account_id: acc._id,
        user_id,
        input_id: input._id,
        output_service: acc.service,
        service_data: acc.data,
      })),
  );
};
