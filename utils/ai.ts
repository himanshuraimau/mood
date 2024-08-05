import { ChatOpenAI } from "@langchain/openai";

export const analyze = async (text: string) => {   
    const model = new ChatOpenAI({
      temperature: 0,
      modelName: 'gpt-3.5-turbo',
      apiKey: process.env.OPENAI_API_KEY
    });
    // Pass the text as an array of message objects
  const result = await model.generate([[ text ]]);

  // Extract the generated text from the nested array
  const generatedText = result.generations.flat(2).map((item: any) => item.text).join('\n');

  console.log(generatedText);
  return generatedText;
  };