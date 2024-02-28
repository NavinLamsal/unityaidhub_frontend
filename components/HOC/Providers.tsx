'use client'
import { ReactNode, useState } from "react";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import { SessionProvider } from "next-auth/react";


export default function Provider({children}:{children:ReactNode}){
 const [queryClient] = useState(()=>new QueryClient())
 return(
    <SessionProvider>
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}/>
        {children}
    </QueryClientProvider>
    </SessionProvider>
 )
}