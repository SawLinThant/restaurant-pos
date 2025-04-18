import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Copy } from "lucide-react";
import { Button, AnimatedButton } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/slices/orderCartSlice";

interface OrderSuccessDialogProps {
  open?: boolean;
  onClose?: () => void;
}

/**
 * Dialog that appears when an order is successfully placed
 */
const OrderSuccessDialog = ({
  open: externalOpen,
  onClose,
}: OrderSuccessDialogProps) => {
  const [orderNumber, setOrderNumber] = useState("");
  const [open, setOpen] = useState(false);
  const { items, total } = useSelector((state: RootState) => state.orderCart);
  const dispatch = useDispatch();

  // This is a mock functionality - in a real app this would be set when we get the order confirmation
  useEffect(() => {
    // Generate a random order number for demo purposes
    const randomOrderNum = `#ORD-${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;
    setOrderNumber(randomOrderNum);
  }, [open]);

  // For direct control when needed
  useEffect(() => {
    if (externalOpen !== undefined) {
      setOpen(externalOpen);
    }
  }, [externalOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
    dispatch(clearCart());
  };

  const copyOrderNumber = () => {
    navigator.clipboard
      .writeText(orderNumber)
      .then(() => toast.success("Order number copied to clipboard"))
      .catch(() => toast.error("Failed to copy order number"));
  };

  // Mock displaying the dialog - in a real app this would be connected to the order submission result
  useEffect(() => {
    // For demo purposes, let's make the dialog accessible via a global function
    (window as any).showOrderSuccess = () => setOpen(true);

    return () => {
      delete (window as any).showOrderSuccess;
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="h-8 w-8 text-green-500" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Order Placed Successfully!
            </motion.span>
          </DialogTitle>
          <DialogDescription className="pt-2 text-center">
            Thank you for your order. Your order has been placed and will be
            prepared shortly.
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col space-y-4"
        >
          <div className="flex justify-between items-center rounded-lg border p-3">
            <div className="font-medium">Order Number</div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{orderNumber}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={copyOrderNumber}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-lg border divide-y">
            <div className="p-3 bg-muted/50">
              <h3 className="font-medium">Order Summary</h3>
            </div>

            <div className="p-3 max-h-60 overflow-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between py-2">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      x{item.quantity}
                    </span>
                  </div>
                  <div>{formatCurrency(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="p-3 font-bold flex justify-between">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </motion.div>

        <DialogFooter className="sm:justify-center gap-2 pt-2">
          <AnimatedButton onClick={handleClose} size="lg" variant="gradient">
            Done
          </AnimatedButton>
          <Button variant="outline" onClick={handleClose}>
            View Orders
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderSuccessDialog;
