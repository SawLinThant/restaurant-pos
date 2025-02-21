// const VoucherTable: React.FC = () => {
//   return (
//     <div className="w-full flex flex-col">
//       <div className="w-full flex flex-col">
//         <div className="w-full flex flex-row text-center bg-secondary text-white font-semibold">
//           <div className="w-12 py-4 border border-[#009258]">No</div>
//           <div className="w-[17rem] border border-[#009258] border-l-0 flex items-center justify-center">
//             Particular
//           </div>
//           <div className="flex flex-grow border-y border-r border-[#009258] items-center justify-center">
//             Unit
//           </div>
//           <div className="flex flex-grow border-y border-r border-[#009258] items-center justify-center">
//             Qty
//           </div>
//           <div className="flex flex-grow border-y border-[#009258] items-center justify-center">
//             Price
//           </div>
//           <div className="flex flex-grow border border-[#009258] items-center justify-center">
//             Amount
//           </div>
//         </div>
//         <div className="w-full flex flex-row text-center">
//           <div className="w-12 p-2 border-x">1</div>
//           <div className="w-[17rem] border-r flex items-center justify-center">
//             Bread
//           </div>
//           <div className="w-full grid grid-cols-4">
//             <div className="flex border-r items-center justify-center">
//               Pack
//             </div>
//             <div className="flex border-r items-center justify-center">1</div>
//             <div className="flex items-center justify-center">10000</div>
//             <div className="flex border-x items-center justify-center">
//               10000
//             </div>
//           </div>
//         </div>
//         <div className="w-full border-t"></div>
//         <div className="w-full flex flex-row text-center">
//           <div className="w-12 p-2"></div>
//           <div className="w-[17rem] flex items-center justify-center"></div>
//           <div className="w-full grid grid-cols-4">
//             <div className="flex  items-center justify-center"></div>
//             <div className="flex border-r items-center justify-center"></div>
//             <div className="flex  border-b py-4 items-center justify-center font-bold">
//               Total
//             </div>
//             <div className="flex border-x border-b items-center justify-center font-bold text-[#009258]">
//               10000
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default VoucherTable;

// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"; // Adjust the import path based on your shadcn setup
// import { DailyBuying } from "@/lib/hooks/daily-buying/useGetDailyBuyingList";

// interface VoucherTableProps {
//   data: DailyBuying[];
// }

// const VoucherTable: React.FC<VoucherTableProps> = ({ data }) => {
//   // Calculate total amount
//   const totalAmount = data.reduce((sum, item) => sum + item.Amount, 0);

//   return (
//     <div className="w-full flex flex-col">
//       <Table>
//         <TableHeader>
//           <TableRow className="bg-secondary text-white font-semibold">
//             <TableHead className="w-12 border text-white border-[#009258] text-center py-4">
//               No
//             </TableHead>
//             <TableHead className="w-[17rem] border text-white border-[#009258] border-l-0 text-center">
//               Particular
//             </TableHead>
//             <TableHead className="border-y border-r text-white border-[#009258] text-center">
//               Unit
//             </TableHead>
//             <TableHead className="border-y border-r text-white border-[#009258] text-center">
//               Qty
//             </TableHead>
//             <TableHead className="border-y border-r text-white border-[#009258] text-center">
//               Price
//             </TableHead>
//             <TableHead className="border text-white border-[#009258] text-center">
//               Amount
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.map((item, index) => (
//             <TableRow key={item.Id} className="text-center">
//               <TableCell className="w-12 p-2 border-x">{index + 1}</TableCell>
//               <TableCell className="w-[17rem] border-r">
//                 {item.particular}
//               </TableCell>
//               <TableCell className="border-r">{item.unit}</TableCell>
//               <TableCell className="border-r">{item.quantity}</TableCell>
//               <TableCell>{item.price.toLocaleString()}</TableCell>
//               <TableCell className="border-x">
//                 {item.Amount.toLocaleString()}
//               </TableCell>
//             </TableRow>
//           ))}
//           {/* Total Row */}
//           <TableRow className="text-center">
//             <TableCell className="w-12 p-2" />
//             <TableCell className="w-[17rem]" />
//             <TableCell />
//             <TableCell />
//             <TableCell className="border-b py-4 font-bold">Total</TableCell>
//             <TableCell className="border-x border-b font-bold text-[#009258]">
//               {totalAmount.toLocaleString()}
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// // Example usage:
// /*
// const sampleData = [
//   { id: 1, particular: "Bread", unit: "Pack", quantity: 1, price: 10000, amount: 10000 },
//   { id: 2, particular: "Milk", unit: "Liter", quantity: 2, price: 5000, amount: 10000 },
// ];

// <VoucherTable data={sampleData} />
// */

// export default VoucherTable;

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useGetDailyBuyingList } from "@/lib/hooks/daily-buying/useGetDailyBuyingList";

interface DailyBuying {
  Id: string;
  particular: string;
  unit: string;
  price: number;
  quantity: number;
  Amount: number;
  createdDate: string;
  updatedDate: string;
}

interface VoucherTableProps {
  data?: DailyBuying[];
  itemsPerPage?: number;
  particularFilter?: string;
}

const VoucherTable: React.FC<VoucherTableProps> = ({
  data: initialData,
  itemsPerPage = 10,
  particularFilter,
}) => {
  const [page, setPage] = useState(1);

  const {
    data: fetchedData,
    isLoading,
    error,
  } = useGetDailyBuyingList(
    {
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      particular: particularFilter,
    },
    {
      enabled: !initialData,
    }
  );

  const data = initialData || fetchedData?.data?.DailyBuyings || [];
  const totalCount = fetchedData?.data?.totalCounts || initialData?.length || 0;
  const totalAmount = data.reduce((sum, item) => sum + item.Amount, 0);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  console.log(fetchedData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary text-white font-semibold hover:bg-secondary">
            <TableHead className="w-12 border text-white border-[#009258] text-center py-4">
              No
            </TableHead>
            <TableHead className="w-[17rem] border text-white border-[#009258] border-l-0 text-center">
              Particular
            </TableHead>
            <TableHead className="border-y border-r text-white border-[#009258] text-center">
              Unit
            </TableHead>
            <TableHead className="border-y border-r text-white border-[#009258] text-center">
              Qty
            </TableHead>
            <TableHead className="border-y border-r text-white border-[#009258] text-center">
              Price
            </TableHead>
            <TableHead className="border text-white border-[#009258] text-center">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.Id} className="text-center">
              <TableCell className="w-12 p-2 border-x">
                {(page - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell className="w-[17rem] border-r">
                {item.particular}
              </TableCell>
              <TableCell className="border-r">{item.unit}</TableCell>
              <TableCell className="border-r">{item.quantity}</TableCell>
              <TableCell>{item.price.toLocaleString()}</TableCell>
              <TableCell className="border-x">
                {item.Amount.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="text-center">
            <TableCell className="w-12 p-2" />
            <TableCell className="w-[17rem]" />
            <TableCell />
            <TableCell />
            <TableCell className="border-b py-4 font-bold">Total</TableCell>
            <TableCell className="border-x border-b font-bold text-[#009258]">
              {totalAmount.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {totalCount > 0 && (
        <div className="flex items-center justify-center">
          {/* <div>
            Showing {(page - 1) * itemsPerPage + 1} to{" "}
            {Math.min(page * itemsPerPage, totalCount)} of {totalCount} entries
          </div> */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="flex items-center">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages || totalPages === 0}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherTable;
