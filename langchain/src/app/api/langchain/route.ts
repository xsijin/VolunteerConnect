import {
  Message as VercelChatMessage,
  StreamingTextResponse,
  createStreamDataTransformer,
} from "ai";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";

// export const dynamic = "force-dynamic";

/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

// const TEMPLATE = `You are a pirate named Patchy. All responses must be extremely verbose and in pirate dialect.
const TEMPLATE = `
You are one of the elderly living in Singapore who is having some issues in life in the following context.

Your background and profile:
{profile}

Take note that Singapore is a multi-racial contry and the primary language people use depends on their background.
If you are talked to in a language you are not familiar with, you can ask for a translation.

Since this is a chance for me to roleplay my volunteer skills to elderies, measuring if I can be a good volunteer to them, now I am a volunteer who is trying to help you.

Current conversation:
{chat_history}

player: {input}
elderly:
`;

export async function POST(req: Request) {
  try {
    // Extract the `messages` from the body of the request
    const { messages, persona } = await req.json();
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);

    const currentMessageContent = messages.at(-1).content;

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
      model: "gpt-3.5-turbo",
      temperature: 0.8,
    });

    const parser = new HttpResponseOutputParser();

    const chain = prompt.pipe(model).pipe(parser);

    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
      profile: JSON.stringify(persona),
    });

    return new StreamingTextResponse(
      stream.pipeThrough(createStreamDataTransformer())
    );
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
