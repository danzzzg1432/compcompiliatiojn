import { describe, test, expect, beforeEach } from 'vitest';
import { findProduct, addProduct, updateStock, clear } from './stock.ts';

const product1 = { name: "Laptop", price: 1200 };

beforeEach(() => {
  clear();
});

describe('findProduct()', () => {
  test('success > returns the right product if it exists', () => {
    addProduct(product1);
    expect(findProduct('Laptop')).toStrictEqual({
      productId: expect.any(Number),
      name: "Laptop",
      price: 1200,
      inStock: true
    });
  });

  test('error > returns undefined for empty product name', () => {
    expect(findProduct('')).toBeUndefined();
  });

  test('error > returns undefined for invalid product name', () => {
    addProduct(product1);
    expect(findProduct('Desktop')).toBeUndefined();
  });
});

describe('addProduct()', () => {
  test('success > returns the productId if success', () => {
    expect(addProduct(product1)).toStrictEqual({
      productId: expect.any(Number)
    });
  });

  test('error > returns error for existing product name', () => {
    addProduct(product1);
    expect(addProduct(product1)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('updateStock()', () => {
  let productId1: { productId: number };
  beforeEach(() => {
    productId1 = addProduct(product1) as { productId: number };
  })

  test('success > returns the productId if success', () => {
    expect(updateStock(productId1.productId, false)).toStrictEqual({});
  });

  test('error > returns error for invalid product id', () => {
    expect(updateStock(productId1.productId + 1, false)).toStrictEqual({ error: expect.any(String) });
  });
});