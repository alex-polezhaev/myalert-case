import React from 'react';
import { AvitoConnection } from '../components/connections/AvitoConnection.jsx';
import { Badge } from '../components/Badge.jsx';
import assets from '../assets/index.js';
import { NotifyLostMessage } from '../components/strategies/NotifyLostMessage.jsx';
import { NotifyNegativeMood } from '../components/strategies/NotifyNegativeMood.jsx';
import { ReplyFirstMessage } from '../components/strategies/ReplyFirstMessage.jsx';
import { ReplyLostMessage } from '../components/strategies/ReplyLostMessage.jsx';
import { TelegramConnection } from '../components/connections/TelegramConnection.jsx';

export const services = {
  avito: {
    key: 'avito',
    connection: AvitoConnection,
    createBadge: (key) => (
      <Badge key={key} leftIcon={assets.avitoLogo} text='Avito' />
    ),
    icon: assets.avitoLogo,
    titles: {
      rus_url: 'Avito - avito.ru',
    },
    strategies: {
      notify_lost_message: {
        title: 'Missed message notification',
        createSettingsComponent: (settingsProps) => (
          <NotifyLostMessage props={settingsProps} />
        ),
        validate: () => ({
          isValidationSuccessful: true,
        }),
        rules: {
          use_business_hours: true,
          business_hours: ['', ''],
          notify_timeout: '',
        },
      },
      notify_negative_mood: {
        title: 'Negative message notification',
        createSettingsComponent: (settingsProps) => (
          <NotifyNegativeMood props={settingsProps} />
        ),
        validate: () => ({
          isValidationSuccessful: true,
        }),
        rules: {
          use_business_hours: true,
          business_hours: ['', ''],
        },
      },
    },
  },
  'avito-mailing': {
    key: 'avito-mailing',
    connection: null,
    createBadge: (key) => (
      <Badge key={key} leftIcon={assets.settingsIcon} text='Robot' />
    ),
    icon: assets.avitoLogo,
    titles: {
      rus_url: 'Avito - Auto-reply robot ',
    },
    strategies: {
      reply_first_message: {
        title: 'Reply to first message',
        createSettingsComponent: (settingsProps) => (
          <ReplyFirstMessage props={settingsProps} />
        ),
        validate: () => ({
          isValidationSuccessful: true,
        }),
        rules: {
          use_business_hours: true,
          business_hours: ['', ''],
          in_hours_message: '',
          out_of_hours_message: '',
        },
      },
      reply_lost_message: {
        title: 'Reply to missed message',
        createSettingsComponent: (settingsProps) => (
          <ReplyLostMessage props={settingsProps} />
        ),
        validate: () => ({
          isValidationSuccessful: true,
        }),
        rules: {
          use_business_hours: true,
          business_hours: ['', ''],
          in_hours_message: '',
          out_of_hours_message: '',
          notify_timeout: '',
        },
      },
    },
  },
  telegram: {
    key: 'telegram',
    connection: TelegramConnection,
    settings: '',
    createBadge: (key) => (
      <Badge key={key} leftIcon={assets.blueTelegramIcon} text='Telegram' />
    ),
    icon: assets.blueTelegramIcon,
    titles: {
      rus_url: 'Telegram - t.me',
    },
  },
};
