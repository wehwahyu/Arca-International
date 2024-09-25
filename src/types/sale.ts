import {Product} from "/@/types/product";

export interface Sales {
    items: Array<SaleItem>;
    totalPrice: number;
    totalQty: number;
    totalProduct: number;
    createdAt: Date;
}

export interface SaleItem {
    no: number;
    product: Product;
    productId: number;
    qty: number;
    price: number;
    totalPrice: number;
}
