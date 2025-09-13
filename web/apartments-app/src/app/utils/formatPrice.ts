export function formatPrice(price: unknown): string {
  if (typeof price === 'number' && isFinite(price) && price > 0) {
    return price.toLocaleString('en-EG', { maximumFractionDigits: 0 }) + ' EGP';
  }
  if (typeof price === 'string' && price.trim() !== '') {
    const num = Number(price);
    if (!isNaN(num) && isFinite(num) && num > 0) {
      return num.toLocaleString('en-EG', { maximumFractionDigits: 0 }) + ' EGP';
    }
  }
  return '';
}
