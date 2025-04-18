import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { AnimatedButton } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

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
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="h-12 w-12 text-green-500" />
            </motion.div>
          </DialogTitle>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <DialogTitle className="text-center mt-4 text-2xl">
              Order Placed Successfully!
            </DialogTitle>
            <DialogDescription className="text-center pt-2 text-base">
              Thank you for your order. Your order has been placed and will be
              prepared shortly.
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <DialogFooter className="sm:justify-center pt-4">
          <AnimatedButton onClick={handleClose} size="lg" variant="gradient">
            Done
          </AnimatedButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderSuccessDialog;
