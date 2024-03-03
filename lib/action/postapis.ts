'use server'

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