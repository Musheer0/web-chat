import {create} from 'zustand'
interface istore {
    site_title:string,
    setSiteTitle:(data:string)=>void
}



export const useSiteTitlte = create<istore>((set)=>({
    site_title:"Web Chat",
    setSiteTitle:(data)=>{
        set({site_title:data})
    }
}))