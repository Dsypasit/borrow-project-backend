export function queryProductItem(query: any): object {
  const { sourceId, roomId, productId } = query;
  let result = {};
  if (sourceId) {
    result = { ...result, source_id: Number(sourceId) };
  }
  if (roomId) {
    result = { ...result, lab_id: Number(roomId) };
  }
  if (productId) {
    result = { ...result, products_id: Number(productId) };
  }
  return result;
}
