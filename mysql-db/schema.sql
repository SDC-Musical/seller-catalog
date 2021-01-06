CREATE DATABASE IF NOT EXISTS buying_options;

USE buying_options;

CREATE TABLE prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  seller INT NOT NULL REFERENCES sellers(id),
  price DECIMAL(4,2) NOT NULL,
  tax DECIMAL(4,2) NOT NULL,
  INDEX (product_id)
);

CREATE TABLE sellers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seller_name TEXT NOT NULL,
  return_policy TEXT DEFAULT NULL,
  delivery_free TINYINT NOT NULL,
  delivery_min INT NOT NULL,
  delivery_days INT NOT NULL,
  delivery_fee INT NOT NULL
);