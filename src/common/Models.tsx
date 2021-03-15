export type ProductModel = {
    id: string,
    name: string,
    description: string,
    imageURL: string | null,
    categoryID: string | null,
    price: number,
    stock: number
};

export type CategoryModel = {
    id: string,
    name: string
};

export type UserModel = {
    id: string,
    name: string,
    username: string,
    email: string,
    address: string,
    phoneNumber: string
};

export type OrderProductModel = {
    product: ProductModel,
    amount: number
};

export type OrderModel = {
    id: string,
    date: Date,
    products: OrderProductModel[]
};
