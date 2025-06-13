
-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  price DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2),
  sku TEXT UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create inventory table
CREATE TABLE public.inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  current_stock INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER NOT NULL DEFAULT 0,
  max_stock INTEGER NOT NULL DEFAULT 100,
  reorder_point INTEGER NOT NULL DEFAULT 20,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(product_id)
);

-- Create sales table
CREATE TABLE public.sales (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  sale_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  customer_name TEXT,
  customer_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create stock movements table for tracking inventory changes
CREATE TABLE public.stock_movements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  movement_type TEXT NOT NULL CHECK (movement_type IN ('in', 'out', 'adjustment')),
  quantity INTEGER NOT NULL,
  reference_id UUID, -- Can reference sales.id or purchase orders
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users to access all data
CREATE POLICY "Authenticated users can view products" 
  ON public.products FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage products" 
  ON public.products FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view inventory" 
  ON public.inventory FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage inventory" 
  ON public.inventory FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view sales" 
  ON public.sales FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage sales" 
  ON public.sales FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view stock movements" 
  ON public.stock_movements FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage stock movements" 
  ON public.stock_movements FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insert sample products
INSERT INTO public.products (name, category, price, cost, sku, description) VALUES
('Women''s Denim Jeans', 'Clothing', 480.00, 200.00, 'WDJ001', 'Classic fit women''s denim jeans'),
('Cotton T-Shirt', 'Clothing', 160.00, 80.00, 'CTS001', 'Comfortable cotton t-shirt'),
('Leather Jacket', 'Clothing', 1200.00, 600.00, 'LJ001', 'Premium leather jacket'),
('Summer Dress', 'Clothing', 480.00, 240.00, 'SD001', 'Light summer dress'),
('Running Shoes', 'Footwear', 600.00, 300.00, 'RS001', 'Professional running shoes'),
('Casual Sneakers', 'Footwear', 640.00, 320.00, 'CS001', 'Comfortable casual sneakers'),
('Polo Shirt', 'Clothing', 200.00, 100.00, 'PS001', 'Classic polo shirt'),
('Denim Jacket', 'Clothing', 640.00, 320.00, 'DJ001', 'Stylish denim jacket'),
('Winter Coat', 'Clothing', 1200.00, 600.00, 'WC001', 'Warm winter coat'),
('Formal Suit', 'Clothing', 2400.00, 1200.00, 'FS001', 'Professional formal suit');

-- Insert sample inventory data
INSERT INTO public.inventory (product_id, current_stock, min_stock, max_stock, reorder_point) 
SELECT id, 
  CASE 
    WHEN name = 'Women''s Denim Jeans' THEN 45
    WHEN name = 'Cotton T-Shirt' THEN 78
    WHEN name = 'Leather Jacket' THEN 15
    WHEN name = 'Summer Dress' THEN 8
    WHEN name = 'Running Shoes' THEN 23
    WHEN name = 'Casual Sneakers' THEN 35
    WHEN name = 'Polo Shirt' THEN 52
    WHEN name = 'Denim Jacket' THEN 18
    WHEN name = 'Winter Coat' THEN 12
    WHEN name = 'Formal Suit' THEN 8
  END as current_stock,
  CASE 
    WHEN name IN ('Summer Dress', 'Leather Jacket') THEN 15
    WHEN name = 'Running Shoes' THEN 25
    ELSE 20
  END as min_stock,
  CASE 
    WHEN name = 'Cotton T-Shirt' THEN 120
    WHEN name = 'Running Shoes' THEN 100
    ELSE 80
  END as max_stock,
  CASE 
    WHEN name IN ('Summer Dress', 'Leather Jacket') THEN 15
    WHEN name = 'Running Shoes' THEN 25
    ELSE 20
  END as reorder_point
FROM public.products;

-- Insert sample sales data for the last 7 days
INSERT INTO public.sales (product_id, quantity, unit_price, total_amount, sale_date, customer_name)
SELECT 
  p.id,
  FLOOR(RANDOM() * 10 + 1)::INTEGER as quantity,
  p.price,
  p.price * FLOOR(RANDOM() * 10 + 1)::INTEGER as total_amount,
  NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 7),
  CASE FLOOR(RANDOM() * 5)
    WHEN 0 THEN 'John Doe'
    WHEN 1 THEN 'Jane Smith'
    WHEN 2 THEN 'Mike Johnson'
    WHEN 3 THEN 'Sarah Wilson'
    ELSE 'Alex Brown'
  END as customer_name
FROM public.products p
CROSS JOIN generate_series(1, 3) -- Generate 3 sales per product
WHERE RANDOM() > 0.3; -- Only create sales for about 70% of combinations

-- Function to update inventory when sales are made
CREATE OR REPLACE FUNCTION public.update_inventory_on_sale()
RETURNS TRIGGER AS $$
BEGIN
  -- Update inventory stock
  UPDATE public.inventory 
  SET current_stock = current_stock - NEW.quantity,
      updated_at = NOW()
  WHERE product_id = NEW.product_id;
  
  -- Record stock movement
  INSERT INTO public.stock_movements (product_id, movement_type, quantity, reference_id, notes)
  VALUES (NEW.product_id, 'out', NEW.quantity, NEW.id, 'Sale transaction');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update inventory on sales
CREATE TRIGGER on_sale_created
  AFTER INSERT ON public.sales
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_inventory_on_sale();

-- Function to get dashboard metrics
CREATE OR REPLACE FUNCTION public.get_dashboard_metrics()
RETURNS JSON AS $$
DECLARE
  total_products INTEGER;
  low_stock_items INTEGER;
  total_value DECIMAL;
  today_sales DECIMAL;
BEGIN
  -- Get total products
  SELECT COUNT(*) INTO total_products FROM public.products;
  
  -- Get low stock items
  SELECT COUNT(*) INTO low_stock_items 
  FROM public.inventory 
  WHERE current_stock <= reorder_point;
  
  -- Get total inventory value
  SELECT COALESCE(SUM(p.price * i.current_stock), 0) INTO total_value
  FROM public.products p
  JOIN public.inventory i ON p.id = i.product_id;
  
  -- Get today's sales
  SELECT COALESCE(SUM(total_amount), 0) INTO today_sales
  FROM public.sales 
  WHERE DATE(sale_date) = CURRENT_DATE;
  
  RETURN json_build_object(
    'total_products', total_products,
    'low_stock_items', low_stock_items,
    'total_value', total_value,
    'today_sales', today_sales
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
