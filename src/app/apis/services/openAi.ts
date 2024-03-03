import OpenAI from 'openai';

export type MyInterview = {
  questionId: string;
  questionContent: string;
  answerContent: string;
};
export const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});
export interface OpenAiContent {
  userName: string;
  categoryName: string;
  questions: MyInterview[];
}

export const postOpenAi = async (arg: OpenAiContent) => {
  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {
          role: 'system',
          content: 'Answer in Korean, When specifying a name, refer to the userName',
        },
        {
          role: 'user',
          content: JSON.stringify(arg),
        },
      ],
      functions,
    });
    const functionArguments = res.choices[0].message.function_call?.arguments;

    if (functionArguments !== undefined) {
      return JSON.parse(functionArguments);
    }
  } catch (error) {}
};

const functions = [
  {
    name: 'answers',
    description: '질문에 대한 답변 객체',
    parameters: {
      type: 'object',
      properties: {
        questions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              questionId: {
                type: 'string',
                description: 'questionId',
              },
              // questionContent: {
              //   type: 'string',
              //   description: 'questionContent',
              // },
              // answerContent: { type: 'string', description: 'answerContent' },
              commentary: {
                type: 'string',
                description:
                  "In the developer interview, write the correct answer to the question 'questContent' in the field 'categoryName' in detail, 400 or more characters, If the answer is blank, please tell me how to write the answer",
              },
              evaluation: {
                type: 'string',
                description:
                  "Look at 'answerContent' in response to 'questionContent' at the interview and write down what needs to be improved and what needs to be added, 400 or more characters, If the answer is blank, please tell me how to write the answer",
              },
            },
            required: [
              'questionId',
              // 'questionContent',
              // 'answerContent',
              'commentary',
              'evaluation',
            ],
          },
        },
        gptOpinion: {
          type: 'string',
          description:
            'The subject of the developer interview is categoryName, and please look at the answers to all the questions and organize your feelings about the interview in detail, so please write your expertise on what was good, what should be fixed, and what should be added. More than 800 characters.',
        },
      },
      required: ['questions', 'gptOpinion'],
    },
  },
];
