import "../src/assets/css-reusable/variables.css"
import AppProviders from "./providers"


const AppLayout = ({children})=>{
  return (
    <html lang="en">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}

export default AppLayout