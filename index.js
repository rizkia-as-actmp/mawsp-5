import Fastify from 'fastify';
import fastifyMySQL from '@fastify/mysql';
import dotenv from 'dotenv';

// Me-load config dari file .env
dotenv.config();

const fastify = Fastify({ logger: true });

// Me-register plugin MySQL agar bisa diakses melalui fastify
fastify.register(fastifyMySQL, {
  connectionString: process.env.DB_CONNECTION_STRING,
  promise: true  // Enable promise support
});

// Mendeklarasi sebuah route dengan method POST untuk melakukan create product
fastify.post('/products', async (request, reply) => {
  const { name, description, price, stock } = request.body;
  const [result] = await fastify.mysql.query(
    'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
    [name, description, price, stock || 0]
  );
  return { product_id: result.insertId };
});

// Mendeklarasi sebuah route dengan method GET untuk mendapatkan data list product
fastify.get('/products', async (request, reply) => {
  // Melalui object fastify, kita akses fungsi dari MYSQL agar bisa mengeksekusi db query.
  const [rows] = await fastify.mysql.query('SELECT * FROM products');
  // Mengembalikan list product yang didapatkan dari database kepada client melalui response http.
  return rows;
});

// Mengambil data sebuah product berdasarkan id nya melalui route params
fastify.get('/products/:id', async (request, reply) => {
  // Mengambil Id yang ada pada route params yang dikirim client
  const { id } = request.params;
  const [rows] = await fastify.mysql.query('SELECT * FROM products WHERE product_id = ?', [id]);
  if (rows.length === 0) {
    // Mengembalikan status 404 kepada client jika product tidak ditemukan.
    return reply.status(404).send({ message: 'Product not found' });
  }
  return rows[0];
});

// Update Product berdasarkan ID
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

// Hapus Product berdasarkan ID
fastify.delete('/products/:id', async (request, reply) => {
  const { id } = request.params;
  const [result] = await fastify.mysql.query('DELETE FROM products WHERE product_id = ?', [id]);
  if (result.affectedRows === 0) {
    return reply.status(404).send({ message: 'Product not found' });
  }
  return { message: 'Product deleted successfully' };
});

// Menjalankan server server pada port 3000
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

