export type Posts = {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string,
    goalAmount: number,
    currentAmount: number,
    image: string[];
    view?: number,
    status: string;
    postType: string;
    postUpdates?: string[],
    country: string,
    createdAt: string,
    updatedAt: string,
    documents?: string[];
    categoryId: number;
    userId: number;
    comments?: any[]
  };