import DotIcon from "../icons/dot";

const DishCard = () => {
  return (
    <div className="flex w-full sm:w-[330px] flex-col bg-[#F6F6F6] rounded-[10px]  pt-[25px] pl-[25px] pr-[15px] pb-[15px]">
      <div className="flex overflow-y-auto">
        <div className=" w-1/2 flex-shrink">
          <img
            src="/dishes/steak.jpg"
            width={256}
            height={128}
            className="w-[130px] h-[130px] rounded-[10px] object-cover align-top"
          />
        </div>
        <div className=" w-1/2 flex-col ">
          <span className="text-[18px] font-[500]">Salad</span>
          <div className="text-[11px] font-[500] text-[#00000080] h-[45%] overflow-y-auto  leading-[15px]">
            Lorem ipsum dolor sit amet consectetur. Orci ac et ornare sit et
            tellus lorem vulputate malesuada. Lorem ipsum dolor sit amet
            consectetur. Orci ac et ornare sit et tellus lorem vulputate
            malesuada.{" "}
          </div>
          <div className=" text-[11px] mt-[10px] gap-x-4 flex items-center leading-[15px] text-[#00000080] font-[500]">
            <span>15 available</span>
            <div className="flex items-center gap-x-1">
              <DotIcon />
              <span>32 Sold</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-1/2 flex">
          <span className="font-[500] text-[18px]">7500MMK</span>
        </div>
        <div className="w-1/2">
          <button className="bg-[#009258] py-[7px] px-[44px] text-[16p] font-[500] text-white rounded-[10px]">Add</button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
