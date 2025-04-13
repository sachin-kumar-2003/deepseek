import Chat from "../../../../models/Chat";
import ConnectDB from "../../../../config/db";


export async function POST(req) {
  try {
    const { chatId, newName } = await req.json();
    if (!chatId || !newName) {
      return new Response("Chat ID and new name are required", { status: 400 });
    }
    await ConnectDB();
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return new Response("Chat not found", { status: 404 });
    }
    chat.name = newName;
    await chat.save();
    return new Response(JSON.stringify({ message: "Chat renamed successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error renaming chat:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}