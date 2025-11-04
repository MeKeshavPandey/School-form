import pool from '../../lib/db';
import upload from '../../lib/multer';
import { runMiddleware } from '../../lib/middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Run multer middleware
      await runMiddleware(req, res, upload.single('image'));

      const { name, address, city, state, contact, email } = req.body;
      const image = null; // Temporarily disable image saving


      // Validate required fields
      if (!name || !address || !city || !state || !contact || !email) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Insert into database
      const [result] = await pool.query(
        'INSERT INTO schools (name, address, city, state, contact, email, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, address, city, state, contact, email, image]
      );

      res.status(201).json({
        message: 'School added successfully',
        schoolId: result.insertId
      });
    } catch (error) {
      console.error('Error adding school:', error);
      res.status(500).json({ error: 'Failed to add school', details: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM schools ORDER BY created_at DESC');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching schools:', error);
      res.status(500).json({ error: 'Failed to fetch schools' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
