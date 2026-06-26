print('Start ####################################');

// Application DB user credentials are read from environment variables passed
// to the mongo container (see .env.example: MONGO_USER / MONGO_PASS).
const MONGO_USER = _getEnv('MONGO_USER');
const MONGO_PASS = _getEnv('MONGO_PASS');

// Configure db - Base
db = db.getSiblingDB('base');
db.createUser({
  user: MONGO_USER,
  pwd: MONGO_PASS,
  roles: [{ role: 'readWrite', db: 'base' }],
});
db.createCollection('users');
db.createCollection('inputs');
db.createCollection('outputs');
db.createCollection('accounts');

/** USER (neutral demo seed) */
db.users.insertOne({
  _id: ObjectId('000000000000000000000001'),
  telegram_code: '000000',
  trial_used: false,
  telegram_id: '100000001',
  expires_at: '2024-04-19T09:23:31.525Z',
  is_renewal_payment_in_progress: false,
  createdAt: '2024-04-16T09:23:40.210Z',
  updatedAt: '2024-04-16T09:23:40.210Z',
});

/** ACCOUNTS */
// Shared account: Avito robot auto-reply input
db.accounts.insertOne({
  _id: ObjectId('000000000000000000000002'),
  service: 'avito-mailing',
  shared: true,
  could_be_input: true,
  could_be_output: false,
  title: 'Avito - Robot auto-reply',
  data: {},
});

// Demo Telegram output account
db.accounts.insertOne({
  _id: ObjectId('000000000000000000000003'),
  service: 'telegram',
  shared: false,
  could_be_input: false,
  could_be_output: true,
  title: 'Telegram - demo_user',
  user_id: '000000000000000000000001',
  data: {
    id: 100000001,
    is_bot: false,
    first_name: 'Demo',
    last_name: 'User',
    username: 'demo_user',
    language_code: 'en',
    chat_id: 100000001,
  },
});

// Configure db - Avito
db = db.getSiblingDB('avito');
db.createUser({
  user: MONGO_USER,
  pwd: MONGO_PASS,
  roles: [{ role: 'readWrite', db: 'avito' }],
});
db.createCollection('messenger.webhooks');

// Configure db - Tasks
db = db.getSiblingDB('tasks');
db.createUser({
  user: MONGO_USER,
  pwd: MONGO_PASS,
  roles: [{ role: 'readWrite', db: 'tasks' }],
});
db.createCollection('common');
db.common.insertOne({ test: 'test' });

// Configure db - Payment
db = db.getSiblingDB('payment');
db.createUser({
  user: MONGO_USER,
  pwd: MONGO_PASS,
  roles: [{ role: 'readWrite', db: 'payment' }],
});
db.createCollection('orders');
db.common.insertOne({ test: 'test' });

print('END #########################################');
