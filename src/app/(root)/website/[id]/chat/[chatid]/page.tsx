import CreateChatBtn from '@/components/website/chat/create-chat-input'
import SendMessageBtn from '@/components/website/chat/send-message-btn';
import { Id } from '../../../../../../../convex/_generated/dataModel';

const page = async({params}:{params:Promise<{chatid:string}>}) => {
    const {chatid}=await params;
  return (
    <div>
      <SendMessageBtn id={chatid as Id<"chat">}/>
    </div>
  )
}

export default page
