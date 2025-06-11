
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

interface SalesOverviewProps {
  timeRange: string;
}

const SalesOverview = ({ timeRange }: SalesOverviewProps) => {
  // Mock data based on time range
  const salesData = timeRange === "7d" ? [
    { date: "Mon", revenue: 2400, units: 45 },
    { date: "Tue", revenue: 1398, units: 32 },
    { date: "Wed", revenue: 9800, units: 120 },
    { date: "Thu", revenue: 3908, units: 75 },
    { date: "Fri", revenue: 4800, units: 95 },
    { date: "Sat", revenue: 3800, units: 68 },
    { date: "Sun", revenue: 4300, units: 82 }
  ] : timeRange === "30d" ? [
    { date: "Week 1", revenue: 24000, units: 450 },
    { date: "Week 2", revenue: 18000, units: 320 },
    { date: "Week 3", revenue: 32000, units: 580 },
    { date: "Week 4", revenue: 28000, units: 495 }
  ] : [
    { date: "Month 1", revenue: 85000, units: 1500 },
    { date: "Month 2", revenue: 92000, units: 1680 },
    { date: "Month 3", revenue: 108000, units: 1950 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Revenue Trend</CardTitle>
          <CardDescription>Daily revenue performance over {timeRange}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#revenueGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Units Sold</CardTitle>
          <CardDescription>Product units sold over {timeRange}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="units" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesOverview;
