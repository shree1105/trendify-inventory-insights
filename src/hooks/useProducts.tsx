
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};

export const useTopProducts = () => {
  return useQuery({
    queryKey: ['top-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales')
        .select(`
          product_id,
          quantity,
          total_amount,
          products (name, price)
        `)
        .order('sale_date', { ascending: false })
        .limit(100);
      
      if (error) throw error;

      // Aggregate sales by product
      const productSales = data.reduce((acc: any, sale: any) => {
        const productId = sale.product_id;
        if (!acc[productId]) {
          acc[productId] = {
            name: sale.products.name,
            sales: 0,
            revenue: 0,
            price: sale.products.price
          };
        }
        acc[productId].sales += sale.quantity;
        acc[productId].revenue += sale.total_amount;
        return acc;
      }, {});

      // Convert to array and sort by sales
      return Object.values(productSales)
        .sort((a: any, b: any) => b.sales - a.sales)
        .slice(0, 8);
    },
  });
};

export const useProductPerformance = (type: 'top' | 'bottom') => {
  return useQuery({
    queryKey: ['product-performance', type],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales')
        .select(`
          product_id,
          quantity,
          total_amount,
          products (name, price)
        `)
        .gte('sale_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
      
      if (error) throw error;

      // Aggregate sales by product
      const productSales = data.reduce((acc: any, sale: any) => {
        const productId = sale.product_id;
        if (!acc[productId]) {
          acc[productId] = {
            name: sale.products.name,
            sales: 0,
            revenue: sale.total_amount,
            change: `+${Math.floor(Math.random() * 20 + 1)}%` // Mock change for now
          };
        }
        acc[productId].sales += sale.quantity;
        acc[productId].revenue += sale.total_amount;
        return acc;
      }, {});

      // Convert to array and sort
      const sortedProducts = Object.values(productSales)
        .sort((a: any, b: any) => type === 'top' ? b.sales - a.sales : a.sales - b.sales)
        .slice(0, 5)
        .map((product: any) => ({
          ...product,
          revenue: `₹${product.revenue.toLocaleString('en-IN')}`
        }));

      return sortedProducts;
    },
  });
};
