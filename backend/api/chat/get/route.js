import connectDB from "../../../config/db";
import Chat from "../../../models/Chat";


export async function GET(req) {
  try {
    const { id } = req.params;
    if (!id) {
      return new Response("Chat ID is required", { status: 400 });
    }
    await connectDB();
    const data = await Chat.find(id);
    return new Response(JSON.stringify(data), { status: 200 }); 
    
  } catch (error) {
    console.error("Error fetching chats:", error);
    return new Response("Internal Server Error", { status: 500 });
    
  }
}