
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ProductPerformanceProps {
  type: "top" | "bottom";
}

const ProductPerformance = ({ type }: ProductPerformanceProps) => {
  const topProducts = [
    { name: "Wireless Headphones", sales: 234, revenue: "$4,680", change: "+15%" },
    { name: "Smart Watch", sales: 189, revenue: "$3,780", change: "+8%" },
    { name: "Bluetooth Speaker", sales: 156, revenue: "$2,340", change: "+12%" },
    { name: "Phone Case", sales: 143, revenue: "$1,430", change: "+5%" },
    { name: "Charging Cable", sales: 128, revenue: "$640", change: "+3%" }
  ];

  const bottomProducts = [
    { name: "Classic Watch", sales: 12, revenue: "$240", change: "-30%" },
    { name: "Vintage Camera", sales: 8, revenue: "$160", change: "-45%" },
    { name: "CD Player", sales: 5, revenue: "$100", change: "-60%" },
    { name: "Wired Headphones", sales: 4, revenue: "$80", change: "-25%" },
    { name: "Film Camera", sales: 2, revenue: "$40", change: "-80%" }
  ];

  const products = type === "top" ? topProducts : bottomProducts;
  const title = type === "top" ? "Top Performing Products" : "Underperforming Products";
  const description = type === "top" ? "Best sellers this period" : "Products needing attention";
  const icon = type === "top" ? TrendingUp : TrendingDown;
  const iconColor = type === "top" ? "text-green-500" : "text-red-500";

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon({ className: `h-5 w-5 ${iconColor}` })}
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  type === "top" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} units sold</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{product.revenue}</p>
                <Badge 
                  variant={type === "top" ? "default" : "destructive"}
                  className="text-xs"
                >
                  {product.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPerformance;
