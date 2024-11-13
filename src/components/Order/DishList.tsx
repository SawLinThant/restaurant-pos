import DishCard from "./DishCard";

const DishList = () => {
  return (
    <div className="flex w-full flex-col">
      <span className="mb-[30px] text-[25px] font-[500] leading-[30px]">
        Menu
      </span>
      <div className="sm:grid md:grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 gap-y-[20px] gap-x-[20px] flex w-full flex-col">
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
        <DishCard />
      </div>
    </div>
  );
};

export default DishList;
