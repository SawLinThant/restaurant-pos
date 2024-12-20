import React from "react";
import { MobileSidebar } from "../common/mobile-sidebar";


const MobileNav:React.FC = () => {
    return(
        <nav className="w-full min-h-20 border-b shadow-lg lg:hidden p-3">
            <div className="w-full h-full flex flex-row justify-between">
                <div></div>
                <div className=""><MobileSidebar/></div>
            </div>
        </nav>
    )
}
export default MobileNav