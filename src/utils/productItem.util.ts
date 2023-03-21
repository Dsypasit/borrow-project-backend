export function queryProductItem(query: any): object {
  const { sourceId, roomId, productId, categoryId } = query;
  let result = {};
  if (sourceId) {
    result = { ...result, sourceId: sourceId };
  }
  if (roomId) {
    result = { ...result, roomId: roomId };
  }
  if (categoryId) {
    result = {
      ...result,
      product: {
        categoryId: categoryId,
      },
    };
  }
  if (productId) {
    result = { ...result, productId: productId };
  }
  return result;
}
