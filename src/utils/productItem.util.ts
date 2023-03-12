export function queryProductItem(query: any): Object{
  const { source_id, lab_id, products_id } = query
  let result = {}
  if (source_id){
    result = {...result, source_id: Number(source_id)}
  }
  if (lab_id){
    result = {...result, lab_id: Number(lab_id)}
  }
  if (products_id){
    result = {...result, products_id: Number(products_id)}
  }
  return result
}
