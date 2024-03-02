'use server'

// async function fetchPosts() {
//     try {
//       // Make a GET request to the API route
//       const response = await fetch('/api/posts');
//       if (!response.ok) {
//         throw new Error('Failed to fetch posts');
//       }
//       const data = await response.json();
//       setPosts(data); // Set the fetched posts in state
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       // Handle the error if needed
//     }
//   }

  export async function fetchPost(
    category: string = "",
    status: string = "",
    sortBy: string = "",
    page: number = 1
  ) {
    try {
      const data = await fetch("/api/posts").then(
        (res) => res.json()
      );
      return data;
    } catch (error) {
      return { error: error };
    }
  }