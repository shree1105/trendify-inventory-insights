
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package, TrendingUp, Clock } from "lucide-react";

const InventoryInsights = () => {
  const inventoryData = [
    {
      product: "Wireless Headphones",
      currentStock: 45,
      maxStock: 100,
      status: "healthy",
      daysLeft: 12,
      reorderPoint: 20
    },
    {
      product: "Smart Watch",
      currentStock: 15,
      maxStock: 80,
      status: "low",
      daysLeft: 5,
      reorderPoint: 25
    },
    {
      product: "Bluetooth Speaker",
      currentStock: 8,
      maxStock: 60,
      status: "critical",
      daysLeft: 2,
      reorderPoint: 15
    },
    {
      product: "Phone Case",
      currentStock: 78,
      maxStock: 120,
      status: "healthy",
      daysLeft: 25,
      reorderPoint: 30
    },
    {
      product: "Charging Cable",
      currentStock: 23,
      maxStock: 100,
      status: "low",
      daysLeft: 8,
      reorderPoint: 25
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return <Badge variant="destructive" className="text-xs">Critical</Badge>;
      case "low":
        return <Badge variant="outline" className="text-xs border-amber-500 text-amber-700">Low Stock</Badge>;
      case "healthy":
        return <Badge variant="default" className="text-xs bg-green-600">Healthy</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "low":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "healthy":
        return <Package className="h-4 w-4 text-green-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Inventory Status Overview */}
      <Card className="border-0 shadow-lg lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            Current Inventory Status
          </CardTitle>
          <CardDescription>Stock levels and reorder recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {inventoryData.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <span className="font-medium text-gray-900">{item.product}</span>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Stock: {item.currentStock}/{item.maxStock}</span>
                    <span>{Math.round((item.currentStock / item.maxStock) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(item.currentStock / item.maxStock) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Reorder at: {item.reorderPoint} units</span>
                    <span>~{item.daysLeft} days left</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>Inventory management shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900 text-sm">Urgent Reorders</h4>
            <p className="text-red-700 text-xs mt-1">2 products need immediate restocking</p>
            <button className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors">
              Create Purchase Orders
            </button>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-900 text-sm">Low Stock Alerts</h4>
            <p className="text-amber-700 text-xs mt-1">3 products approaching reorder point</p>
            <button className="mt-2 px-3 py-1 bg-amber-600 text-white text-xs rounded hover:bg-amber-700 transition-colors">
              Review & Plan
            </button>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 text-sm">Inventory Report</h4>
            <p className="text-blue-700 text-xs mt-1">Generate detailed stock analysis</p>
            <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
              Export Report
            </button>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 text-sm">Optimize Stock</h4>
            <p className="text-green-700 text-xs mt-1">AI-powered inventory optimization</p>
            <button className="mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors">
              Get Recommendations
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryInsights;
