import { useNavigate } from "react-router-dom";
import RightArrow from "../icons/rightArrow";

export interface TableCardProps {
  table: string;
  orderId: string;
  status: string;
  totalItems: number;
}

function OrderCard({ table, orderId, status, totalItems }: TableCardProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`/home/order/detail/${orderId}`)
      }
      className="flex w-full items-center py-[30px] shadow-TableCardShadow justify-center gap-x-5 bg-white rounded-[10px] p-[10px]"
      key={orderId + Date.now().toString()}
    >
      <div className="flex  flex-shrink-0 text-wrap w-[12dvw] items-center text-[18px] font-[500] text-[#000000] justify-start">
        {"Table number " + table}
      </div>
      <div className="flex flex-shrink-0 text-wrap w-[20dvw] text-[#009258] text-[18px] font-[500] items-center justify-start overflow-hidden">
        <p className="text-wrap break-words overflow-hidden text-ellipsis">{"#" + orderId}</p>
      </div>
      <div className="flex  flex-shrink-0 text-wrap w-[12dvw] items-center justify-start">
        <div className="p-2   rounded-[100px] px-[10px] py-[3px] text-[#FFFFFF] text-[12px] font-[500] bg-[#FF7F2F]">
          {status}
        </div>
      </div>
      <div className="flex w-full items-center justify-center text-[18px] font-[500] text-black leading-[21px]">
        {`${totalItems} Items`}
      </div>
      <div className="flex w-full items-center justify-end gap-x-[65px] pr-[30px]">
        <span className="text-[#00000080] text-[16px] font-[500]">
          {"3:00 pm"}
        </span>{" "}
        <RightArrow />
      </div>
    </div>
  );
}

export default OrderCard;
