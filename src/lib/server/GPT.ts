import OpenAI from 'openai';

import type { APIPromise } from 'openai/core';
import type { ChatCompletion, ChatCompletionChunk } from 'openai/resources';
import type { Stream } from 'openai/streaming';

type InputsGPT = {
  inputSystem: string;
  inputUser: string;
};

type IsStreaming<T extends boolean> = T extends true ? Stream<ChatCompletionChunk> : ChatCompletion;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function queryGPT<T extends boolean>(
  { inputSystem, inputUser }: InputsGPT,
  stream: T,
): Promise<IsStreaming<T>> {
  return openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream,
    messages: [
      {
        role: 'system',
        content: inputSystem,
      },
      {
        role: 'user',
        content: inputUser,
      },
    ],
  }) as APIPromise<IsStreaming<T>>;
}

export const searchCountry = `I will give you a description of a country,
if not output 'null',
you will return a list of countries that match the description,
format everything in a list of JSON objects:
{
  "name": string,
  "capital": string,
  "population": number,
  "climate": string,
  "language": string,
  "currency": string,
},
translate everything to French,
return everything in a list of JSON objects
`;
