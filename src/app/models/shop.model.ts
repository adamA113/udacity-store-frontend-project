export type ProductModel = {
    id: number;
    name: string;
    price: number;
    url: string;
    description: string;
    quantity?: number;
};

export type CartModel = {
    product: ProductModel;
    quantity: number;
};