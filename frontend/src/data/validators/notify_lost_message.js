import * as yup from 'yup';

const notifyLostMessageValidator = async (data) => {
  const { settings } = data.notify_lost_message;
  const schema = yup.object().shape({
    use_business_hours: yup.bool().oneOf([true, false]),
    business_hours: yup.array().of(yup.string().matches(/\d\d:\d\d/gm)),
    notify_timeout: yup.number().required(),
  });

  return schema
    .validate(settings, {
      abortEarly: false,
    })
    .then(() => ({
      isValidationSuccessful: true,
      messages: ['Data accepted'],
    }))
    .catch((e) => ({
      isValidationSuccessful: false,
      messages: e.errors,
    }));
};

export default notifyLostMessageValidator;
