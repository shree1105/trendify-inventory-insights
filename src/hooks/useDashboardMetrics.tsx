
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface DashboardMetrics {
  total_products: number;
  low_stock_items: number;
  total_value: number;
  today_sales: number;
}

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_dashboard_metrics');
      if (error) throw error;
      return data as unknown as DashboardMetrics;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};
