-- Clear existing data
DELETE FROM sales;
DELETE FROM inventory;  
DELETE FROM products;

-- Insert clothing products
INSERT INTO products (name, description, category, sku, price, cost) VALUES
('Cotton T-Shirt', 'Premium cotton crew neck t-shirt', 'Apparel', 'TSH001', 899, 450),
('Denim Jeans', 'Classic fit blue denim jeans', 'Bottoms', 'JNS001', 2499, 1200),
('Summer Dress', 'Floral print summer dress', 'Dresses', 'DRS001', 1999, 980),
('Running Shoes', 'Lightweight athletic running shoes', 'Footwear', 'SHO001', 4999, 2500),
('Leather Jacket', 'Genuine leather biker jacket', 'Outerwear', 'JKT001', 8999, 4500),
('Polo Shirt', 'Classic polo shirt with collar', 'Apparel', 'PLO001', 1299, 650),
('Cargo Pants', 'Multi-pocket cargo pants', 'Bottoms', 'CRG001', 1899, 950),
('Sneakers', 'Casual canvas sneakers', 'Footwear', 'SNK001', 2999, 1500);

-- Insert inventory records for clothing
INSERT INTO inventory (product_id, current_stock, min_stock, max_stock, reorder_point, location) VALUES
((SELECT id FROM products WHERE sku = 'TSH001'), 120, 30, 300, 50, 'Main Warehouse'),
((SELECT id FROM products WHERE sku = 'JNS001'), 85, 20, 200, 35, 'Main Warehouse'),
((SELECT id FROM products WHERE sku = 'DRS001'), 45, 15, 150, 25, 'Main Warehouse'),
((SELECT id FROM products WHERE sku = 'SHO001'), 60, 15, 120, 25, 'Main Warehouse'),
((SELECT id FROM products WHERE sku = 'JKT001'), 25, 8, 80, 15, 'Main Warehouse'),
((SELECT id FROM products WHERE sku = 'PLO001'), 95, 25, 250, 40, 'Main Warehouse'),
((SELECT id FROM products WHERE sku = 'CRG001'), 70, 18, 180, 30, 'Main Warehouse'),
((SELECT id FROM products WHERE sku = 'SNK001'), 110, 25, 220, 45, 'Main Warehouse');

-- Insert sample sales data for clothing items (last 7 days)
INSERT INTO sales (product_id, quantity, unit_price, total_amount, sale_date, customer_name, customer_email) VALUES
-- Day 1 sales
((SELECT id FROM products WHERE sku = 'TSH001'), 15, 899, 13485, NOW() - INTERVAL '1 day', 'Priya Sharma', 'priya@email.com'),
((SELECT id FROM products WHERE sku = 'JNS001'), 8, 2499, 19992, NOW() - INTERVAL '1 day', 'Rahul Gupta', 'rahul@email.com'),
((SELECT id FROM products WHERE sku = 'SNK001'), 12, 2999, 35988, NOW() - INTERVAL '1 day', 'Anita Patel', 'anita@email.com'),

-- Day 2 sales
((SELECT id FROM products WHERE sku = 'DRS001'), 6, 1999, 11994, NOW() - INTERVAL '2 days', 'Meera Singh', 'meera@email.com'),
((SELECT id FROM products WHERE sku = 'PLO001'), 10, 1299, 12990, NOW() - INTERVAL '2 days', 'Arjun Kumar', 'arjun@email.com'),
((SELECT id FROM products WHERE sku = 'TSH001'), 20, 899, 17980, NOW() - INTERVAL '2 days', 'Kavya Reddy', 'kavya@email.com'),

-- Day 3 sales
((SELECT id FROM products WHERE sku = 'SHO001'), 4, 4999, 19996, NOW() - INTERVAL '3 days', 'Vikram Joshi', 'vikram@email.com'),
((SELECT id FROM products WHERE sku = 'CRG001'), 7, 1899, 13293, NOW() - INTERVAL '3 days', 'Deepika Nair', 'deepika@email.com'),
((SELECT id FROM products WHERE sku = 'JNS001'), 5, 2499, 12495, NOW() - INTERVAL '3 days', 'Rohit Agarwal', 'rohit@email.com'),

-- Day 4 sales
((SELECT id FROM products WHERE sku = 'JKT001'), 2, 8999, 17998, NOW() - INTERVAL '4 days', 'Sanya Kapoor', 'sanya@email.com'),
((SELECT id FROM products WHERE sku = 'TSH001'), 18, 899, 16182, NOW() - INTERVAL '4 days', 'Karan Malhotra', 'karan@email.com'),
((SELECT id FROM products WHERE sku = 'SNK001'), 9, 2999, 26991, NOW() - INTERVAL '4 days', 'Pooja Verma', 'pooja@email.com'),

-- Day 5 sales
((SELECT id FROM products WHERE sku = 'DRS001'), 8, 1999, 15992, NOW() - INTERVAL '5 days', 'Amit Chopra', 'amit@email.com'),
((SELECT id FROM products WHERE sku = 'PLO001'), 14, 1299, 18186, NOW() - INTERVAL '5 days', 'Neha Sood', 'neha@email.com'),
((SELECT id FROM products WHERE sku = 'CRG001'), 6, 1899, 11394, NOW() - INTERVAL '5 days', 'Ravi Bhatt', 'ravi@email.com'),

-- Day 6 sales
((SELECT id FROM products WHERE sku = 'SHO001'), 3, 4999, 14997, NOW() - INTERVAL '6 days', 'Isha Mehta', 'isha@email.com'),
((SELECT id FROM products WHERE sku = 'JNS001'), 7, 2499, 17493, NOW() - INTERVAL '6 days', 'Suresh Yadav', 'suresh@email.com'),
((SELECT id FROM products WHERE sku = 'TSH001'), 22, 899, 19778, NOW() - INTERVAL '6 days', 'Divya Bansal', 'divya@email.com'),

-- Day 7 sales
((SELECT id FROM products WHERE sku = 'JKT001'), 1, 8999, 8999, NOW() - INTERVAL '7 days', 'Ajay Saxena', 'ajay@email.com'),
((SELECT id FROM products WHERE sku = 'SNK001'), 11, 2999, 32989, NOW() - INTERVAL '7 days', 'Ritika Goel', 'ritika@email.com'),
((SELECT id FROM products WHERE sku = 'PLO001'), 13, 1299, 16887, NOW() - INTERVAL '7 days', 'Nikhil Shah', 'nikhil@email.com');