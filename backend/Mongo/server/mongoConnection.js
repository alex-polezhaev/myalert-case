import mongoose from 'mongoose'; /* eslint-disable-line import/no-unresolved */

const {
  MONGO_URL_BASE, MONGO_URL_AVITO, MONGO_URL_TASKS, MONGO_URL_PAYMENT,
} = process.env;

// Connect to the main (base) database
export const dbBase = mongoose.createConnection(MONGO_URL_BASE);

dbBase.on('error', console.error.bind(console, 'connection error:'));
dbBase.once('open', () => {
  console.log('Connected to dbBase');
});

// Connect to the Avito database
export const dbAvito = mongoose.createConnection(MONGO_URL_AVITO);

dbAvito.on('error', console.error.bind(console, 'connection error:'));
dbAvito.once('open', () => {
  console.log('Connected to dbAvito');
});

// Connect to the Tasks database
export const dbTasks = mongoose.createConnection(MONGO_URL_TASKS);

dbAvito.on('error', console.error.bind(console, 'connection error:'));
dbAvito.once('open', () => {
  console.log('Connected to dbTasks');
});

// Connect to the Payment database
export const dbPayment = mongoose.createConnection(MONGO_URL_PAYMENT);

dbPayment.on('error', console.error.bind(console, 'connection error:'));
dbPayment.once('open', () => {
  console.log('Connected to dbPayment');
});
