-- First, let's check if we already have products and clear any existing data
DELETE FROM sales;
DELETE FROM inventory;  
DELETE FROM products;

-- Insert sample products with explicit values
INSERT INTO products (name, description, category, sku, price, cost) VALUES
('Laptop Computer', 'High-performance laptop for business use', 'Electronics', 'LAP001', 75000, 60000),
('Wireless Mouse', 'Ergonomic wireless mouse with USB receiver', 'Electronics', 'MOU001', 2500, 1800),
('Office Chair', 'Comfortable ergonomic office chair', 'Furniture', 'CHR001', 15000, 12000),
('Desk Lamp', 'LED desk lamp with adjustable brightness', 'Furniture', 'LAM001', 3500, 2500),
('Smartphone', 'Latest model smartphone with advanced features', 'Electronics', 'PHN001', 45000, 35000);

-- Insert inventory records with explicit product IDs
INSERT INTO inventory (product_id, current_stock, min_stock, max_stock, reorder_point, location) VALUES
((SELECT id FROM products WHERE sku = 'LAP001'), 25, 10, 100, 15, 'Main Warehouse'),
((SELECT id FROM products WHERE sku = 'MOU001'), 150, 50, 500, 75, 'Main Warehouse'),
((SELECT id FROM products WHERE sku = 'CHR001'), 8, 5, 50, 8, 'Main Warehouse'),
((SELECT id FROM products WHERE sku = 'LAM001'), 45, 20, 200, 30, 'Main Warehouse'),
((SELECT id FROM products WHERE sku = 'PHN001'), 30, 15, 150, 20, 'Main Warehouse');

-- Insert sample sales data for the last 7 days
INSERT INTO sales (product_id, quantity, unit_price, total_amount, sale_date, customer_name, customer_email) VALUES
((SELECT id FROM products WHERE sku = 'LAP001'), 2, 75000, 150000, NOW() - INTERVAL '1 day', 'John Smith', 'john@email.com'),
((SELECT id FROM products WHERE sku = 'MOU001'), 10, 2500, 25000, NOW() - INTERVAL '1 day', 'Sarah Johnson', 'sarah@email.com'),
((SELECT id FROM products WHERE sku = 'CHR001'), 1, 15000, 15000, NOW() - INTERVAL '2 days', 'Mike Brown', 'mike@email.com'),
((SELECT id FROM products WHERE sku = 'LAM001'), 5, 3500, 17500, NOW() - INTERVAL '2 days', 'Lisa Davis', 'lisa@email.com'),
((SELECT id FROM products WHERE sku = 'PHN001'), 3, 45000, 135000, NOW() - INTERVAL '3 days', 'Tom Wilson', 'tom@email.com'),
((SELECT id FROM products WHERE sku = 'LAP001'), 1, 75000, 75000, NOW() - INTERVAL '4 days', 'Anna Lee', 'anna@email.com'),
((SELECT id FROM products WHERE sku = 'MOU001'), 8, 2500, 20000, NOW() - INTERVAL '5 days', 'James Miller', 'james@email.com'),
((SELECT id FROM products WHERE sku = 'PHN001'), 2, 45000, 90000, NOW() - INTERVAL '6 days', 'Emily Chen', 'emily@email.com'),
((SELECT id FROM products WHERE sku = 'LAM001'), 3, 3500, 10500, NOW() - INTERVAL '7 days', 'Robert Taylor', 'robert@email.com');