import { api } from '../../api/index.js';

const combinations = {
  avito: ['telegram'],
  'avito-mailing': ['avito'],
};

export const getPossibleOutputs = async (user_id, service) => {
  if (combinations[service]) {
    const array = combinations[service];

    const result = await Promise.all(
      array.map((service_name) =>
        api('mongo')
          .put('accounts/find_by_query', {
            could_be_output: true,
            service: service_name,
            user_id,
          })
          .then(({ data }) => data)
          .catch(() => [])),
    );

    const default_result = await Promise.all(
      array.map((service_name) =>
        api('mongo')
          .put('accounts/find_by_query', {
            could_be_output: true,
            service: service_name,
            shared: true,
          })
          .then(({ data }) => data)
          .catch(() => [])),
    );

    return [result, default_result].flat(10);
  }
  if (!combinations[service]) {
    return [];
  }
};
