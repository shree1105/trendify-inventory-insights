
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import SalesOverview from "@/components/analytics/SalesOverview";
import ProductPerformance from "@/components/analytics/ProductPerformance";
import InventoryInsights from "@/components/analytics/InventoryInsights";
import TopProducts from "@/components/analytics/TopProducts";
import { TrendingUp, TrendingDown, Package, BarChart3 } from "lucide-react";

const Index = () => {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock data for KPIs
  const kpis = [
    {
      title: "Total Revenue",
      value: "$24,567",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      description: "vs last period"
    },
    {
      title: "Units Sold",
      value: "1,847",
      change: "+8.2%",
      trend: "up",
      icon: Package,
      description: "total items"
    },
    {
      title: "Low Stock Items",
      value: "23",
      change: "-5.1%",
      trend: "down",
      icon: TrendingDown,
      description: "need reorder"
    },
    {
      title: "Product Categories",
      value: "12",
      change: "0%",
      trend: "neutral",
      icon: BarChart3,
      description: "active categories"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Inventory Analytics
            </h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive insights to optimize your inventory management
            </p>
          </div>
          <div className="flex gap-2">
            {["7d", "30d", "90d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeRange === range
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Badge
                    variant={kpi.trend === "up" ? "default" : kpi.trend === "down" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {kpi.change}
                  </Badge>
                  <span>{kpi.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mx-auto">
            <TabsTrigger value="overview">Sales Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <SalesOverview timeRange={timeRange} />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProductPerformance type="top" />
              <ProductPerformance type="bottom" />
            </div>
            <TopProducts />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <InventoryInsights />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">AI-Powered Recommendations</CardTitle>
                <CardDescription>
                  Intelligent insights to optimize your inventory strategy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-900">Restock Alert</h4>
                  <p className="text-blue-700 text-sm mt-1">
                    Consider restocking "Wireless Headphones" - trending 45% above average sales
                  </p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                  <h4 className="font-semibold text-amber-900">Slow Mover</h4>
                  <p className="text-amber-700 text-sm mt-1">
                    "Classic Watches" sales down 30% - consider promotional pricing
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-900">Trending Category</h4>
                  <p className="text-green-700 text-sm mt-1">
                    "Smart Home" category showing 65% growth - expand product line
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
