import React from "react";

interface OrderSuccessDialogProps {
  open?: boolean;
  onClose?: () => void;
}

declare const OrderSuccessDialog: React.FC<OrderSuccessDialogProps>;

export default OrderSuccessDialog;
