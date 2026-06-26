import { DateTime } from 'luxon';

export const transformChatResponse = (response, avito_user_id) => {
  const { chats } = response;

  return chats.map((chat) => {
    const seller = chat.users.filter((user) => user.id === avito_user_id)[0];
    const client = chat.users.filter((user) => user.id !== avito_user_id)[0];

    const url = `https://www.avito.ru/profile/messenger/channel/${chat.id}`;

    const messageDeadline = DateTime.fromSeconds(chat.last_message.created, {
      zone: 'Europe/Moscow',
    }).plus({ day: 5 });
    const timeNow = DateTime.now().setZone('Europe/Moscow');

    if (chat.last_message.author_id === avito_user_id) {
      return null;
    }
    if (messageDeadline < timeNow) {
      return null;
    }

    return {
      client_name: client.name,
      seller_name: seller.name,
      message: chat?.last_message?.content?.text,
      url,
      seller_id: avito_user_id,
    };
  });
};
