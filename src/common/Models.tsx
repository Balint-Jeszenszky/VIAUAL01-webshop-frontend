type PriceModel = {
    [key: string]: number
}

export type ProductModel = {
    id: string,
    name: string,
    description: string,
    imageURL: string,
    categoryID: string,
    price: PriceModel,
    stock: number,
    recommended: boolean
};

type Order = {
    id: string,
    date: Date
}

export type CategoryModel = {
    id: string,
    name: string,
    productNumber: number
};

export type ListItem = {
    product: ProductModel,
    amount: number
};

export type UserModel = {
    id: string,
    name: string,
    username: string,
    email: string,
    address: string,
    phoneNumber: string,
    orders: Order[],
    cart: ListItem[],
    role: 'ADMIN' | 'USER'
};

export type UserData = {
    userId: string,
    name: string,
    email: string,
    address: string,
    phoneNumber: string,
    oldPassword?: string,
    newPassword?: string,
    confirmPassword?: string
}

type MapsAPIModel = {
    APIKey?: string,
    coords: { lng: number, lat: number }
}

export type OrderModel = {
    id: string,
    date: Date,
    products: ListItem[],
    currency: string,
    mapsAPI: MapsAPIModel | undefined
};

export type CompanyModel = {
    name: string, 
    id: string, 
    accessToken: string
};
