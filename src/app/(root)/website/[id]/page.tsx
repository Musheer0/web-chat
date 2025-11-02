import CreateChatBtn from '@/components/website/chat/create-chat-input'
import { useSiteTitlte } from '@/hooks/use-site-header';
import { useEffect } from 'react';

const page = async({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params;
    const {setSiteTitle} = useSiteTitlte()
    useEffect(()=>{
      setSiteTitle("Indexed Websites")
    },[])
  return (
    <div>
      <CreateChatBtn id={id}
      
      />
    </div>
  )
}

export default page
