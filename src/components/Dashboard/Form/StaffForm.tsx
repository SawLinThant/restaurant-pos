import ComboBox from "@/components/common/custom-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffForm = () => {
 const navigate = useNavigate();
  return (
    <div className="w-full h-full flex items-start justify-center">
      <div className="w-[50vw] min-h-[40vh] p-8 mt-10 border-2 rounded-md">
        <div className="w-full h-full flex flex-col gap-8">
          <div>
            <h2 className="font-semibold text-xl">Create Staff</h2>
          </div>
          <div className="w-full">
            <form action="" className="flex flex-col gap-8">
              <div className="w-full grid grid-cols-2">
                <div className="w-full flex flex-col pr-6 gap-4 border-r border-gray-300">
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Staff Name</label>
                    <Input placeholder="Enter staff name" />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Phone Number</label>
                    <Input placeholder="Enter phone number" />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="">Role</label>
                    <ComboBox />
                  </div>
                </div>
                <div className="w-full flex flex-col pl-6">
                </div>
              </div>
              <div className="flex flex-row gap-3 w-full justify-center mt-4">
                <Button onClick={() => navigate("/dashboard/staff")} className="text-black bg-white border min-w-[7rem] border-gray-600 hover:border-green-600">
                  Cancel
                </Button>
                <Button className="bg-secondary text-white min-w-[7rem] hover:text-black hover:border-green-600">
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StaffForm;
