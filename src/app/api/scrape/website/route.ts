import { NextRequest, NextResponse } from "next/server";
import {Firecrawl} from '@mendable/firecrawl-js'
export const GET = async(req:NextRequest)=>{
    // const auth_key = req.headers.get('X-CONVEX-KEY')
    // if(auth_key!==process.env.CONVEX_INTERNAL_KEY) return NextResponse.json({error:"un authorized"},{status:401});
    const website = req.nextUrl.searchParams.get("website");
    if(!website)return NextResponse.json({error:"data not found"},{status:400})
    try {
        const f = new Firecrawl({apiKey:process.env.FIRECRAWL_KEY!});
        const {markdown,metadata,links} = await f.scrape(website,{formats:["markdown","links"]});
        if(!metadata || !markdown) return NextResponse.json({error:"data not found"},{status:400})
        return NextResponse.json({
            markdown,
            metadata:{
                title:metadata.title,
                description:metadata.description,
                favicon:metadata.favicon,
                banner:metadata.ogImage,
                language:metadata.language
            },
            links
        })

    } catch (error) {
        console.error(error);
        return NextResponse.json({error:"internal server error"},{status:500})
    }
}