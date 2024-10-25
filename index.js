import Fastify from 'fastify';
import fastifyMySQL from '@fastify/mysql';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const fastify = Fastify({ logger: true });

// Register MySQL plugin with promise support
fastify.register(fastifyMySQL, {
  connectionString: process.env.DB_CONNECTION_STRING,
  promise: true  // Enable promise support
});

// Create Product
fastify.post('/products', async (request, reply) => {
  const { name, description, price, stock } = request.body;
  const [result] = await fastify.mysql.query(
    'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
    [name, description, price, stock || 0]
  );
  return { product_id: result.insertId };
});

// Read All Products
fastify.get('/products', async (request, reply) => {
  const [rows] = await fastify.mysql.query('SELECT * FROM products');
  return rows;
});

// Read Single Product by ID
fastify.get('/products/:id', async (request, reply) => {
  const { id } = request.params;
  const [rows] = await fastify.mysql.query('SELECT * FROM products WHERE product_id = ?', [id]);
  if (rows.length === 0) {
    return reply.status(404).send({ message: 'Product not found' });
  }
  return rows[0];
});

// Update Product by ID
fastify.put('/products/:id', async (request, reply) => {
  const { id } = request.params;
  const { name, description, price, stock } = request.body;
  const [result] = await fastify.mysql.query(
    'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE product_id = ?',
    [name, description, price, stock, id]
  );
  if (result.affectedRows === 0) {
    return reply.status(404).send({ message: 'Product not found' });
  }
  return { message: 'Product updated successfully' };
});

// Delete Product by ID
fastify.delete('/products/:id', async (request, reply) => {
  const { id } = request.params;
  const [result] = await fastify.mysql.query('DELETE FROM products WHERE product_id = ?', [id]);
  if (result.affectedRows === 0) {
    return reply.status(404).send({ message: 'Product not found' });
  }
  return { message: 'Product deleted successfully' };
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

