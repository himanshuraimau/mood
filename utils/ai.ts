import { ChatOpenAI } from "@langchain/openai";
import * as z from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { loadQARefineChain } from "langchain/chains";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";

// Define the parser with a Zod schema
const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z.string().describe('The mood of the person who wrote the journal entry.'),
        summary: z.string().describe('A quick summary of the journal entry.'),
        subject: z.string().describe('The subject of the journal entry.'),
        negative: z.boolean().describe('Does the journal entry contain negative emotions?'),
        color: z.string().describe(
            'A hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
        ),
    })
);

// Function to generate the prompt input
const getPrompt = async (content: string): Promise<string> => {
    const format_instructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
        template: `
            Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! 
            {format_instructions}
            {entry}`,
        inputVariables: ['entry'],
        partialVariables: { format_instructions },
    });
    
    const input = await prompt.format({ entry: content });
    console.log(input);
    return input;
};

// Function to analyze the journal entry
export const analyze = async (content: string) => {   
    const input = await getPrompt(content);
    const model = new ChatOpenAI({
        temperature: 0,
        modelName: 'gpt-3.5-turbo',
        apiKey: process.env.OPENAI_API_KEY
    });

    const result = await model.generate([[input]]);

    // Extract and parse the generated text
    const generatedText = result.generations.flat(2).map((item: any) => item.text).join('\n');
    console.log("Generated Text:", generatedText);

    try {
        // Parse the generated text using the parser
        const parsedResult = parser.parse(generatedText);
        return parsedResult;
    } catch (e) {
        console.error("Error parsing the generated text:", e);
        throw e; 
    }
};


export const qa = async (
    question: string, 
    entries: Array<{ content: string, id: string, createdAt: Date }>
): Promise<any> => {
    const docs = entries.map((entry) => ({
        pageContent: entry.content,
        metadata: {
            id: entry.id,
            createdAt: entry.createdAt,
        },
    }));

    const model = new ChatOpenAI({
        temperature: 0,
        modelName: 'gpt-3.5-turbo',
        apiKey: process.env.OPENAI_API_KEY,
    });

    const chain = loadQARefineChain(model);
    const embeddings = new OpenAIEmbeddings();
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
    const relevantDocs = await store.similaritySearch(question);

    const res = await chain.invoke({
        input_documents: relevantDocs,
        question,
    });

    return res;
};
