export function FormError({ error }: { error?: string }) {
  return error && <div className="text-red-600 text-xs">{error}</div>;
}
