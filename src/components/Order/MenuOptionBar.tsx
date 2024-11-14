import { selectDishMenu, setSelectedMenu } from "@/store/slices/dishMenuSlice";
import clsx from "clsx";

import { useDispatch, useSelector } from "react-redux";

const MenuOptionBar = () => {
  const options = useSelector(selectDishMenu);
  const dispatch = useDispatch();

  return (
    <div
      className={clsx(
        "flex w-full sticky top-0 bg-[#F1F1F1] rounded-[100px] py-[6px] px-[10px]",
        {}
      )}
    >
      {options.map((currentOption) => {
        return (
          <div
            className={clsx(
              "py-[15px] w-full items-center justify-center flex rounded-[100px] cursor-pointer",
              {
                "bg-[#FFFFFF]": currentOption.isSelected,
                "bg-[#F1F1F1]": !currentOption.isSelected,
              }
            )}
            key={currentOption.id}
            onClick={() => {
              dispatch(setSelectedMenu(currentOption.id));
            }}
          >
            <span>{currentOption.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MenuOptionBar;
