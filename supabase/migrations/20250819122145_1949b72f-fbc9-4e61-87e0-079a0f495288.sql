-- Insert sample products
INSERT INTO products (name, description, category, sku, price, cost) VALUES
('Laptop Computer', 'High-performance laptop for business use', 'Electronics', 'LAP001', 75000, 60000),
('Wireless Mouse', 'Ergonomic wireless mouse with USB receiver', 'Electronics', 'MOU001', 2500, 1800),
('Office Chair', 'Comfortable ergonomic office chair', 'Furniture', 'CHR001', 15000, 12000),
('Desk Lamp', 'LED desk lamp with adjustable brightness', 'Furniture', 'LAM001', 3500, 2500),
('Smartphone', 'Latest model smartphone with advanced features', 'Electronics', 'PHN001', 45000, 35000);

-- Insert sample inventory for these products
INSERT INTO inventory (product_id, current_stock, min_stock, max_stock, reorder_point, location) 
SELECT 
  p.id,
  CASE 
    WHEN p.name = 'Laptop Computer' THEN 25
    WHEN p.name = 'Wireless Mouse' THEN 150
    WHEN p.name = 'Office Chair' THEN 8
    WHEN p.name = 'Desk Lamp' THEN 45
    WHEN p.name = 'Smartphone' THEN 30
  END as current_stock,
  CASE 
    WHEN p.name = 'Laptop Computer' THEN 10
    WHEN p.name = 'Wireless Mouse' THEN 50
    WHEN p.name = 'Office Chair' THEN 5
    WHEN p.name = 'Desk Lamp' THEN 20
    WHEN p.name = 'Smartphone' THEN 15
  END as min_stock,
  CASE 
    WHEN p.name = 'Laptop Computer' THEN 100
    WHEN p.name = 'Wireless Mouse' THEN 500
    WHEN p.name = 'Office Chair' THEN 50
    WHEN p.name = 'Desk Lamp' THEN 200
    WHEN p.name = 'Smartphone' THEN 150
  END as max_stock,
  CASE 
    WHEN p.name = 'Laptop Computer' THEN 15
    WHEN p.name = 'Wireless Mouse' THEN 75
    WHEN p.name = 'Office Chair' THEN 8
    WHEN p.name = 'Desk Lamp' THEN 30
    WHEN p.name = 'Smartphone' THEN 20
  END as reorder_point,
  'Main Warehouse' as location
FROM products p;

-- Insert sample sales data for the last 30 days
INSERT INTO sales (product_id, quantity, unit_price, total_amount, sale_date, customer_name, customer_email)
SELECT 
  p.id,
  CASE 
    WHEN p.name = 'Laptop Computer' THEN (random() * 5 + 1)::integer
    WHEN p.name = 'Wireless Mouse' THEN (random() * 15 + 5)::integer
    WHEN p.name = 'Office Chair' THEN (random() * 3 + 1)::integer
    WHEN p.name = 'Desk Lamp' THEN (random() * 8 + 2)::integer
    WHEN p.name = 'Smartphone' THEN (random() * 6 + 2)::integer
  END as quantity,
  p.price as unit_price,
  CASE 
    WHEN p.name = 'Laptop Computer' THEN p.price * (random() * 5 + 1)::integer
    WHEN p.name = 'Wireless Mouse' THEN p.price * (random() * 15 + 5)::integer
    WHEN p.name = 'Office Chair' THEN p.price * (random() * 3 + 1)::integer
    WHEN p.name = 'Desk Lamp' THEN p.price * (random() * 8 + 2)::integer
    WHEN p.name = 'Smartphone' THEN p.price * (random() * 6 + 2)::integer
  END as total_amount,
  (NOW() - INTERVAL '1 day' * floor(random() * 30)) as sale_date,
  CASE 
    WHEN random() < 0.2 THEN 'John Smith'
    WHEN random() < 0.4 THEN 'Sarah Johnson'
    WHEN random() < 0.6 THEN 'Mike Brown'
    WHEN random() < 0.8 THEN 'Lisa Davis'
    ELSE 'Tom Wilson'
  END as customer_name,
  CASE 
    WHEN random() < 0.2 THEN 'john.smith@email.com'
    WHEN random() < 0.4 THEN 'sarah.johnson@email.com'
    WHEN random() < 0.6 THEN 'mike.brown@email.com'
    WHEN random() < 0.8 THEN 'lisa.davis@email.com'
    ELSE 'tom.wilson@email.com'
  END as customer_email
FROM products p, generate_series(1, 20);

-- Create the dashboard metrics function
CREATE OR REPLACE FUNCTION get_dashboard_metrics()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_products', (SELECT COUNT(*) FROM products),
    'low_stock_items', (SELECT COUNT(*) FROM inventory WHERE current_stock <= min_stock),
    'total_value', (SELECT COALESCE(SUM(p.price * i.current_stock), 0) FROM products p JOIN inventory i ON p.id = i.product_id),
    'today_sales', (SELECT COALESCE(SUM(total_amount), 0) FROM sales WHERE DATE(sale_date) = CURRENT_DATE)
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;