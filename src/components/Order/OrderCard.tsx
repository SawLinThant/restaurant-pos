import clsx from "clsx";

const OrderCard = () => {
  let currentState = "waiting";
  return (
    <div className="flex flex-col w-full h-full bg-white p-[20px] rounded-[10px] shadow-OrderCardShadow">
      <div className="flex w-full">
        <span className="text-[18px] font-[500]">Table1</span>
        <span className="flex w-full justify-end text-[18px] text-[#22222280] font-[400]">#1234</span>
      </div>
      <span className="text-[12px] font-[500] text-[#222222] text-opacity-[30%] mt-[4px] mb-[16px]">3 items</span>
      <div
        className={clsx(
          "px-[10px] py-[3px] w-[40%] text-[12px] bg-[#FF3333] rounded-[100px] font-[500] text-white",
          {
            "bg-[#FF7F2F]": currentState == "waiting",
            "bg-[#FF3333]": currentState == "canceled",
            "bg-[#00BD71]": currentState == "readyToServe",
          }
        )}
      >
        Cancled
      </div>
    </div>
  );
};

export default OrderCard;
