
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package, TrendingUp, Clock, FileText, ShoppingCart, Eye, Lightbulb } from "lucide-react";
import { useInventoryInsights } from "@/hooks/useInventory";
import { useToast } from "@/hooks/use-toast";

const InventoryInsights = () => {
  const { data: inventoryData = [], isLoading } = useInventoryInsights();
  const { toast } = useToast();

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

  const handleCreatePurchaseOrders = () => {
    const criticalItems = inventoryData.filter((item: any) => item.status === 'critical');
    
    if (criticalItems.length === 0) {
      toast({
        title: "No Critical Items",
        description: "No products need immediate restocking at this time.",
      });
      return;
    }

    const orderDetails = criticalItems.map((item: any) => ({
      product: item.product,
      currentStock: item.currentStock,
      reorderQuantity: Math.max(item.maxStock - item.currentStock, 50)
    }));

    // Mock purchase order creation
    toast({
      title: "Purchase Orders Created",
      description: `Created ${criticalItems.length} purchase orders for critical items. Total estimated cost: ₹${(orderDetails.reduce((sum, item) => sum + (item.reorderQuantity * 100), 0)).toLocaleString()}`,
    });

    console.log("Purchase Orders:", orderDetails);
  };

  const handleReviewAndPlan = () => {
    const lowStockItems = inventoryData.filter((item: any) => item.status === 'low');
    
    if (lowStockItems.length === 0) {
      toast({
        title: "All Stock Levels Healthy",
        description: "No items are approaching reorder point at this time.",
      });
      return;
    }

    // Create planning report
    const planningData = lowStockItems.map((item: any) => ({
      product: item.product,
      daysLeft: item.daysLeft,
      recommendedAction: item.daysLeft < 7 ? "Order immediately" : "Plan for next week",
      priority: item.daysLeft < 7 ? "High" : "Medium"
    }));

    toast({
      title: "Planning Report Generated",
      description: `Review completed for ${lowStockItems.length} items. ${planningData.filter(item => item.priority === 'High').length} high priority items need attention.`,
    });

    console.log("Planning Report:", planningData);
  };

  const handleExportReport = () => {
    // Generate comprehensive inventory report
    const reportData = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalProducts: inventoryData.length,
        criticalItems: inventoryData.filter((item: any) => item.status === 'critical').length,
        lowStockItems: inventoryData.filter((item: any) => item.status === 'low').length,
        healthyItems: inventoryData.filter((item: any) => item.status === 'healthy').length
      },
      inventory: inventoryData.map((item: any) => ({
        product: item.product,
        currentStock: item.currentStock,
        maxStock: item.maxStock,
        reorderPoint: item.reorderPoint,
        status: item.status,
        daysLeft: item.daysLeft,
        stockPercentage: Math.round((item.currentStock / item.maxStock) * 100)
      }))
    };

    // Create and download the report
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inventory-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Exported",
      description: "Inventory report has been downloaded successfully.",
    });
  };

  const handleGetRecommendations = () => {
    // AI-powered inventory optimization recommendations
    const recommendations = [];

    // Analyze inventory patterns and generate recommendations
    inventoryData.forEach((item: any) => {
      if (item.status === 'critical') {
        recommendations.push({
          product: item.product,
          type: "Urgent Restock",
          action: `Order ${Math.max(item.maxStock - item.currentStock, 50)} units immediately`,
          impact: "Prevent stockout",
          priority: "Critical"
        });
      } else if (item.status === 'low') {
        recommendations.push({
          product: item.product,
          type: "Plan Restock",
          action: `Schedule order for ${item.maxStock - item.currentStock} units within ${item.daysLeft} days`,
          impact: "Maintain optimal stock levels",
          priority: "Medium"
        });
      } else if (item.currentStock > item.maxStock * 0.9) {
        recommendations.push({
          product: item.product,
          type: "Optimize Stock",
          action: "Consider reducing next order quantity",
          impact: "Reduce holding costs",
          priority: "Low"
        });
      }
    });

    // Add general recommendations
    if (recommendations.length === 0) {
      recommendations.push({
        type: "System Optimization",
        action: "All inventory levels are optimal. Consider setting up automated reorder points.",
        impact: "Improve efficiency",
        priority: "Info"
      });
    }

    toast({
      title: "AI Recommendations Generated",
      description: `Generated ${recommendations.length} optimization recommendations. Check console for details.`,
    });

    console.log("AI Inventory Recommendations:", recommendations);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="animate-pulse space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-8"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="h-full flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading actions...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            {inventoryData.slice(0, 5).map((item: any, index: number) => (
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
            <h4 className="font-semibold text-red-900 text-sm flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Urgent Reorders
            </h4>
            <p className="text-red-700 text-xs mt-1">
              {inventoryData.filter((item: any) => item.status === 'critical').length} products need immediate restocking
            </p>
            <button 
              onClick={handleCreatePurchaseOrders}
              className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors flex items-center gap-1"
            >
              <ShoppingCart className="h-3 w-3" />
              Create Purchase Orders
            </button>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-900 text-sm flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Low Stock Alerts
            </h4>
            <p className="text-amber-700 text-xs mt-1">
              {inventoryData.filter((item: any) => item.status === 'low').length} products approaching reorder point
            </p>
            <button 
              onClick={handleReviewAndPlan}
              className="mt-2 px-3 py-1 bg-amber-600 text-white text-xs rounded hover:bg-amber-700 transition-colors flex items-center gap-1"
            >
              <Eye className="h-3 w-3" />
              Review & Plan
            </button>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 text-sm flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Inventory Report
            </h4>
            <p className="text-blue-700 text-xs mt-1">Generate detailed stock analysis</p>
            <button 
              onClick={handleExportReport}
              className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
            >
              <FileText className="h-3 w-3" />
              Export Report
            </button>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 text-sm flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Optimize Stock
            </h4>
            <p className="text-green-700 text-xs mt-1">AI-powered inventory optimization</p>
            <button 
              onClick={handleGetRecommendations}
              className="mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors flex items-center gap-1"
            >
              <Lightbulb className="h-3 w-3" />
              Get Recommendations
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryInsights;
