import {Product} from "/@/types/product";

export interface Sales {
    id: string;
    no: number;
    items: Array<SaleItem>;
    totalPrice: number;
    totalQty: number;
    totalProduct: number;
    createdAt: Date;
}

export interface SaleItem {
    id: string;
    no: number;
    product: Product;
    productId: number;
    qty: number;
    price: number;
    totalPrice: number;
}
