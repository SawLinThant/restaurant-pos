import DishCard from "./DishCard";

const DishList = () => {
  return (
    <div className="flex w-full flex-col">
      <span className="mb-[30px] text-[25px] font-[500] leading-[30px]">
        Menu
      </span>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-y-2">
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
