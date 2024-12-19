// import { baseUrl } from "@/lib/constants/config";
// import axios from "axios";
// import { useEffect, useState } from "react";
import { SkeletonProductDetail } from "@/components/common/skeleton/product-detail";
import { Button } from "@/components/ui/button";
import { useGetStaffDetail } from "@/lib/hooks/staff/useGetStaffDetail";
import { UserResponse } from "@/lib/type/CommonType";
import { cn } from "@/lib/utils";
import { Loader, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const StaffDetail = () => {
  const { staffId } = useParams();
  const {data: staffDetails } = useGetStaffDetail(staffId || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const navigate = useNavigate();
  const [staffDetail,setStaffDetail] = useState<UserResponse['data']>({
    id: "",
    name: "",
    role: "",
    email: "",
    phone: "",
  })
  const handleInputChange = () => {};

 useEffect(() => {
  if(staffDetails?.data)
  setStaffDetail(staffDetails?.data)
 },[staffDetails])
  const fetchData = () => {
    throw new Error("Function not implemented.");
  };

  const updateData = () => {
    setUpdateLoading(true)
    try{

    }catch(err){
      throw new Error("error updating staff")
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="w-full flex items-center justify-center gap-4 overflow-y-auto">
      <ToastContainer autoClose={3000} position="top-center" />
      <div className="w-[90%] max-w-[1000px] border rounded-md p-8 flex flex-col gap-4">
        <div className="w-full h-full flex flex-row items-center justify-end">
          <div onClick={() => navigate(-1)} className="hover:cursor-pointer">
            <X size={30} color="black" />
          </div>
        </div>

        <div className="w-full h-full grid lg:grid-cols-2 md:grid-cols-1">
          <div className="w-full lg:pr-6 flex flex-col lg:border-r-2">
            <div>
              {loading ? (
                <div className="w-full h-full py-4 px-6">
                  <SkeletonProductDetail />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col py-4 justify-between gap-4">
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
                            value={staffDetail?.name || "--"}
                            placeholder={staffDetail?.name}
                          />
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-3">
                        <div className="w-full h-full flex flex-row items-center col-span-1 text-start font-semibold">
                          Email:
                        </div>
                        <div className="w-full col-span-2 text-start">
                          <input
                            name="email"
                            type="email"
                            onChange={handleInputChange}
                            disabled={!isEdit}
                            className={cn("w-full px-4 ", {
                              "bg-transparent shadow-none border-none": !isEdit,
                              "shadow-none border rounded-md border-gray-400 py-2":
                                isEdit,
                            })}
                               value={staffDetail?.email || "--"}
                               placeholder={staffDetail?.email}
                          />
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-3">
                        <div className="w-full h-full flex flex-row items-center col-span-1 text-start font-semibold">
                          Phone:
                        </div>
                        <div className="w-full col-span-2 text-start">
                          <input
                            name="phone"
                            type="text"
                            disabled={!isEdit}
                            onChange={handleInputChange}
                            className={cn("w-full px-4 ", {
                              "bg-transparent shadow-none border-none": !isEdit,
                              "shadow-none border rounded-md border-gray-400 py-2":
                                isEdit,
                            })}
                               value={staffDetail?.phone || "--"}
                               placeholder={staffDetail?.phone}
                          />
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-3">
                        <div className="w-full h-full flex flex-row items-center col-span-1 text-start font-semibold">
                          Role:
                        </div>
                        <div className="w-full col-span-2 text-start">
                          <input
                            name="role"
                            type="text"
                            disabled={!isEdit}
                            onChange={handleInputChange}
                            className={cn("w-full px-4 ", {
                              "bg-transparent shadow-none border-none": !isEdit,
                              "shadow-none border rounded-md border-gray-400 py-2":
                                isEdit,
                            })}
                               value={staffDetail?.role.toLocaleLowerCase() || "--"}
                               placeholder={staffDetail?.role}
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
                      <Button
                        disabled={updateLoading}
                        onClick={() => updateData()}
                        className="bg-secondary rounded-md flex items-center justify-center text-white min-w-[8rem] min-h-10 hover:text-black hover:border-gray-600"
                      >
                        {updateLoading ? (
                          <Loader className="animate-spin" size={25} />
                        ) : (
                          "Save"
                        )}
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
          <div className="w-full lg:pl-6 pt-4 flex flex-col">
            <div className="w-full h-full flex flex-col">
              <div className="w-full py-4 border-b">
                <h1 className="font-semibold text-2xl">Staff Order History</h1>
              </div>
              <div className="w-full h-full border mt-4 border-gray-400 rounded-md flex flex-col gap-4 p-3">
                <div className="w-full h-full flex flex-col gap-2">
                  <div className="w-full border-b border-green-600 min-h-16 px-2 grid grid-cols-3">
                    <div className="w-full flex items-center justify-center">
                      <span>Order Id</span>
                    </div>
                    <div className="w-full flex items-center justify-center">
                      <span>Total Amount</span>
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                      <span>Status</span>
                    </div>
                  </div>
                  <div className="w-full h-[22rem] flex flex-col gap-4 overflow-y-auto">
                    <div className="w-full border-b border-green-200 min-h-16 px-2 grid grid-cols-3">
                      <div className="w-full flex items-center justify-center">
                        <span>0490345</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span>MMK 30004</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-green-500 text-white">
                          Status
                        </span>
                      </div>
                    </div>
                    <div className="w-full border-b border-green-200 min-h-16 px-2 grid grid-cols-3">
                      <div className="w-full flex items-center justify-center">
                        <span>0490345</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span>MMK 30004</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-green-500 text-white">
                          Status
                        </span>
                      </div>
                    </div>
                    <div className="w-full border-b border-green-200 min-h-16 px-2 grid grid-cols-3">
                      <div className="w-full flex items-center justify-center">
                        <span>0490345</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span>MMK 30004</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-green-500 text-white">
                          Status
                        </span>
                      </div>
                    </div>
                    <div className="w-full border-b border-green-200 min-h-16 px-2 grid grid-cols-3">
                      <div className="w-full flex items-center justify-center">
                        <span>0490345</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span>MMK 30004</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-green-500 text-white">
                          Status
                        </span>
                      </div>
                    </div>
                    <div className="w-full border-b border-green-200 min-h-16 px-2 grid grid-cols-3">
                      <div className="w-full flex items-center justify-center">
                        <span>0490345</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span>MMK 30004</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-green-500 text-white">
                          Status
                        </span>
                      </div>
                    </div>
                    <div className="w-full border-b border-green-200 min-h-16 px-2 grid grid-cols-3">
                      <div className="w-full flex items-center justify-center">
                        <span>0490345</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span>MMK 30004</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-green-500 text-white">
                          Status
                        </span>
                      </div>
                    </div>
                    <div className="w-full border-b border-green-200 min-h-16 px-2 grid grid-cols-3">
                      <div className="w-full flex items-center justify-center">
                        <span>0490345</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span>MMK 30004</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-green-500 text-white">
                          Status
                        </span>
                      </div>
                    </div>
                    <div className="w-full border-b border-green-200 min-h-16 px-2 grid grid-cols-3">
                      <div className="w-full flex items-center justify-center">
                        <span>0490345</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span>MMK 30004</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-green-500 text-white">
                          Status
                        </span>
                      </div>
                    </div>
                    <div className="w-full border-b border-green-200 min-h-16 px-2 grid grid-cols-3">
                      <div className="w-full flex items-center justify-center">
                        <span>0490345</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span>MMK 30004</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-green-500 text-white">
                          Status
                        </span>
                      </div>
                    </div>
                    <div className="w-full border-b border-green-200 min-h-16 px-2 grid grid-cols-3">
                      <div className="w-full flex items-center justify-center">
                        <span>0490345</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span>MMK 30004</span>
                      </div>
                      <div className="w-full flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-green-500 text-white">
                          Status
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StaffDetail;
