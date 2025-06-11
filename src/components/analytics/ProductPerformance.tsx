
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ProductPerformanceProps {
  type: "top" | "bottom";
}

const ProductPerformance = ({ type }: ProductPerformanceProps) => {
  const topProducts = [
    { name: "Women's Denim Jeans", sales: 234, revenue: "$14,040", change: "+15%" },
    { name: "Cotton T-Shirt", sales: 189, revenue: "$3,780", change: "+8%" },
    { name: "Leather Jacket", sales: 156, revenue: "$23,400", change: "+12%" },
    { name: "Summer Dress", sales: 143, revenue: "$8,580", change: "+5%" },
    { name: "Running Shoes", sales: 128, revenue: "$9,600", change: "+3%" }
  ];

  const bottomProducts = [
    { name: "Winter Coat", sales: 12, revenue: "$1,800", change: "-30%" },
    { name: "Formal Suit", sales: 8, revenue: "$2,400", change: "-45%" },
    { name: "Vintage Sweater", sales: 5, revenue: "$250", change: "-60%" },
    { name: "Wool Scarf", sales: 4, revenue: "$120", change: "-25%" },
    { name: "Evening Gown", sales: 2, revenue: "$600", change: "-80%" }
  ];

  const products = type === "top" ? topProducts : bottomProducts;
  const title = type === "top" ? "Top Performing Products" : "Underperforming Products";
  const description = type === "top" ? "Best sellers this period" : "Products needing attention";
  const IconComponent = type === "top" ? TrendingUp : TrendingDown;
  const iconColor = type === "top" ? "text-green-500" : "text-red-500";

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <IconComponent className={`h-5 w-5 ${iconColor}`} />
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
