import { selectDishMenu, setSelectedMenu } from "@/store/slices/dishMenuSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MenuOptionBar = () => {
  const options = useSelector(selectDishMenu);
  const dispatch = useDispatch();

  return (
    <div className="w-full overflow-x-auto bg-gray-100 rounded-full py-1 px-2 shadow-inner">
      <div className="flex min-w-max">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            className={cn(
              "relative py-3 px-6 min-w-[120px] rounded-full transition-colors duration-200 focus:outline-none",
              option.isSelected
                ? "text-white"
                : "text-gray-700 hover:text-gray-900"
            )}
            onClick={() => dispatch(setSelectedMenu(option.id))}
            whileTap={{ scale: 0.95 }}
          >
            {option.isSelected && (
              <motion.div
                layoutId="activeMenu"
                className="absolute inset-0 bg-green-600 rounded-full z-0"
                initial={false}
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <span className="relative z-10 font-medium">{option.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MenuOptionBar;
