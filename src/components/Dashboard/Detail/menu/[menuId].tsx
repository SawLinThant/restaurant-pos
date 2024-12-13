import { SkeletonImage } from "@/components/common/skeleton/image-skeleten";
import { SkeletonProductDetail } from "@/components/common/skeleton/product-detail";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/lib/constants/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface menuDetail {
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const MenuDetail = () => {
  const { menuId } = useParams();
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const [menuDetail, setMenuDetail] = useState<menuDetail>();
  const [loading, SetLoading] = useState<boolean>(false);
  useEffect(() => {
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
    fetchData();
  }, [menuId]);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col gap-4 border border-gray-300  rounded-md p-6 lg:w-[60vw] max-w-[900px] md:w-[70vw]">
        <div className="w-full px-4">
            <Button onClick={() => navigate(-1)} className="bg-secondary text-white hover:text-black hover:border-gray-600">Back</Button>
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
                    className="object-cover bg-cover rounded-md"
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
                      <div className="w-full col-span-1 text-start font-semibold">
                        Name:
                      </div>
                      <div className="w-full col-span-2 text-start">
                        {menuDetail?.name}
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-3">
                      <div className="w-full col-span-1 text-start font-semibold">
                        Category:
                      </div>
                      <div className="w-full col-span-2 text-start">
                        {menuDetail?.category}
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-3">
                      <div className="w-full col-span-1 text-start font-semibold">
                        Price:
                      </div>
                      <div className="w-full col-span-2 text-start">
                        {menuDetail?.price}{" "}
                        <span className="font-semibold font-sans text-green-500">
                          MMK
                        </span>
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-3">
                      <div className="w-full col-span-1 text-start font-semibold">
                        Description:
                      </div>
                      <div className="w-full col-span-2 text-start">
                        {menuDetail?.description}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-4 items-center justify-start md:mt-4">
                  <Button className="bg-secondary rounded-md text-white min-w-[8rem] min-h-10">
                    Update
                  </Button>
                  <Button className="bg-transparent border-gray-500  min-w-[8rem] min-h-10 hover:border-gray-500 rounded-md text-black">
                    Delete
                  </Button>
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
