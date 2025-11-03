import CreateChatBtn from '@/components/website/chat/create-chat-input'
import { Id } from '../../../../../convex/_generated/dataModel';

const page = async({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params;
 
  return (
    <div>
      <CreateChatBtn id={id as Id<"website_data">}
      
      />
    </div>
  )
}

export default page
