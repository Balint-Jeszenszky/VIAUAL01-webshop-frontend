export default function formatPrice(price: number) {
    return parseFloat(price.toFixed(2)).toLocaleString();
}
