export type ProductModel = {
    id: string,
    name: string,
    description: string,
    imageURL: string | null,
    categoryID: string | null,
    price: number,
    stock: number
};