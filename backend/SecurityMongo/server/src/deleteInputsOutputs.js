import { api } from '../../api/index.js';

export const deleteInputsOutputs = async (inputId) => {
  api('mongo').post('inputs/delete_inputs', { _id: inputId });
  api('mongo').post('outputs/delete_outputs', { input_id: inputId });
};
