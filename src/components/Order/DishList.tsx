import { Product, useGetProductList } from "@/lib/hooks/product/useGetProductList";
import DishCard from "./DishCard";
//import { useCreateOrder } from "@/lib/hooks/useCreateOreder";

const DishList = () => {
  const {
    data: menuList,
    isLoading,
    isError,
    error,
  } = useGetProductList(
    {
      take: 10,
      skip: 0,
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log(menuList?.data?.products);

  // Handle loading state
  // if (isLoading) {
  //   return (
  //     <div className="flex w-full flex-col">
  //       <span className="mb-[30px] text-[25px] font-[500] leading-[30px]">
  //         Loading Menu...
  //       </span>
  //     </div>
  //   );
  // }

  // Handle error state
  if (isError) {
    return (
      <div className="flex w-full flex-col">
        <span className="mb-[30px] text-[25px] font-[500] leading-[30px]">
          Error loading menu: {error?.message}
        </span>
      </div>
    );
  }

  // Handle case when data is undefined
  if (!menuList?.data) {
    return (
      <div className="flex w-full flex-col">
        <span className="mb-[30px] text-[25px] font-[500] leading-[30px]">
          No menu items available
        </span>
      </div>
    );
  }

  // const { mutate: createOrder } = useCreateOrder({
  //   onSuccess: () => {
  //     console.log("Order created successfully");
  //   },
  //   onError: (error) => {
  //     console.error("Error creating order:", error);
  //   },
  // });

  // const handleCreateOrder = () => {
  //   createOrder({
  //     productId: "1",
  //     quantity: 1,
  //   });
  // };
  return (
    <div className="flex w-full flex-col">
      <span className="mb-[30px] text-[25px] font-[500] leading-[30px]">
        Menu
      </span>
      <div className="sm:grid md:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-y-[20px] gap-x-[20px] flex w-full flex-col">
        {isLoading && <div>Loading...</div>}
        {!isLoading && menuList?.data?.products.length > 0 ? (
          menuList?.data?.products.map((product: Product) => (
            <DishCard product={product} />
          ))
        ) : (
          <div>No menu items available</div>
        )}
      </div>
    </div>
  );
};

export default DishList;
