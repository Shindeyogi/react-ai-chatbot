

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export class Assistant{
  #model
  constructor (model = "mistralai/mistral-7b-instruct:free"){
    this.#model = model

  }
  async chat(content, history){
    try {
      const result = await openai.chat.completions.create({
      model: this.#model,
      messages: [...history, {content, role: 'user'}],

      });
      return result.choices[0].message.content;
    } catch (error) {
throw this.#parseEroor(error);      
    }
  }
  async *chatStream(content, history) {
    try {
      const result = await openai.chat.completions.create({
      model: this.#model,
      messages: [...history, {content, role: 'user'}],
      stream: true, 
      });
      for await(const chunk of result){
        yield chunk.choices[0]?.delta?.content || ""
      }
    } catch (error) {
      throw this.#parseEroor(error);
    }
  }
  #parseEroor(error){
    return error
  }
}
