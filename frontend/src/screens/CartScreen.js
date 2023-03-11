import React from 'react'
import { useLocation, useParams } from 'react-router-dom';

export default function CartScreen() {
    const params = useParams();
    const { id: productId } = params;
    const { search } = useLocation();
    const qtyInUrl = new URLSearchParams(search).get('qty');
    const qty = qtyInUrl ? Number(qtyInUrl) : 1;
    return (
        <div>
            <h1>Cart Screen</h1>
            <p>ADD TO CART: ProductID : {productId} Qty: {qty}</p>
        </div>
    )
}
