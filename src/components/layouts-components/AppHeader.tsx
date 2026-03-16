"use client"

import { useRouter } from "nextjs-toploader/app"

const AppHeader = () => {
    const router = useRouter()
  return (
    <header className="flex justify-between items-center gap-3 sm:px-5 md:px-6 lg:px-8 px-3 py-4">
        <div onClick={()=>router.push("/")} className="flex justify-start gap-2 cursor-pointer items-center">
            <img className="w-10" src="/vdl_tube_logo_transparent.png" alt="logo" />
            <h1 className="text-2xl font-semibold text-(--text-primary)">
                <span>VDL</span>{" "}
                <span className="text-[#ff8800]">Tube</span>
            </h1>
        </div>
    </header>
  )
}

export default AppHeader