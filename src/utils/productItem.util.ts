export function queryProductItem(query: any): Object{
  const { sourceId, roomId, productId } = query
  let result = {}
  if (sourceId){
    result = {...result, sourceId: Number(sourceId)}
  }
  if (roomId){
    result = {...result, roomId: Number(roomId)}
  }
  if (productId){
    result = {...result, productId: Number(productId)}
  }
  return result;
}
