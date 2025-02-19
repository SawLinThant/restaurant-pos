const VoucherTable: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row text-center bg-secondary text-white font-semibold">
          <div className="w-12 py-4 border border-[#009258]">No</div>
          <div className="w-[17rem] border border-[#009258] border-l-0 flex items-center justify-center">
            Particular
          </div>
          <div className="flex flex-grow border-y border-r border-[#009258] items-center justify-center">
            Unit
          </div>
          <div className="flex flex-grow border-y border-r border-[#009258] items-center justify-center">
            Qty
          </div>
          <div className="flex flex-grow border-y border-[#009258] items-center justify-center">
            Price
          </div>
          <div className="flex flex-grow border border-[#009258] items-center justify-center">
            Amount
          </div>
        </div>
        <div className="w-full flex flex-row text-center">
          <div className="w-12 p-2 border-x">1</div>
          <div className="w-[17rem] border-r flex items-center justify-center">
            Bread
          </div>
          <div className="w-full grid grid-cols-4">
          <div className="flex border-r items-center justify-center">
            Pack
          </div>
          <div className="flex border-r items-center justify-center">
            1
          </div>
          <div className="flex items-center justify-center">
            10000
          </div>
          <div className="flex border-x items-center justify-center">
            10000
          </div>
          </div>
        
        </div>
        <div className="w-full border-t"></div>
        <div className="w-full flex flex-row text-center">
          <div className="w-12 p-2"></div>
          <div className="w-[17rem] flex items-center justify-center">
           
          </div>
          <div className="w-full grid grid-cols-4">
          <div className="flex  items-center justify-center">
   
          </div>
          <div className="flex border-r items-center justify-center">
          
          </div>
          <div className="flex  border-b py-4 items-center justify-center font-bold">
            Total
          </div>
          <div className="flex border-x border-b items-center justify-center font-bold text-[#009258]">
            10000
          </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};
export default VoucherTable;
