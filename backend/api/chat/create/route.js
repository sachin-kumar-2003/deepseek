import ConnectDB from "../../../config/db"
import Chat from "../../../models/Chat"


export async function POST(req) {
  try {
    const {userId}=getAuth(req);
    if(!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const chatData={
      userId,
      message:[],
      name:"New Chat",
    }

    await ConnectDB();
    await Chat.create(chatData);
    return new Response(JSON.stringify({message:"Chat Created"}), { status: 201 });
  } catch (error) {
    console.error("Error creating chat:", error);
    return new Response("Internal Server Error", { status: 500 });   
  }
}