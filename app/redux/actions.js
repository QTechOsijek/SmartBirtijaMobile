import { ADD_CATALOG, ADD_ITEM } from './types';

export function addCatalog(catalog) {
  console.log(catalog);
  return {
    type: ADD_CATALOG,
    payload: catalog,
  };
}

export function addItem(item, quantity) {
  console.log(item);
  return {
    type: ADD_ITEM,
    item,
    quantity,
  };
}
