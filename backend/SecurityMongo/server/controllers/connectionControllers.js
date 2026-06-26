import { api } from '../../api/index.js';
import validateSettings from '../src/validators/index.js';
import { deleteInputsOutputs } from '../src/deleteInputsOutputs.js';
import { createInputOutputs } from './createInputOutputs.js';
import { checkHash } from '../src/checkHash.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const deleteConnectionController = async (req, res) => {
  const { inputId } = req.body;
  try {
    await api('mongo').post('inputs/delete_inputs', { _id: inputId });
    await api('mongo').post('outputs/delete_outputs', { input_id: inputId });

    res.status(200).end();
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @param {*} active Boolean - New status of connection
 * @param {*} inputId Connection inputId, if connection exist
 * @param {*} accountId Input account id
 * @param {*} settings Actual input settings
 * @param {*} outputs Array of mongo ids, outputs account ids
 * @param {*} del Boolean - If you want to delete connection, use true
 * @param {*} comment String - Connection frontend name
 */

// One controller to create/update/delete connection
// Controller recreate connection every time to eazy update

// if you want to create connection = use accountId, settings, outputs
// if you want to update connection = use active, inputId, accountId, settings, outputs
// if you want to delete connection = use inputId, del = true

// {
//   "active": true,
//   "comment": "Connection #2",
//   "inputId": "65d96e7543f7da70635a7ec2",
//   "accountId": "65d867ebbf534aeb8e336e31",
//   "settings": {
//       "note_user_lost_message": {
//           "active": false,
//           "use_bussines_hours": true,
//           "bussines_hours": [
//               "11:00",
//               "18:00"
//           ],
//           "notify_timeout": 30000
//       }
//   },
//   "outputs": [
//       "65d867ebbf534aeb8e336e31"
//   ],
//   "del": true
// }

export const replaceConnectionController = async (req, res) => {
  const { user_id } = req.headers;
  const {
    active, inputId, accountId, settings, outputs, del, comment,
  } = req.body;

  try {
    // Settings validation
    const settingsErrors = validateSettings(settings);
    if (settingsErrors.length !== 0) {
      res.status(400).json({
        errors: settingsErrors,
        message: 'Invalid settings',
      });
      return;
    }

    // Security check outputs array
    const output_accs = await Promise.all(
      outputs.map((_id) =>
        api('mongo')
          .put('accounts/find_by_query', { _id })
          .then(({ data }) => data[0])),
    ).catch(() => null);

    if (!output_accs) {
      res.status(403).end();
      return null;
    }

    // Define action for controller
    let status = null;

    console.log(req.body);

    if (!inputId) status = 'create';
    if (inputId) status = 'update';
    if (inputId && del) status = 'delete';

    // Checking the uniqueness of the connector
    const hashes = await checkHash(user_id, accountId, outputs, settings);
    const {
      mainHash, settingsHash, mainHashExist, settingsHashExist,
    } = hashes;

    // Data for input and outputs
    const connector_data = {
      accountId,
      active,
      comment,
      user_id,
      settings,
      mainHash,
      settingsHash,
      output_accs,
    };

    if (status === 'create' && (!mainHashExist || (mainHashExist && !settingsHashExist))) {
      createInputOutputs(connector_data);
      res.status(201).end('Created');
      return;
    }

    if (
      status === 'update'
      && (!mainHashExist || (mainHashExist && !settingsHashExist))
    ) {
      await deleteInputsOutputs(inputId);
      createInputOutputs(connector_data);
      res.status(200).end('Replaced');
      return;
    }

    if (status === 'delete') {
      await deleteInputsOutputs(inputId);
      res.status(200).end('Deleted');
      return;
    }

    // if cant define action
    if (status !== 'create' || status !== 'update' || status !== 'delete') {
      throw new Error('Cant define action');
    }
    res.status(409).end('This input has already been created');
  } catch (error) {
    handleServerError(res, error);
  }
};

export const getConnectionsController = async (req, res) => {
  const { user_id } = req.headers;

  try {
    const inputs = await api('mongo')
      .put('inputs/find_by_query', { user_id })
      .then(({ data }) => data)
      .catch((error) => (error.response.status === 404 ? [] : []));

    const outputs = await api('mongo')
      .put('outputs/find_by_query', { user_id })
      .then(({ data }) => data)
      .catch((error) => (error.response.status === 404 ? [] : []));

    const result = [];

    if (inputs.length === 0) {
      res.status(200).send(result);
      return;
    }

    for (let i = 0; i < inputs.length; i += 1) {
      const input = inputs[i];

      const connection = { ...input };
      connection.outputs = [];

      outputs.forEach((output) => {
        if (output.input_id === input._id) {
          connection.outputs.push(output);
        }
      });
      result.push(connection);
    }

    res.status(200).send(result);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const switchActiveController = async (req, res) => {
  const { user_id } = req.headers;
  const { inputId, active } = req.body;

  try {
    const success = await api('mongo')
      .put('inputs/update_by_query', {
        query: { _id: inputId, user_id },
        update: { active },
      })
      .then(() => true)
      .catch(() => false);

    return success
      ? res.status(200).json({ success: true })
      : res.status(400).json({ success: false });
  } catch (error) {
    handleServerError(res, error);
  }
};
