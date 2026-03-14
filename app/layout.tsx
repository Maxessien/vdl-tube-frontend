import "@/src/index.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/assets/css-reusable/variables.css";
import AppProviders from "./providers";
import TopLoader from "@/src/components/reusable-components/TopLoader";

export const metadata: Metadata = {
  title: "Tube VDL",
};

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <TopLoader />
        <AppProviders>
          {children}
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </AppProviders>
      </body>
    </html>
  );
};

export default AppLayout;
