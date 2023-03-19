export function queryProductItem(query: any): object {
  const { sourceId, roomId, productId, categoryId } = query;
  let result = {};
  if (sourceId) {
    result = { ...result, sourceId: Number(sourceId) };
  }
  if (roomId) {
    result = { ...result, roomId: Number(roomId) };
  }
  if (categoryId) {
    result = {
      ...result,
      product: {
        categoryId: Number(categoryId),
      },
    };
  }
  if (productId) {
    result = { ...result, productId: Number(productId) };
  }
  return result;
}
