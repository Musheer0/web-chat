import CreateChatBtn from '@/components/website/chat/create-chat-btn'

const page = async({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params;
  return (
    <div>
      <CreateChatBtn id={id}
      
      />
    </div>
  )
}

export default page
