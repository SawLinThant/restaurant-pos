import MinusIcon from "../icons/minus";
import PlusIcon from "../icons/plus";

const OrderCartDetail = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="grid grid-cols-2 w-full">
        <div className="">
          <img
            src="/dishes/steak.jpg"
            width={256}
            height={128}
            className="w-[130px] h-[130px] rounded-[10px] object-cover align-top"
          />
        </div>
        <div className="flex flex-col w-full gap-y-[23px]">
          <span>Salad</span>
          <div className="flex w-full items-center justify-start gap-x-[20px]">
            <div className="rounded-full flex  bg-[#009258] w-[40px] h-[40px] items-center justify-center">
              <MinusIcon />
            </div>
            <span>2</span>
            <div className="rounded-full flex  bg-[#009258] w-[40px] h-[40px] items-center justify-center">
              <PlusIcon />
            </div>
          </div>
          <span>20000 MMK</span>
        </div>
      </div>
      <div className="border[#00000080] w-full border-[0.5px] mt-[30px] mb-[30px]" />
    </div>
  );
};

export default OrderCartDetail;
