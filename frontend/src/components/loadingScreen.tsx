//loading screen

export default function LoadingScreen() {


    return(
        <div className="flex justify-center items-center h-full w-full absolute bg-[#00000089] left-0 top-0">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#ff2184]"></div>
        </div>
    )
}