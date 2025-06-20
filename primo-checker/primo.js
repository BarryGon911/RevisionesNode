export function esPrimo(n) {
  if (n <= 1) return false;

  const limite = Math.sqrt(n);
  for (let i = 2; i <= limite; i++) {
    if (n % i === 0) return false;
  }
  return true;
}
