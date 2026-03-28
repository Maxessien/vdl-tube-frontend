"use client";

import store from "@/src/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";
import { Provider } from "react-redux"

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      {children}
    </Provider>
  </QueryClientProvider>;
};

export default AppProviders;
