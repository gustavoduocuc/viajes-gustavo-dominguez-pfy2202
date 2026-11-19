const maxFractionDigits = 0;

export function formatPrice(amount, currency) {
  return new Intl.NumberFormat('es', { style: 'currency', currency, maximumFractionDigits: maxFractionDigits }).format(
    amount
  );
}
