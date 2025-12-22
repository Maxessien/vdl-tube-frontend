"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

const AppProviders = ({children})=>{
    const [queryClient] = useState(() => new QueryClient())
    
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default AppProviders