import axios from 'axios';

export const api = (service) => {
  const hosts = {
    mongo: process.env.MONGO_HOST,
    google: process.env.GOOGLE_HOST,
    yandex: process.env.YANDEX_HOST,
    avito: process.env.AVITO_HOST,
    auth: process.env.AUTH_HOST,
    xml: process.env.XML_HOST,
    email: process.env.EMAIL_HOST,
    tinkoff: process.env.TINKOFF_HOST,
    telegram: process.env.TELEGRAM_HOST,
  };

  return axios.create({
    baseURL: hosts[service],
  });
};
