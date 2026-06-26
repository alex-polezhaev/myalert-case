import { api } from '../../api/index.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const getUserController = async (req, res) => {
  const { user_id: _id } = req.headers;

  try {
    const result = await api('mongo')
      .put('users/find_by_query', { _id })
      .then(({ data }) => data[0])
      .catch((error) => (error.response.status === 404 ? {} : {}));

    res.status(200).send(result);
  } catch (error) {
    handleServerError(res, error);
  }
};
