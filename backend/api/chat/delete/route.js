import connectDB from "../../../config/db";
import Chat from "../../../models/Chat";



export async function DELETE(req) {
  try {
  const { id } = req.params;
  if (!id) {
    return new Response("Chat ID is required", { status: 400 });
  }
  const chat = await Chat.findById(id);
  if (!chat) {
    return new Response("Chat not found", { status: 404 });
  }
  await connectDB();
  await chat.remove();
  return new Response(JSON.stringify({ message: "Chat deleted successfully" }), { status: 200 });
}catch (error) {
  console.error("Error deleting chat:", error);
  return new Response("Internal Server Error", { status: 500 });
}
}