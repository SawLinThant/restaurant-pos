// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";
// import { OrderItem, OrderResponse } from "@/lib/type/CommonType";
// import { useEffect, useState } from "react";

// const PrintPopup = ({ data }: { data: OrderResponse | null }) => {
//   const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
//   const tax = 0;
//   useEffect(() => {
//     setOrderItems(data?.data.orderItems || []);
//   }, [data]);
//   const subtotal = orderItems.reduce((sum, item) => {
//     return sum + item.product.price * item.quantity;
//   }, 0);

//   const taxAmount = subtotal * (tax / 100);

//   const total = subtotal + taxAmount;

//   const timestamp = data?.data.createdDate || "2024-12-17T08:52:58.347Z"; // Fallback to example timestamp
//   const dateObj = new Date(timestamp);
//   const date = dateObj.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//   });
//   const time = dateObj.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <span className="hover:underline hover:cursor-pointer">Print</span>
//       </AlertDialogTrigger>
//       <AlertDialogContent className="w-[350px] p-4">
//         <AlertDialogHeader>
//           <div className="flex flex-col items-center border-b pb-2 gap-1">
//             <div className="min-w-20 flex flex-row items-center justify-center rounded-lg gap-4">
//               <span className="font-semibold text-lg">Name</span>
//               <span className="text-sm">Branch - 1</span>
//             </div>
//             <span className="text-sm">address </span>
//             <span className="text-sm">Ph: 09983727832</span>
//             <span className="text-sm">
//               HotLine: 0938823829, Online: 0938282943
//             </span>
//             <span className="text-sm">Restaurant Counter</span>
//           </div>
//         </AlertDialogHeader>
//         <AlertDialogDescription className="text-sm">
//           <div className="mt-2 border-b pb-2">
//             <p>
//               Order ID: <span className="font-medium">#1234</span>
//             </p>
//             <p>
//               Date: <span className="font-medium">{date}</span>
//             </p>
//             <p>
//               Staff: <span className="font-medium">Thiha</span>
//             </p>
//             <p>
//               Time: <span className="font-medium">{time}</span>
//             </p>
//           </div>
//           <div className="mt-2 border-b pb-2 text-sm">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b">
//                   <th className="py-1">Menu</th>
//                   <th className="py-1 text-center">Count</th>
//                   <th className="py-1 text-right">Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orderItems.map((order) => (
//                   <tr key={order.Id} className="mt-2">
//                     <td>{order.product.name}</td>
//                     <td className="text-center">
//                       {order.product.price}×{order.quantity}
//                     </td>
//                     <td className="text-right">
//                       {(order.product.price * order.quantity).toLocaleString()}{" "}
//                       MMK
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-2 text-right text-sm flex flex-col gap-2">
//             <div>
//               <div className="w-full flex flex-row justify-between items-center">
//                 <span>Subtotal</span>
//                 <p>
//                   <span className="font-medium">{subtotal.toLocaleString()} MMK</span>
//                 </p>
//               </div>

//               <div className="w-full flex flex-row justify-between items-center">
//                 <span>Tax({tax}%)</span>
//                 <p>
//                   <span className="font-medium">{tax} MMK</span>
//                 </p>
//               </div>
//             </div>

//             <div className="w-full border-b border-dashed"></div>
//             <div className="flex-row flex justify-between items-center">
//               <span>Total:</span>
//               <p className="font-bold"> {total.toLocaleString()} MMK</p>
//             </div>
//           </div>
//         </AlertDialogDescription>
//         <AlertDialogFooter className="mt-4">
//           <AlertDialogCancel className="min-w-[100px] hover:border-gray-500">
//             Cancel
//           </AlertDialogCancel>
//           <AlertDialogAction className="bg-secondary min-w-[100px] hover:border-gray-500 text-white hover:text-black">
//             Print
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };
// export default PrintPopup;

// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";
// import { OrderItem, OrderResponse } from "@/lib/type/CommonType";
// import { useEffect, useState, useRef } from "react";
// import { useReactToPrint } from "react-to-print";

// // Define a type for thermal printer constraints (optional, for clarity)
// interface ThermalPrinterConfig {
//   charsPerLine: number; // e.g., 48 for an 80mm thermal printer
//   fontSize: string; // e.g., "12px" for monospaced font
// }

// // Utility function to format text for thermal printer
// const formatForThermalPrinter = (
//   text: string,
//   charsPerLine: number
// ): string => {
//   const lines = text.split("\n");
//   return lines
//     .map((line) => {
//       if (line.length > charsPerLine) {
//         return line.substring(0, charsPerLine); // Truncate if too long
//       }
//       return line.padEnd(charsPerLine, " "); // Pad with spaces for alignment
//     })
//     .join("\n");
// };

// const PrintPopup = ({ data }: { data: OrderResponse | null }) => {
//   const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
//   const tax = 0; // Assuming 0% tax as per the image
//   const componentRef = useRef<HTMLDivElement>(null); // Ref for the print content

//   // Thermal printer configuration (adjust based on your printer specs)
//   const thermalConfig: ThermalPrinterConfig = {
//     charsPerLine: 48, // Typical for 80mm thermal printer with monospaced font
//     fontSize: "12px", // Adjust based on printer capabilities
//   };

//   useEffect(() => {
//     setOrderItems(data?.data.orderItems || []);
//   }, [data]);

//   const subtotal = orderItems.reduce((sum, item) => {
//     return sum + item.product.price * item.quantity;
//   }, 0);

//   const taxAmount = subtotal * (tax / 100);
//   const total = subtotal + taxAmount;

//   const timestamp = data?.data.createdDate || "2024-12-17T08:52:58.347Z";
//   const dateObj = new Date(timestamp);
//   const date = dateObj.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//   });
//   const time = dateObj.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });

//   // Use useReactToPrint hook for printing
//   const handlePrint = useReactToPrint({
//     documentTitle: `Order_${data?.data.Id || "1234"}`,
//     onBeforePrint: async () => {
//       if (componentRef.current) {
//         const printContent = componentRef.current.innerText;
//         const formattedContent = formatForThermalPrinter(
//           printContent,
//           thermalConfig.charsPerLine
//         );
//         console.log("Formatted content for thermal printer:", formattedContent); // Debug output
//       }
//     },
//     pageStyle: `
//       @media print {
//         @page {
//           size: 80mm auto; /* Match thermal printer width */
//           margin: 0;
//         }
//         body {
//           font-family: "Courier", monospace;
//           font-size: ${thermalConfig.fontSize};
//           margin: 0;
//           padding: 0;
//         }
//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }
//         th, td {
//           border-bottom: 1px dashed #000;
//           padding: 2px;
//         }
//       }
//     `,
//   });

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <span className="hover:underline hover:cursor-pointer">Print</span>
//       </AlertDialogTrigger>
//       <AlertDialogContent className="w-[350px] p-4">
//         <AlertDialogHeader>
//           <div className="flex flex-col items-center border-b pb-2 gap-1">
//             <div className="min-w-20 flex flex-row items-center justify-center rounded-lg gap-4">
//               <span className="font-semibold text-lg">Name</span>
//               <span className="text-sm">Branch - 1</span>
//             </div>
//             <span className="text-sm">address</span>
//             <span className="text-sm">Ph: 09983727832</span>
//             <span className="text-sm">
//               HotLine: 0938823829, Online: 0938282943
//             </span>
//             <span className="text-sm">Restaurant Counter</span>
//           </div>
//         </AlertDialogHeader>
//         <AlertDialogDescription className="text-sm">
//           {/* Printable content */}
//           <div
//             ref={componentRef}
//             className="print-content mt-2 border-b pb-2 text-sm font-mono"
//             style={{
//               fontFamily: "Courier, monospace",
//               fontSize: thermalConfig.fontSize,
//             }}
//           >
//             <p>Order ID: #{data?.data.Id || "1234"}</p>
//             <p>Date: {date}</p>
//             <p>Staff: Thiha</p>
//             <p>Time: {time}</p>
//             <table className="w-full text-left mt-2">
//               <thead>
//                 <tr className="border-b">
//                   <th className="py-1">Menu</th>
//                   <th className="py-1 text-center">Count</th>
//                   <th className="py-1 text-right">Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orderItems.map((order) => (
//                   <tr key={order.Id} className="mt-2">
//                     <td>{order.product.name}</td>
//                     <td className="text-center">
//                       {order.product.price}×{order.quantity}
//                     </td>
//                     <td className="text-right">
//                       {(order.product.price * order.quantity).toLocaleString()}{" "}
//                       MMK
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="mt-2 text-right flex flex-col gap-2">
//               <div className="w-full flex flex-row justify-between items-center">
//                 <span>Subtotal</span>
//                 <p>
//                   <span className="font-medium">
//                     {subtotal.toLocaleString()} MMK
//                   </span>
//                 </p>
//               </div>
//               <div className="w-full flex flex-row justify-between items-center">
//                 <span>Tax({tax}%)</span>
//                 <p>
//                   <span className="font-medium">
//                     {taxAmount.toLocaleString()} MMK
//                   </span>
//                 </p>
//               </div>
//               <div className="w-full border-b border-dashed"></div>
//               <div className="flex-row flex justify-between items-center">
//                 <span>Total:</span>
//                 <p className="font-bold">{total.toLocaleString()} MMK</p>
//               </div>
//             </div>
//           </div>
//         </AlertDialogDescription>
//         <AlertDialogFooter className="mt-4">
//           <AlertDialogCancel className="min-w-[100px] hover:border-gray-500">
//             Cancel
//           </AlertDialogCancel>
//           <AlertDialogAction
//             className="bg-secondary min-w-[100px] hover:border-gray-500 text-white hover:text-black"
//             onClick={() => handlePrint()} // Trigger print using the handlePrint function
//           >
//             Print
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

// export default PrintPopup;

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { OrderItem, OrderResponse } from "@/lib/type/CommonType";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

// Define a type for thermal printer constraints (optional, for clarity)
interface ThermalPrinterConfig {
  charsPerLine: number; // e.g., 48 for an 80mm thermal printer
  fontSize: string; // e.g., "12px" for monospaced font
}

// Utility function to format text for thermal printer
const formatForThermalPrinter = (
  text: string,
  charsPerLine: number
): string => {
  const lines = text.split("\n");
  return lines
    .map((line) => {
      if (line.length > charsPerLine) {
        return line.substring(0, charsPerLine); // Truncate if too long
      }
      return line.padEnd(charsPerLine, " "); // Pad with spaces for alignment
    })
    .join("\n");
};

const PrintPopup = ({ data }: { data: OrderResponse | null }) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const tax = 0; // Assuming 0% tax as per the image
  const componentRef = useRef<HTMLDivElement>(null); // Ref for the print content

  // Thermal printer configuration (adjust based on your printer specs)
  const thermalConfig: ThermalPrinterConfig = {
    charsPerLine: 48, // Typical for 80mm thermal printer with monospaced font
    fontSize: "12px", // Adjust based on printer capabilities
  };

  useEffect(() => {
    setOrderItems(data?.data.orderItems || []);
  }, [data]);

  const subtotal = orderItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const taxAmount = subtotal * (tax / 100);
  const total = subtotal + taxAmount;

  const timestamp = data?.data.createdDate || "2024-12-17T08:52:58.347Z";
  const dateObj = new Date(timestamp);
  const date = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Use useReactToPrint hook for printing, passing componentRef directly as contentRef
  const handlePrint = useReactToPrint({
    contentRef: componentRef, // Pass the RefObject directly, not a function
    documentTitle: `Order_${data?.data.Id || "1234"}`,
    onBeforePrint: async () => {
      if (componentRef.current) {
        const printContent = componentRef.current.innerText;
        const formattedContent = formatForThermalPrinter(
          printContent,
          thermalConfig.charsPerLine
        );
        console.log("Formatted content for thermal printer:", formattedContent); // Debug output
      }
    },
    pageStyle: `
      @media print {
        @page {
          size: 80mm auto; /* Match thermal printer width */
          margin: 0;
        }
        body {
          font-family: "Courier", monospace;
          font-size: ${thermalConfig.fontSize};
          margin: 0;
          padding: 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border-bottom: 1px dashed #000;
          padding: 2px;
        }
      }
    `,
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="hover:underline hover:cursor-pointer">Print</span>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[350px] p-4">
        <AlertDialogHeader>
          <div className="flex flex-col items-center border-b pb-2 gap-1">
            <div className="min-w-20 flex flex-row items-center justify-center rounded-lg gap-4">
              <span className="font-semibold text-lg">Name</span>
              <span className="text-sm">Branch - 1</span>
            </div>
            <span className="text-sm">address</span>
            <span className="text-sm">Ph: 09983727832</span>
            <span className="text-sm">
              HotLine: 0938823829, Online: 0938282943
            </span>
            <span className="text-sm">Restaurant Counter</span>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-sm">
          {/* Printable content */}
          <div
            ref={componentRef}
            className="print-content mt-2 border-b pb-2 text-sm font-mono"
            style={{
              fontFamily: "Courier, monospace",
              fontSize: thermalConfig.fontSize,
            }}
          >
            <p>Order ID: #{data?.data.Id || "1234"}</p>
            <p>Date: {date}</p>
            <p>Staff: Thiha</p>
            <p>Time: {time}</p>
            <table className="w-full text-left mt-2">
              <thead>
                <tr className="border-b">
                  <th className="py-1">Menu</th>
                  <th className="py-1 text-center">Count</th>
                  <th className="py-1 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((order) => (
                  <tr key={order.Id} className="mt-2">
                    <td>{order.product.name}</td>
                    <td className="text-center">
                      {order.product.price}×{order.quantity}
                    </td>
                    <td className="text-right">
                      {(order.product.price * order.quantity).toLocaleString()}{" "}
                      MMK
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 text-right flex flex-col gap-2">
              <div className="w-full flex flex-row justify-between items-center">
                <span>Subtotal</span>
                <p>
                  <span className="font-medium">
                    {subtotal.toLocaleString()} MMK
                  </span>
                </p>
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <span>Tax({tax}%)</span>
                <p>
                  <span className="font-medium">
                    {taxAmount.toLocaleString()} MMK
                  </span>
                </p>
              </div>
              <div className="w-full border-b border-dashed"></div>
              <div className="flex-row flex justify-between items-center">
                <span>Total:</span>
                <p className="font-bold">{total.toLocaleString()} MMK</p>
              </div>
            </div>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="min-w-[100px] hover:border-gray-500">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-secondary min-w-[100px] hover:border-gray-500 text-white hover:text-black"
            onClick={() => handlePrint()} // Trigger print using the handlePrint function
          >
            Print
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PrintPopup;
