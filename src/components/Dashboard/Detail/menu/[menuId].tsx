import { SkeletonImage } from "@/components/common/skeleton/image-skeleten";
import { SkeletonProductDetail } from "@/components/common/skeleton/product-detail";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/lib/constants/config";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Loader, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

interface menuDetail {
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const MenuDetail = () => {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuDetail, setMenuDetail] = useState<menuDetail>({
    name: "",
    price: 0,
    category: "",
    description: "",
    image: "",
  });
  const [loading, SetLoading] = useState<boolean>(false);
  const [updateLoading, SetUpdateLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState(false);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log("name:", name);
    console.log("value:", value);
    setMenuDetail((prevState) => ({
      ...prevState,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const updateData = async () => {
    try {
      SetUpdateLoading(true);
      const response = await axios.put(
        `${baseUrl}/Product/update`,
        {
          name: menuDetail.name,
          price: menuDetail.price,
          category: menuDetail.category,
          description: menuDetail.description,
          image: menuDetail.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: menuId
          }
        }
      );
      if (response.status === 200) {
        toast.success("Menu is updated")
      }
    } catch (error) {
      SetUpdateLoading(false);
      toast.error("Failed to update")
      console.log("error loadng menu data:", error);
    } finally {
      SetUpdateLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      SetLoading(true);
      const responses = await axios.get(`${baseUrl}/Product/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: menuId,
        },
      });
      if (responses.status === 200) {
        console.log(responses.data);
        setMenuDetail({
          name: responses.data?.data.name,
          price: responses.data?.data.price,
          category: responses.data?.data.category,
          description: responses.data?.data.description,
          image: responses.data?.data.image,
        });
      }
    } catch (error) {
      SetLoading(false);
      console.log("error loadng menu data:", error);
    } finally {
      SetLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [menuId]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ToastContainer autoClose={3000} position="top-center"/>
      <div className="w-full flex flex-col gap-4 border border-gray-300  rounded-md p-6 lg:w-[60vw] max-w-[900px] md:w-[90vw]">
        <div className="w-full px-4 flex flex-row items-center justify-end">
        <div onClick={() => navigate(-1)} className="hover:cursor-pointer">
              <X size={30} color="black" />
            </div>
        </div>
        <div className=" w-full min-h-[60vh] grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full lg:h-full md:min-h-[40vh] md:p-4">
            <div className="w-full h-full flex items-start justify-center rounded-md">
              <div className="lg:w-[300px] lg:h-[300px] w-full h-full rounded overflow-hidden">
                {loading ? (
                  <SkeletonImage />
                ) : (
                  <img
                    src={menuDetail?.image}
                    className="object-cover bg-cover w-full max-h-[400px] rounded-md"
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            {loading ? (
              <div className="w-full h-full py-4 px-6">
                <SkeletonProductDetail />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col py-4 px-6 justify-between gap-4">
                <div>
                  <div className="w-full flex flex-col gap-4">
                    <div className="w-full py-4 border-b">
                      <h1 className="font-semibold text-2xl">Menu Detail</h1>
                    </div>
                    <div className="w-full grid grid-cols-3">
                      <div className="w-full h-full flex flex-row items-center col-span-1 text-start font-semibold">
                        Name:
                      </div>
                      <div className="w-full col-span-2 text-start">
                        <input
                          name="name"
                          onChange={handleInputChange}
                          disabled={!isEdit}
                          className={cn("w-full px-4 ", {
                            "bg-transparent shadow-none border-none": !isEdit,
                            "shadow-none border rounded-md border-gray-400 py-2":
                              isEdit,
                          })}
                          value={menuDetail?.name || ""}
                          placeholder={menuDetail?.name}
                        />
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-3">
                      <div className="w-full h-full flex flex-row items-center col-span-1 text-start font-semibold">
                        Category:
                      </div>
                      <div className="w-full col-span-2 text-start">
                        <input
                          name="category"
                          onChange={handleInputChange}
                          disabled={!isEdit}
                          className={cn("w-full px-4 ", {
                            "bg-transparent shadow-none border-none": !isEdit,
                            "shadow-none border rounded-md border-gray-400 py-2":
                              isEdit,
                          })}
                          value={menuDetail?.category}
                          placeholder={menuDetail?.category}
                        />
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-3">
                      <div className="w-full h-full flex flex-row items-center col-span-1 text-start font-semibold">
                        Price:
                      </div>
                      <div className="w-full col-span-2 text-start">
                        <input
                          name="price"
                          type="number"
                          disabled={!isEdit}
                          onChange={handleInputChange}
                          className={cn("w-full px-4 ", {
                            "bg-transparent shadow-none border-none": !isEdit,
                            "shadow-none border rounded-md border-gray-400 py-2":
                              isEdit,
                          })}
                          value={menuDetail?.price.toString()}
                          placeholder={menuDetail?.price.toLocaleString()}
                        />
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-3">
                      <div
                        className={cn(
                          "w-full h-full flex flex-row items-start col-span-1 text-start font-semibold",
                          {
                            "pt-2": isEdit,
                          }
                        )}
                      >
                        Description:
                      </div>
                      <div className="w-full col-span-2 text-start">
                        <textarea
                          name="description"
                          onChange={handleInputChange}
                          disabled={!isEdit}
                          className={cn("w-full px-4 ", {
                            "bg-transparent shadow-none border-none": !isEdit,
                            "shadow-none border rounded-md border-gray-400 py-2":
                              isEdit,
                          })}
                          value={menuDetail?.description}
                          placeholder={menuDetail?.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-4 items-center justify-start md:mt-4">
                  {isEdit ? (
                    <Button
                    disabled={updateLoading}
                      onClick={() => {
                        setIsEdit(false);
                        fetchData();
                      }}
                      className="bg-transparent border-gray-500  min-w-[8rem] min-h-10 hover:border-gray-500 rounded-md text-black"
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button className="bg-transparent border-gray-500  min-w-[8rem] min-h-10 hover:border-gray-500 rounded-md text-black">
                      Delete
                    </Button>
                  )}
                  {isEdit ? (
                    <Button disabled={updateLoading} onClick={() => updateData()} className="bg-secondary rounded-md flex items-center justify-center text-white min-w-[8rem] min-h-10 hover:text-black hover:border-gray-600">
                      {updateLoading?(<Loader className="animate-spin" size={25}/>):"Save"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsEdit(true)}
                      className="bg-secondary rounded-md text-white min-w-[8rem] min-h-10 hover:text-black hover:border-gray-600"
                    >
                      Update
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MenuDetail;
