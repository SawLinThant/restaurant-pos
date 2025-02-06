// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
//   } from "@/components/ui/alert-dialog"

//   export function PrintPopup() {
//     return (
//       <AlertDialog>
//         <AlertDialogTrigger asChild>
//           <span className="hover:underline hover:cursor-pointer">Print</span>
//         </AlertDialogTrigger>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Voucher</AlertDialogTitle>
//             <AlertDialogDescription>

//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction className="bg-secondary hover:border-gray-500 text-white hover:text-black">Continue</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     )
//   }
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

export function PrintPopup() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="hover:underline hover:cursor-pointer">Print</span>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[350px] p-4">
        <AlertDialogHeader>
          <div className="flex flex-col items-center border-b pb-2">
            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-lg">
              Logo
            </div>
            <h2 className="text-lg font-bold">Restaurant Name</h2>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-sm">
          <div className="mt-2 border-b pb-2">
            <p>
              Order ID: <span className="font-medium">#1234</span>
            </p>
            <p>
              Date: <span className="font-medium">1.1.2025</span>
            </p>
            <p>
              Staff: <span className="font-medium">Thiha</span>
            </p>
            <p>
              Time: <span className="font-medium">11:50AM</span>
            </p>
          </div>
          <div className="mt-2 border-b pb-2 text-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-1">Menu</th>
                  <th className="py-1 text-center">Count</th>
                  <th className="py-1 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="mt-2">
                  <td>Salad</td>
                  <td className="text-center">1×7500</td>
                  <td className="text-right">7500 MMK</td>
                </tr>
                <tr>
                  <td>Pasta</td>
                  <td className="text-center">2×10000</td>
                  <td className="text-right">20000 MMK</td>
                </tr>
                <tr>
                  <td>Lamp Stew</td>
                  <td className="text-center">2×20000</td>
                  <td className="text-right">40000 MMK</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-right text-sm flex flex-col gap-2">
            <div>
              <div className="w-full flex flex-row justify-between items-center">
                <span>Subtotal</span>
                <p>
                  <span className="font-medium">67500 MMK</span>
                </p>
              </div>

              <div className="w-full flex flex-row justify-between items-center">
                <span>Tax(10%)</span>
                <p>
                  <span className="font-medium">67500 MMK</span>
                </p>
              </div>
            </div>

            <div className="w-full border-b border-dashed"></div>
            <div className="flex-row flex justify-between items-center">
              <span>Total:</span>
              <p className="font-bold"> 74250 MMK</p>
            </div>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="min-w-[100px] hover:border-gray-500">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-secondary min-w-[100px] hover:border-gray-500 text-white hover:text-black">
            Print
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
