// X-Developer: Shashwat
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('X-Developer', 'Shashwat');
  res.status(200).json({ message: 'API response with developer credit.' });
}
