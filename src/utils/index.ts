export const generateRoomCode = () => {
  const code = Math.floor(1000 + Math.random() * 9000);
  return code;
};

export const parseQuestions = (questions: any[]) => {
  return questions.map((question) => {
    const { content, ...rest } = question;
    return {
      ...rest,
      questions: JSON.parse(content),
    };
  });
};
