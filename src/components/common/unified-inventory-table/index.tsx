import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  DownloadIcon,
  Loader,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDailyBuyingList } from "@/lib/hooks/daily-buying/useGetDailyBuyingList";
import { useGetOrderList } from "@/lib/hooks/product/useGetOrderList";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { DailyBuying } from "@/lib/hooks/daily-buying/useGetDailyBuyingList";
import { OrderResponse } from "@/lib/type/CommonType";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface UnifiedInventoryTableProps {
  date: string;
  itemsPerPage?: number;
}

const UnifiedInventoryTable: React.FC<UnifiedInventoryTableProps> = ({
  date,
  itemsPerPage = 5,
}) => {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"both" | "demand" | "supply">(
    "both"
  );

  // Create stable query parameters object for orders
  const orderQueryParams = useMemo(
    () => ({
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage * 2, // Load more orders to display
      startDate: date,
      endDate: date,
    }),
    [page, itemsPerPage, date]
  );

  // Create stable query parameters object for supply
  const supplyQueryParams = useMemo(
    () => ({
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage * 2, // Load more supplies to display
      date: date,
    }),
    [page, itemsPerPage, date]
  );

  // Fetch order data (demand)
  const {
    data: orderData,
    isLoading: isOrderLoading,
    error: orderError,
  } = useGetOrderList(orderQueryParams, {
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Fetch supply data
  const {
    data: supplyData,
    isLoading: isSupplyLoading,
    error: supplyError,
  } = useGetDailyBuyingList(supplyQueryParams, {
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Memoize derived data
  const orders = useMemo(
    () => orderData?.data?.orders || [],
    [orderData?.data?.orders]
  );

  const supplies = useMemo(
    () => supplyData?.data?.DailyBuyings || [],
    [supplyData?.data?.DailyBuyings]
  );

  const totalOrderAmount = useMemo(() => {
    return orders.reduce((total, order) => {
      const orderTotal =
        order.orderItems?.reduce(
          (sum, item) => sum + item.quantity * item.product.price,
          0
        ) || 0;
      return total + orderTotal;
    }, 0);
  }, [orders]);

  const totalSupplyAmount = useMemo(
    () => supplyData?.data?.totalPrice || 0,
    [supplyData?.data?.totalPrice]
  );

  const profitLoss = useMemo(() => {
    return totalOrderAmount - totalSupplyAmount;
  }, [totalOrderAmount, totalSupplyAmount]);

  const profitMargin = useMemo(() => {
    if (totalOrderAmount === 0) return 0;
    return (profitLoss / totalOrderAmount) * 100;
  }, [profitLoss, totalOrderAmount]);

  // Calculate totals for display
  const totalOrders = useMemo(
    () => orderData?.data?.totalCounts || 0,
    [orderData?.data?.totalCounts]
  );

  const totalSupplies = useMemo(
    () => supplyData?.data?.totalCounts || 0,
    [supplyData?.data?.totalCounts]
  );

  const totalPages = useMemo(
    () =>
      Math.max(
        Math.ceil(totalOrders / itemsPerPage),
        Math.ceil(totalSupplies / itemsPerPage)
      ),
    [totalOrders, totalSupplies, itemsPerPage]
  );

  // Create stable event handlers
  const handlePrevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  // Card variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (orderError || supplyError) {
    return (
      <div className="w-full p-6 text-center">
        <p className="text-red-500">
          Error loading data: {orderError?.message || supplyError?.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-2">
              <CardTitle className="text-lg flex items-center">
                <span className="rounded-full bg-blue-100 p-2 mr-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </span>
                Daily Sales (Demand)
              </CardTitle>
              <CardDescription>
                Total revenue for {format(new Date(date), "MMM dd, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold flex items-baseline">
                {isOrderLoading ? (
                  <Skeleton className="h-9 w-32 rounded-md" />
                ) : (
                  <>
                    {totalOrderAmount.toLocaleString()}{" "}
                    <span className="text-sm ml-1">MMK</span>
                  </>
                )}
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="flex items-center text-emerald-500 font-medium">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  {totalOrders} Orders
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="bg-amber-50 dark:bg-amber-900/20 pb-2">
              <CardTitle className="text-lg flex items-center">
                <span className="rounded-full bg-amber-100 p-2 mr-2">
                  <ArrowDown className="h-5 w-5 text-amber-600" />
                </span>
                Daily Expenses (Supply)
              </CardTitle>
              <CardDescription>
                Total cost for {format(new Date(date), "MMM dd, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold flex items-baseline">
                {isSupplyLoading ? (
                  <Skeleton className="h-9 w-32 rounded-md" />
                ) : (
                  <>
                    {totalSupplyAmount.toLocaleString()}{" "}
                    <span className="text-sm ml-1">MMK</span>
                  </>
                )}
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="flex items-center text-amber-500 font-medium">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  {totalSupplies} Items
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader
              className={`${
                profitLoss >= 0
                  ? "bg-green-50 dark:bg-green-900/20"
                  : "bg-red-50 dark:bg-red-900/20"
              } pb-2`}
            >
              <CardTitle className="text-lg flex items-center">
                <span
                  className={`rounded-full ${
                    profitLoss >= 0 ? "bg-green-100" : "bg-red-100"
                  } p-2 mr-2`}
                >
                  {profitLoss >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </span>
                {profitLoss >= 0 ? "Profit" : "Loss"}
              </CardTitle>
              <CardDescription>
                Profit margin: {profitMargin.toFixed(2)}%
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div
                className={`text-3xl font-bold flex items-baseline ${
                  profitLoss >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {isOrderLoading || isSupplyLoading ? (
                  <Skeleton className="h-9 w-32 rounded-md" />
                ) : (
                  <>
                    {Math.abs(profitLoss).toLocaleString()}{" "}
                    <span className="text-sm ml-1">MMK</span>
                  </>
                )}
              </div>
              <div className="mt-4">
                <Progress
                  value={Math.max(
                    0,
                    Math.min(100, profitLoss >= 0 ? profitMargin : 0)
                  )}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Table View Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as any)}
        className="w-full"
      >
        <div className="flex justify-between items-center">
          <TabsList className="grid grid-cols-3 w-[300px]">
            <TabsTrigger value="both">Both</TabsTrigger>
            <TabsTrigger value="demand">Demand</TabsTrigger>
            <TabsTrigger value="supply">Supply</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <DownloadIcon className="h-4 w-4 mr-1" /> Export CSV
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {format(new Date(date), "MMM dd, yyyy")}
            </Button>
          </div>
        </div>

        <TabsContent value="both" className="mt-4">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Inventory Overview</CardTitle>
              <CardDescription>
                Comparison of demand (sales) and supply (expenses) for{" "}
                {format(new Date(date), "MMM dd, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Demand (Order) Table */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-100 text-blue-600">
                      D
                    </span>
                    Demand (Sales)
                  </h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-blue-50">
                          <TableHead>Order ID</TableHead>
                          <TableHead>Table</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isOrderLoading ? (
                          Array(5)
                            .fill(null)
                            .map((_, index) => (
                              <TableRow key={`order-skeleton-${index}`}>
                                <TableCell>
                                  <Skeleton className="h-5 w-28" />
                                </TableCell>
                                <TableCell>
                                  <Skeleton className="h-5 w-16" />
                                </TableCell>
                                <TableCell className="text-right">
                                  <Skeleton className="h-5 w-20 ml-auto" />
                                </TableCell>
                              </TableRow>
                            ))
                        ) : orders.length > 0 ? (
                          orders.slice(0, itemsPerPage).map((order) => {
                            const orderTotal =
                              order.orderItems?.reduce(
                                (sum, item) =>
                                  sum + item.quantity * item.product.price,
                                0
                              ) || 0;

                            return (
                              <TableRow key={order.Id}>
                                <TableCell className="font-medium">
                                  {order.Id?.substring(0, 8) || "N/A"}...
                                </TableCell>
                                <TableCell>Table {order.table}</TableCell>
                                <TableCell className="text-right">
                                  {orderTotal.toLocaleString()} MMK
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={3}
                              className="text-center py-6 text-muted-foreground"
                            >
                              No orders found for this date
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Supply Table */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-amber-100 text-amber-600">
                      S
                    </span>
                    Supply (Expenses)
                  </h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-amber-50">
                          <TableHead>Particular</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isSupplyLoading ? (
                          Array(5)
                            .fill(null)
                            .map((_, index) => (
                              <TableRow key={`supply-skeleton-${index}`}>
                                <TableCell>
                                  <Skeleton className="h-5 w-28" />
                                </TableCell>
                                <TableCell>
                                  <Skeleton className="h-5 w-16" />
                                </TableCell>
                                <TableCell className="text-right">
                                  <Skeleton className="h-5 w-20 ml-auto" />
                                </TableCell>
                              </TableRow>
                            ))
                        ) : supplies.length > 0 ? (
                          supplies.slice(0, itemsPerPage).map((supply) => (
                            <TableRow key={supply.Id}>
                              <TableCell className="font-medium">
                                {supply.particular}
                              </TableCell>
                              <TableCell>
                                {supply.quantity} {supply.unit}
                              </TableCell>
                              <TableCell className="text-right">
                                {supply.Amount.toLocaleString()} MMK
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={3}
                              className="text-center py-6 text-muted-foreground"
                            >
                              No supplies found for this date
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <div className="flex items-center gap-2">
                <Badge variant={profitLoss >= 0 ? "success" : "destructive"}>
                  {profitLoss >= 0 ? "Profit" : "Loss"}:{" "}
                  {Math.abs(profitLoss).toLocaleString()} MMK
                </Badge>
                <Badge variant="outline">
                  Margin: {profitMargin.toFixed(2)}%
                </Badge>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="py-2 px-4 text-sm">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={page === totalPages || totalPages === 0}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="demand" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Demand (Sales) Details</CardTitle>
              <CardDescription>
                All sales for {format(new Date(date), "MMM dd, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-50">
                      <TableHead>Order ID</TableHead>
                      <TableHead>Table</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isOrderLoading ? (
                      Array(8)
                        .fill(null)
                        .map((_, index) => (
                          <TableRow key={`order-full-skeleton-${index}`}>
                            <TableCell>
                              <Skeleton className="h-5 w-28" />
                            </TableCell>
                            <TableCell>
                              <Skeleton className="h-5 w-16" />
                            </TableCell>
                            <TableCell>
                              <Skeleton className="h-5 w-20" />
                            </TableCell>
                            <TableCell>
                              <Skeleton className="h-5 w-10" />
                            </TableCell>
                            <TableCell className="text-right">
                              <Skeleton className="h-5 w-20 ml-auto" />
                            </TableCell>
                          </TableRow>
                        ))
                    ) : orders.length > 0 ? (
                      orders.map((order) => {
                        const orderTotal =
                          order.orderItems?.reduce(
                            (sum, item) =>
                              sum + item.quantity * item.product.price,
                            0
                          ) || 0;
                        const itemCount = order.orderItems?.length || 0;

                        return (
                          <TableRow key={order.Id}>
                            <TableCell className="font-medium">
                              {order.Id?.substring(0, 8) || "N/A"}...
                            </TableCell>
                            <TableCell>Table {order.table}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  order.status === "Completed"
                                    ? "success"
                                    : order.status === "Pending"
                                    ? "warning"
                                    : "default"
                                }
                              >
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{itemCount} items</TableCell>
                            <TableCell className="text-right">
                              {orderTotal.toLocaleString()} MMK
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-6 text-muted-foreground"
                        >
                          No orders found for this date
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <Badge variant="outline" className="mr-2">
                  Total: {totalOrderAmount.toLocaleString()} MMK
                </Badge>
                <Badge variant="outline">Orders: {totalOrders}</Badge>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="py-2 px-4 text-sm">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={page === totalPages || totalPages === 0}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="supply" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Supply (Expenses) Details</CardTitle>
              <CardDescription>
                All purchases for {format(new Date(date), "MMM dd, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-amber-50">
                      <TableHead>Particular</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Total Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isSupplyLoading ? (
                      Array(8)
                        .fill(null)
                        .map((_, index) => (
                          <TableRow key={`supply-full-skeleton-${index}`}>
                            <TableCell>
                              <Skeleton className="h-5 w-28" />
                            </TableCell>
                            <TableCell>
                              <Skeleton className="h-5 w-16" />
                            </TableCell>
                            <TableCell>
                              <Skeleton className="h-5 w-10" />
                            </TableCell>
                            <TableCell>
                              <Skeleton className="h-5 w-20" />
                            </TableCell>
                            <TableCell className="text-right">
                              <Skeleton className="h-5 w-20 ml-auto" />
                            </TableCell>
                          </TableRow>
                        ))
                    ) : supplies.length > 0 ? (
                      supplies.map((supply) => (
                        <TableRow key={supply.Id}>
                          <TableCell className="font-medium">
                            {supply.particular}
                          </TableCell>
                          <TableCell>{supply.unit}</TableCell>
                          <TableCell>{supply.quantity}</TableCell>
                          <TableCell>
                            {supply.price.toLocaleString()} MMK
                          </TableCell>
                          <TableCell className="text-right">
                            {supply.Amount.toLocaleString()} MMK
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-6 text-muted-foreground"
                        >
                          No supplies found for this date
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <Badge variant="outline" className="mr-2">
                  Total: {totalSupplyAmount.toLocaleString()} MMK
                </Badge>
                <Badge variant="outline">Items: {totalSupplies}</Badge>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="py-2 px-4 text-sm">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={page === totalPages || totalPages === 0}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Profit/Loss Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card
          className={`${
            profitLoss >= 0 ? "border-green-200" : "border-red-200"
          }`}
        >
          <CardHeader
            className={`pb-2 ${profitLoss >= 0 ? "bg-green-50" : "bg-red-50"}`}
          >
            <CardTitle className="text-lg">
              Financial Summary - {format(new Date(date), "MMMM d, yyyy")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">
                  Total Sales
                </span>
                <span className="text-2xl font-semibold">
                  {totalOrderAmount.toLocaleString()} MMK
                </span>
                <span className="text-sm text-muted-foreground mt-1">
                  From {totalOrders} orders
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">
                  Total Expenses
                </span>
                <span className="text-2xl font-semibold">
                  {totalSupplyAmount.toLocaleString()} MMK
                </span>
                <span className="text-sm text-muted-foreground mt-1">
                  From {totalSupplies} supplies
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">
                  {profitLoss >= 0 ? "Profit" : "Loss"}
                </span>
                <span
                  className={`text-2xl font-semibold ${
                    profitLoss >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Math.abs(profitLoss).toLocaleString()} MMK
                </span>
                <span className="text-sm text-muted-foreground mt-1">
                  Profit Margin: {profitMargin.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-medium mb-2">Profit/Loss Ratio</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    profitLoss >= 0 ? "bg-green-600" : "bg-red-600"
                  }`}
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(0, profitLoss >= 0 ? profitMargin * 2 : 0)
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="text-sm text-muted-foreground">
              {profitLoss >= 0
                ? `You've made a profit of ${profitLoss.toLocaleString()} MMK today with a ${profitMargin.toFixed(
                    2
                  )}% margin.`
                : `You've incurred a loss of ${Math.abs(
                    profitLoss
                  ).toLocaleString()} MMK today.`}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default React.memo(UnifiedInventoryTable);
