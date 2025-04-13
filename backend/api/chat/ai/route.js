export const maxDuration=60*1000
import OpenAI from "openai";
import connectDB from "../../../config/db";
import Chat from "../../../models/Chat";  
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  apiBaseUrl: process.env.OPENAI_API_BASE_URL,
});

export async function POST(req){
  try {
    const {userId}=getAuth(req);
    if(!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const {chatId,prompt} = await req.json();
    if(!chatId || !prompt) {
      return new Response("Chat ID and prompt are required", { status: 400 });
    }
    await ConnectDB();
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return new Response("Chat not found", { status: 404 });
    }
    const data=await Chat.find({userId,chatId});

    const userPrompt={
      role:"user",
      content:prompt,
      timestamp:Date.now(),
    };

    data.messages.push(userPrompt);
    await data.save();


    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{role:"user",content:prompt}],
      store:true,
    });

    const message=completion.choices[0].message;
    message.timestamp=Date.now();
    data.messages.push(message);
    await data.save();
    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}