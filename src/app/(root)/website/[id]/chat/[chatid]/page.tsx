import CreateChatBtn from '@/components/website/chat/create-chat-input'
import SendMessageInput from '@/components/website/chat/send-message-input';
import { Id } from '../../../../../../../convex/_generated/dataModel';
import ChatMessages from '@/components/website/chat/chat-messages';

const page = async({params}:{params:Promise<{chatid:string}>}) => {
    const {chatid}=await params;
  return (
    <div className='flex relative flex-col overflow-y-auto p-2  w-full h-full'>
      <ChatMessages id={chatid as Id<"chat">}/>
      <SendMessageInput id={chatid as Id<"chat">}/>
    </div>
  )
}

export default page
