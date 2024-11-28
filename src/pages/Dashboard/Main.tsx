import Sidebar from "@/components/Dashboard/Sidebar";


const MainScreen = () => {
    return(
        <div className="w-screen h-screen overflow-hidden p-4 flex flex-row gap-4 items-center">
            <Sidebar/>
            <div className="w-full h-[97vh]">
                Main
            </div>
        </div>
    )
}
export default MainScreen;