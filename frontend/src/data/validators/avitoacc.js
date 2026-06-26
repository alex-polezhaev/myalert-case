// const validate = async (data) => {
//     const basicSchema = yup.string().trim();
//     const idSchema = basicSchema
//       .required('clientId is required')
//       .length(20, 'clientId must be 20 characters');
//     const secretSchema = basicSchema
//       .required('clientSecret is required')
//       .length(40, 'clientSecret must be 40 characters');
//     const schema = yup.object().shape({
//       clientId: idSchema,
//       clientSecret: secretSchema,
//     });

//     return schema
//       .validate(data, {
//         abortEarly: false,
//       })
//       .then(() => ({
//         isValidationSuccessful: true,
//         messages: ['Data accepted'],
//       }))
//       .catch((e) => ({
//         isValidationSuccessful: false,
//         messages: e.errors,
//       }));
//   };
