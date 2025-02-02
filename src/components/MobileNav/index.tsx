import React from "react";
import { MobileSidebar } from "../common/mobile-sidebar";


const MobileNav:React.FC = () => {
    return(
        <nav className="w-full flex-shrink-0 h-[10dvh] border-b shadow-lg lg:hidden p-3">
            <div className="w-full h-full flex items-center flex-row justify-between">
                <div></div>
                <div className=""><MobileSidebar/></div>
            </div>
        </nav>
    )
}
export default MobileNav