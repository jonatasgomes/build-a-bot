export function toCurrency(amount) {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function toShortDate() {
  return '';
}
