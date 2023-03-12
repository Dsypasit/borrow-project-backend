export function queryProductItem(query: any): object {
  const { sourceId, labId, productId } = query;
  let result = {};
  if (sourceId) {
    result = { ...result, source_id: Number(sourceId) };
  }
  if (labId) {
    result = { ...result, lab_id: Number(labId) };
  }
  if (productId) {
    result = { ...result, products_id: Number(productId) };
  }
  return result;
}
