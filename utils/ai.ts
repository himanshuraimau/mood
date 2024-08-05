import { ChatOpenAI } from "@langchain/openai";
import * as z from "zod";
import { StructuredOutputParser} from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z.string().describe('The mood of the person who wrote the journal entry.'),
        summary: z.string().describe('A quick summary of the journal entry.'),
        negative:z.boolean().describe('is the journal entry is negative(does it contain negative emotions.?)?') ,
        color: z
        .string()
        .describe(
          'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
        ),

    })
);

const getPrompt = async (content) =>{
    const format_instructions = parser.getFormatInstructions()

    const prompt = new PromptTemplate({
      template:
        'Analyze the following journal entry. Follow the intructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
      inputVariables: ['entry'],
      partialVariables: { format_instructions },
    })
    const input = await prompt.format({
        entry: content,
      })
       
      console.log(input)
      return input
}

export const analyze = async (content: string) => {   
    const input  = await getPrompt(content)
    const model = new ChatOpenAI({
      temperature: 0,
      modelName: 'gpt-3.5-turbo',
      apiKey: process.env.OPENAI_API_KEY
    });
    // Pass the text as an array of message objects
  const result = await model.generate([[ input ]]);

  // Extract the generated text from the nested array
  const generatedText = result.generations.flat(2).map((item: any) => item.text).join('\n');

  console.log(generatedText);
  return generatedText;
  };