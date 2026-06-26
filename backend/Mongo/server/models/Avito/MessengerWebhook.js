import mongoose from 'mongoose';
import { dbAvito } from '../../mongoConnection.js';

const { Schema } = mongoose;

const MessengerWebhookSchema = new Schema(
  {
    user_id: {
      type: String,
      require: true,
    },
    chat_id: {
      type: String,
      require: true,
    },
    chat_url: {
      type: String,
      require: true,
    },
    seller: {
      avito_id: {
        type: Number,
        require: true,
      },
      name: {
        type: String,
        require: true,
      },
    },
    client: {
      avito_id: {
        type: Number,
        require: true,
      },
      name: {
        type: String,
        require: true,
      },
    },
    messages: [
      {
        msg_id: {
          type: String,
          require: true,
        },
        author_id: {
          type: Number,
          require: true,
        },
        created: {
          type: Number,
          require: true,
        },
        content: {
          type: Object,
          require: true,
        },
        type: {
          type: String,
          require: true,
        },
        direction: {
          type: String,
          require: true,
        },
        mood: {
          type: String,
          require: true,
          default: null,
        },
        marks: {
          notify_lost_message: {
            type: Boolean,
            require: true,
            default: false,
          },
          notify_negative_mood: {
            type: Boolean,
            require: true,
            default: false,
          },
        },
      },
    ],
    marks: {
      reply_first_message: {
        type: Boolean,
        default: false,
      },
      reply_lost_message: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
  { collection: 'messenger.webhooks' },
);

const MessengerWebhook = dbAvito.model(
  'Messenger.Webhook',
  MessengerWebhookSchema,
);

export default MessengerWebhook;
