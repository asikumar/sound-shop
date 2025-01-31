mysql -h vibestore-aws-db.cd8kmmac82wg.ap-south-1.rds.amazonaws.com -u vibestoreadmin -p

mysql -h vibestore-dev-db.cd8kmmac82wg.ap-south-1.rds.amazonaws.com -u vibestoreadmin -p
-- Add a users table to manage users (for the sake of example, we will use basic user info)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255)
);
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imageurl VARCHAR(255),
    name VARCHAR(255),
    description TEXT,
    cost DECIMAL(10, 2)
);

-- Modify the cart table to include user_id (to associate cart items with users)
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create an orders table to store completed orders
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_cost DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create a table for order details to store each product in the order
CREATE TABLE order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    cost DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);