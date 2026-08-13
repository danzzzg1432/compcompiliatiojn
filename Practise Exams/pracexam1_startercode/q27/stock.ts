let inventory = [];

/**
 * Find a product with the given name in inventory
 * @param {string} productName - The name of the product
 * @returns {?} If the product exists, it returns the product object that includes
 * productId(number), name(string), price(number) and inStock(boolean).
 */
export function findProduct(productName: number) {
  return inventory.find((i) => i.name === productName);
}

/**
 * Add a new product to inventory list.
 * @param {Product Object} cart - The cart is the product object
 * - Product object includes name(string) and price(number) values.
 * @returns {productId Object} - returns the productId as the number in the object
 */
export function addProduct(product): string {
  if (findProduct(product.name)) {
    return { error: 'Product already exists' };
  }

  const productId = inventory.length + 1;
  const newProduct = {
    productId: productId,
    name: product.name,
    price: product.price,
    inStock: true
  };
  inventory.push(newProduct);
  return { productId: productId };
}

/**
 * Update stock status of a product
 * @param {number} productId - the id of product
 * @param {boolean} stockStatus - the status of product stock to be updated
 * @returns {} - empty object
 */
export function updateStock(productId, stockStatus){
  const prod = inventory.find((i) => i.productId === productId);
  if (!prod) {
    return { error: 'Invalid product Id' };
  }
  prod.inStock = stockStatus;
  return {};
}

/**
 * clear the inventory list
 * @returns {}
 */
export function clear() {
  inventory = [];
  return {};
}