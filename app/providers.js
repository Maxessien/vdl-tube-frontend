"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const AppProviders = ({children})=>{
    return (
        <QueryClientProvider queryClient={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default AppProviders