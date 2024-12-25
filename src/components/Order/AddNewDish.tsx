import {
  Product,
  useGetProductList,
} from "@/lib/hooks/product/useGetProductList";
import AddMenuIcon from "../icons/addMenuicon";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { OrderItem } from "@/lib/type/CommonType";

interface InputProps {
  menus: OrderItem[];
  setMenu: Dispatch<SetStateAction<OrderItem[]>>;
}

function AddNewDish({ menus, setMenu }: InputProps) {
  const { data: menuList, isLoading } = useGetProductList({
    skip: 0,
    take: 100,
  });

  const handleAddMenu = (product: Product) => {
   if(menus.find((currentMenu:OrderItem)=>currentMenu.product.id===product.id)) {
    return
   }
    else {
      setMenu((prev: OrderItem[]) => [
        ...prev,
        {
          Id: Date.now().toString(),
          orderId: product.id + Date.now(),
          productId: product.id,
          status: "PROCESSING",
          quantity: 1,
          createdDate: "",
          product: product,
        },
      ]);
    }
  };
  

  return (
    <Dialog>
      <DialogTrigger className="p-0 border-0 flex items-center justify-center bg-transparent focus:outline-none">
        <AddMenuIcon />
      </DialogTrigger>
      <DialogContent className=" flex flex-col w-full sm:w-[50vw] items-start justify-center">
        <div>Menu list</div>
        <div className="sm:flex-row flex-wrap flex-1 flex-grow gap-y-[20px] gap-x-[20px] flex w-full flex-col">
          {isLoading && <div>Loading...</div>}
          {!isLoading &&
          menuList?.data &&
          menuList?.data?.products.length > 0 ? (
            menuList?.data?.products.map((product: Product) => (
              <div
                key={product.id}
                className="flex flex-col"
                onClick={() => handleAddMenu(product)}
              >
                <img
                  src={product.image || "/dishes/steak.jpg"}
                  width={256}
                  height={128}
                  className={clsx(
                    "w-[130px] h-[130px] rounded-[10px] object-cover align-top",
                    {
                      "border-4 border-[#009258]": menus.find(
                        (menu: OrderItem) => menu.product.id === product.id
                      )?.quantity || 0 > 0,
                    }
                  )}
                />
                <span>{product.name}</span>
              </div>
            ))
          ) : (
            <>{!isLoading && <div>No menu items available</div>}</>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewDish;
