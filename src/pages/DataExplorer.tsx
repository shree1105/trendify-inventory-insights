
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Package, ShoppingCart, TrendingUp, Archive } from "lucide-react";
import Header from "@/components/Header";
import { useProducts } from "@/hooks/useProducts";
import { useInventoryInsights } from "@/hooks/useInventory";
import { useSalesOverview } from "@/hooks/useSales";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";

const DataExplorer = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const { data: products = [], isLoading: productsLoading, refetch: refetchProducts } = useProducts();
  const { data: inventory = [], isLoading: inventoryLoading, refetch: refetchInventory } = useInventoryInsights();
  const { data: salesData = [], isLoading: salesLoading, refetch: refetchSales } = useSalesOverview('30d');
  const { data: metrics, isLoading: metricsLoading, refetch: refetchMetrics } = useDashboardMetrics();

  const handleRefreshAll = () => {
    setRefreshKey(prev => prev + 1);
    refetchProducts();
    refetchInventory();
    refetchSales();
    refetchMetrics();
  };

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Data Explorer
            </h1>
            <p className="text-lg text-gray-600">
              Explore and analyze your inventory dataset
            </p>
          </div>
          <Button onClick={handleRefreshAll} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh All Data
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Package className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold">
                    {metricsLoading ? "..." : metrics?.total_products || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Archive className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {metricsLoading ? "..." : metrics?.low_stock_items || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold">
                    {metricsLoading ? "..." : formatCurrency(metrics?.total_value || 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <ShoppingCart className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Sales</p>
                  <p className="text-2xl font-bold text-green-600">
                    {metricsLoading ? "..." : formatCurrency(metrics?.today_sales || 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
            <TabsTrigger value="inventory">Inventory ({inventory.length})</TabsTrigger>
            <TabsTrigger value="sales">Sales Data ({salesData.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Products Dataset</CardTitle>
                <CardDescription>Complete product catalog with pricing and details</CardDescription>
              </CardHeader>
              <CardContent>
                {productsLoading ? (
                  <div className="text-center py-8">Loading products...</div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {products.map((product: any) => (
                        <div key={product.id} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <Badge variant="outline">{product.category}</Badge>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium">SKU:</span> {product.sku}</p>
                            <p><span className="font-medium">Price:</span> {formatCurrency(product.price)}</p>
                            {product.cost && (
                              <p><span className="font-medium">Cost:</span> {formatCurrency(product.cost)}</p>
                            )}
                            {product.description && (
                              <p><span className="font-medium">Description:</span> {product.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Dataset</CardTitle>
                <CardDescription>Stock levels and inventory management data</CardDescription>
              </CardHeader>
              <CardContent>
                {inventoryLoading ? (
                  <div className="text-center py-8">Loading inventory...</div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {inventory.map((item: any) => (
                        <div key={item.product} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">{item.product}</h3>
                            <Badge 
                              variant={
                                item.status === 'critical' ? 'destructive' : 
                                item.status === 'low' ? 'secondary' : 'default'
                              }
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Current Stock:</span>
                              <span className="font-medium">{item.currentStock}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Max Stock:</span>
                              <span className="font-medium">{item.maxStock}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Reorder Point:</span>
                              <span className="font-medium">{item.reorderPoint}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Days Left:</span>
                              <span className="font-medium">{item.daysLeft} days</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Sales Dataset</CardTitle>
                <CardDescription>Sales performance and revenue data (last 30 days)</CardDescription>
              </CardHeader>
              <CardContent>
                {salesLoading ? (
                  <div className="text-center py-8">Loading sales data...</div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {salesData.map((sale: any, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <h3 className="font-semibold text-gray-900">{sale.date}</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Revenue:</span>
                              <span className="font-medium text-green-600">
                                {formatCurrency(sale.revenue)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Units Sold:</span>
                              <span className="font-medium">{sale.units} units</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataExplorer;
