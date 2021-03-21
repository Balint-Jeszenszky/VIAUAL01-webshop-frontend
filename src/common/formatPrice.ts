export default function formatPrice(price: number) {
    return parseFloat(price.toFixed(3)).toLocaleString();
}
