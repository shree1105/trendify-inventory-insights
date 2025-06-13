
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useSalesOverview = (timeRange: string) => {
  return useQuery({
    queryKey: ['sales-overview', timeRange],
    queryFn: async () => {
      let daysAgo = 7;
      if (timeRange === '30d') daysAgo = 30;
      if (timeRange === '90d') daysAgo = 90;

      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .gte('sale_date', new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString())
        .order('sale_date', { ascending: true });
      
      if (error) throw error;

      // Group sales by day/week/month based on timeRange
      const groupedSales = data.reduce((acc: any, sale: any) => {
        let key;
        const saleDate = new Date(sale.sale_date);
        
        if (timeRange === '7d') {
          key = saleDate.toLocaleDateString('en-US', { weekday: 'short' });
        } else if (timeRange === '30d') {
          key = `Week ${Math.ceil(saleDate.getDate() / 7)}`;
        } else {
          key = saleDate.toLocaleDateString('en-US', { month: 'short' });
        }

        if (!acc[key]) {
          acc[key] = { date: key, revenue: 0, units: 0 };
        }
        
        acc[key].revenue += parseFloat(sale.total_amount);
        acc[key].units += sale.quantity;
        return acc;
      }, {});

      return Object.values(groupedSales);
    },
  });
};
