// export type Posts = {
//     id: number;
//     title: string;
//     description: string;
//     startDate?: Date | null;
//     endDate?: Date | null;
//     goalAmount: string; // This might need to be converted to a numeric type depending on how it's used
//     currentAmount: string | null;
//     image: string[];
//     view: number | null;
//     status: 'VERIFIED' | 'NOTVERIFIED'; // Add more status values if necessary
//     postType: 'BASIC' | 'URGENT'; // Add more post types if necessary
//     postUpdates?: string | null;
//     country: string;
//     createdAt: Date;
//     updatedAt: Date;
//     documents?: string[]; // Assuming these are URLs to documents
//     categoryId: number;
//     userId: number;
//     donations?: any[]; // Define a proper type for donations if needed
//     comments?: any[];
    
// }
export type Posts = {
  id: number;
  title: string;
  description: string;
  startDate?: Date | null;
  endDate?: Date | null;
  goalAmount: string; 
  currentAmount: number | null; // Updated to numeric type
  image: string[];
  view: number | null;
  status: 'VERIFIED' | 'NOTVERIFIED'; 
  postType: 'BASIC' | 'URGENT'; 
  postUpdates?: string | null;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  documents?: string[]; // Assuming these are URLs to documents
  categoryId: number;
  userId: number;
  User: {
      id: number;
      name: string;
  };
  donations?: Donation[] | []; // Define a proper type for donations if needed
  comments?: any[];
}

type Donation = {
  amount: number;
  User: {
      name: string;
  };
};