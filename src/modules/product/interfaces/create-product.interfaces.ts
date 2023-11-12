export declare interface CreateProductRequest {
  title: string;
  images: string[];
  rating?: number;
  count: number;
  description: string;
  price: number;
  sale?: number;
  categoryId: string;
}
