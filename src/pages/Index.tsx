
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SalesOverview from "@/components/analytics/SalesOverview";
import ProductPerformance from "@/components/analytics/ProductPerformance";
import InventoryInsights from "@/components/analytics/InventoryInsights";
import TopProducts from "@/components/analytics/TopProducts";
import Header from "@/components/Header";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";

const Index = () => {
  const { data: metrics, isLoading } = useDashboardMetrics();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Inventory Management Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Monitor your inventory levels, track sales performance, and optimize your business operations
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                ) : (
                  metrics?.total_products || 0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Products in catalog
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                ) : (
                  metrics?.low_stock_items || 0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
                ) : (
                  `₹${(metrics?.total_value || 0).toLocaleString('en-IN')}`
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Inventory value
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
                ) : (
                  `₹${(metrics?.today_sales || 0).toLocaleString('en-IN')}`
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Revenue today
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverview timeRange="7d" />
          <ProductPerformance type="top" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InventoryInsights />
          <TopProducts />
        </div>
      </div>
    </div>
  );
};

export default Index;
