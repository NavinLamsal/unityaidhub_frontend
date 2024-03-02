import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Send request to backend server without any query parameters
    const backendResponse = await fetch('http://localhost:8000/posts');
    const data = await backendResponse.json();

    // Filter the data as per your requirements
    // For example, filtering by category and status
    const { category, status } = req.query;
    let filteredData = data;
    if (category) {
      filteredData = filteredData.filter((post: any) => post.category === category);
    }
    if (status) {
      filteredData = filteredData.filter((post: any) => post.status === status);
    }
    // Return the filtered data to the client
    res.status(200).json(filteredData);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

