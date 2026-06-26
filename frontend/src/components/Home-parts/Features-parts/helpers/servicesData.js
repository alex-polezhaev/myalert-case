// When adding new services or strategies, just follow the same pattern
// Do not forget to add a TabPanel for the new service
// Strategy names must be unique within a single service

export default {
  avito: {
    notify: {
      title: 'Notifications',
      strategies: {
        notifyLost: {
          title: 'Missed message notification',
          description: {
            descTitle: 'Missed message notification',
            descMain:
              'We will send you a notification if you forget to reply to a message. Useful when you want to improve your response speed on Avito. The notification includes the customer name, account name, message text, and a link to the chat.',
            descSettings:
              'In this rule you can configure:\n— After how long a message is considered missed (in minutes).\n— Business hours from - to (we notify you only during business hours so as not to distract you).',
          },
        },
        notifyNegative: {
          title: 'Negative message notification',
          description: {
            descTitle: 'Negative message notification',
            descMain:
              'We will send you a notification if a message with negative content arrives in the chat. It is useful to know exactly what bothers your customers. The notification includes the customer name, account name, message text, and a link to the chat.',
            descSettings:
              'In this rule you can configure:\n— Business hours from - to (we notify you only during business hours so as not to distract you).',
          },
        },
      },
      styles: {
        titleColor: '',
        dotColor: '',
      },
    },
    reply: {
      title: 'Auto-reply',
      strategies: {
        replyFirst: {
          title: 'Auto-reply to a customer on a missed message',
          description: {
            descTitle: 'Auto-reply to a customer on a missed message',
            descMain:
              'We will automatically reply to the customer in the chat if you take too long to respond. Useful for retaining the customer while you are busy and cannot reply. Improves your Avito response-speed stats.',
            descSettings: 'In this rule you can configure:\n— Business hours from - to (we send the customer different messages depending on your schedule).\n— The message text outside business hours.\n— The message text during business hours.\n— After how long a message is considered missed (in minutes).',
          },
        },
        replyLost: {
          title: 'Greeting auto-reply to a new customer',
          description: {
            descTitle: 'Greeting auto-reply to a new customer',
            descMain:
              'We will automatically reply to the customer in the chat on their first message. Useful for retaining the customer in the first 10 minutes before you have had a chance to reply. Improves your Avito response-speed stats.',
            descSettings:
              'In this rule you can configure:\n— Business hours from - to (we send the customer different messages depending on your schedule).\n— The message text outside business hours.\n— The message text during business hours.',
          },
        },
      },
      styles: {
        titleColor: '#26C6DA',
        dotColor: 'blue',
      },
    },
  },
  sklad: {},
  wb: {},
};
