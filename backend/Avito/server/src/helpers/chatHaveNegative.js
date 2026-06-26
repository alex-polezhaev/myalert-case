export const chatHaveNegative = (chat) => {
  const { messages } = chat;

  for (let i = 0; i < messages.length; i += 1) {
    if (messages[i].mood === 'negative' && !messages[i].marks.notify_negative_mood) {
      return true;
    }
  }
  return false;
};
