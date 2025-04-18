import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { useGetOrderDetail } from "@/lib/hooks/order/useGetOrderDetail";
import OrderDetailSkeleton from "@/components/Order/OrderDetailSkeleton";
import OrderDetailView from "@/components/Order/OrderDetailView";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toast";

function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const {
    data: orderDetail,
    isLoading,
    isError,
    error: queryError,
    refetch,
  } = useGetOrderDetail(orderId || "");

  // Reset error when orderId changes
  useEffect(() => {
    setError(null);
    setRetryCount(0);
  }, [orderId]);

  // Handle API errors
  useEffect(() => {
    if (isError) {
      const errorMessage =
        (queryError as any)?.response?.data?.message ||
        "Failed to load order details. Please try again.";
      setError(errorMessage);
    }
  }, [isError, queryError]);

  const handleRetry = () => {
    setError(null);
    setRetryCount((prev) => prev + 1);
    refetch();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4 px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="flex gap-3">
          <Button onClick={handleRetry} variant="default">
            {retryCount > 0 && "Try Again"}
            {retryCount === 0 && "Retry"}
          </Button>
          <Button onClick={handleGoBack} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <OrderDetailView data={orderDetail?.data || null} />
    </>
  );
}

export default OrderDetailPage;
