import { TfiMenuAlt } from "react-icons/tfi";
import { CgMenuGridO } from "react-icons/cg";
import { PiGridFourFill } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";

interface Routeprops {
    id: number,
    label: string,
    path: string,
    icon: any
}

export const AdminRoutes:Routeprops[] = [
    {
        id: 1,
        label:'Overview',
        path: 'overview',
        icon: <CgMenuGridO size={20}/>
    },
    {
        id: 2,
        label:'Order List',
        path: 'orderlist',
        icon: <TfiMenuAlt size={20}/>
    },
    {
        id: 3,
        label:'Menu',
        path: 'menu',
        icon: <PiGridFourFill size={20}/>
    },
    {
        id: 4,
        label:'Staff',
        path: 'staff',
        icon: <BsPeopleFill size={20}/>
    },
]