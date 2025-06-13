
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useInventoryInsights = () => {
  return useQuery({
    queryKey: ['inventory-insights'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inventory')
        .select(`
          *,
          products (name, price)
        `)
        .order('current_stock', { ascending: true });
      
      if (error) throw error;

      return data.map((item: any) => {
        const stockPercentage = (item.current_stock / item.max_stock) * 100;
        let status = 'healthy';
        
        if (item.current_stock <= item.reorder_point * 0.5) {
          status = 'critical';
        } else if (item.current_stock <= item.reorder_point) {
          status = 'low';
        }

        // Calculate estimated days left based on average sales
        const daysLeft = Math.max(1, Math.floor(item.current_stock / 3)); // Mock calculation

        return {
          product: item.products.name,
          currentStock: item.current_stock,
          maxStock: item.max_stock,
          status,
          daysLeft,
          reorderPoint: item.reorder_point
        };
      });
    },
  });
};
