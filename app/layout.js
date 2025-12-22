import "@/src/index.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../src/assets/css-reusable/variables.css"
import AppProviders from "./providers"


const AppLayout = ({children})=>{
  return (
    <html lang="en">
      <body>
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
  )
}

export default AppLayout