import { useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { IoLogOut } from "react-icons/io5";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Profile = () => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("tpken");
    navigate("/");
  };
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="h-[46px] w-[46px] flex items-center justify-center rounded-full border border-gray-400 hover:cursor-pointer">
          <RxPerson size={25} color="black" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="min-w-28 mr-4">
        <div className="w-full py-4 px-0 flex flex-col gap-4">
          <div className="w-full flex flex-col font-normal gap-3 px-3 py-6 border border-gray-300 rounded-md">
            <div className="w-full min-h-4 flex flex-row gap-3 items-center justify-center">
              <div>Saw Lin Thant</div>
            </div>
            <div className="w-full min-h-4 flex flex-row gap-3 items-center justify-center">
              <div>09973854868</div>
            </div>
            <div className="w-full min-h-4 flex flex-row gap-3 items-center justify-center">
              <div>linthantsaw670@gmail.com</div>
            </div>
          </div>

          <div className="w-full border-t pt-4">
            <div onClick={Logout} className="w-full min-h-4 flex flex-row gap-3 items-center justify-center hover:cursor-pointer">
              <div>
                <IoLogOut size={20} />
              </div>
              <div>Logout</div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
export default Profile;
