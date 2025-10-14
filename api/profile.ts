import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const profile = await storage.getProfile();

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Set cache headers for better performance
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes
    res.setHeader('ETag', `"profile-${Date.now()}"`);

    return res.status(200).json(profile);
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return res.status(500).json({ message: 'Failed to fetch profile' });
  }
}
