import {Webhook} from 'svix'
import connectDB from '../../config/db'
import User from '../../models/User'

export async function POST(req) {
  const wh=new Webhook(process.env.SIGNING_SECRET);
  const headerPayload=await headers()
  const svixHeaders={
    'svix-id':headerPayload.get('svix-id'),
    'svix-timestamp':headerPayload.get('svix-timestamp'),
    'svix-signature':headerPayload.get('svix-signature'),
  };

  const payload=await req.json();
  const body=JSON.stringify(payload);
  const {data, type}=wh.verify(body,svixHeaders);

  const userData={
    name:`${data.first_name} ${data.last_name}`,
    email:data.email_addresses[0],
    image:data.image_url,
  }

  await connectDB();
  switch(type){
    case 'user.created':
      try {
        const user=await User.create(userData);
        console.log('User Created:',user);
      } catch (error) {
        console.error('Error creating user:', error);
      }
      break;
    case 'user.updated':
      try {
        const user=await User.findOne({where:{email:userData.email}});
        if(user){
          user.name=userData.name;
          user.image=userData.image;
          await user.save();
          console.log('User Updated:',user);
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
      break;
    case 'user.deleted':
      try {
        const user=await User.findOne({where:{email:userData.email}});
        if(user){
          await user.remove();
          console.log('User Deleted:',user);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
      break;
    default:
      console.log('Unhandled event type:', type);
      break;
  }

  return new Response(JSON.stringify({success:true}),{status:200});
}
