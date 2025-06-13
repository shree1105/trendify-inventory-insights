
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useProductPerformance } from "@/hooks/useProducts";

interface ProductPerformanceProps {
  type: "top" | "bottom";
}

const ProductPerformance = ({ type }: ProductPerformanceProps) => {
  const { data: products = [], isLoading } = useProductPerformance(type);

  const title = type === "top" ? "Top Performing Products" : "Underperforming Products";
  const description = type === "top" ? "Best sellers this period" : "Products needing attention";
  const IconComponent = type === "top" ? TrendingUp : TrendingDown;
  const iconColor = type === "top" ? "text-green-500" : "text-red-500";

  if (isLoading) {
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
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="animate-pulse">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

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
          {products.map((product: any, index: number) => (
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
