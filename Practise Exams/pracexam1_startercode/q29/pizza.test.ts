import { describe, test, expect, beforeEach } from 'vitest';
import request from 'sync-request-curl';
import config from './config.json' with { type: "json" };
import { PizzaSize } from './dataStore.ts';

const SERVER_URL = `${config.url}:${config.port}`;

export function deleteRequest() {
  const res = request('DELETE', SERVER_URL + '/clear');

  return {
    status: res.statusCode,
    body: res.getJSON(),
  };
}

export function addNewPizzaRequest(name: string, size: PizzaSize, price: number) {
  const res = request('POST', SERVER_URL + '/pizza/add', {
    json: {
      name,
      size,
      price
    }
  });

  return {
    status: res.statusCode,
    body: res.getJSON(),
  };
}

export function getPizzasByPriceRequest(price: number) {
  const res = request('GET', SERVER_URL + '/pizza/filter', {
    qs: {
      price
    }
  });

  return {
    status: res.statusCode,
    body: res.getJSON(),
  };
}

export function getPizzasByIdsRequest(pizzaIds: string) {
  const res = request('GET', SERVER_URL + '/pizza/list', {
    qs: {
      pizzaIds
    }
  });

  return {
    status: res.statusCode,
    body: res.getJSON(),
  };
}

export function updatePizzaPriceByIdRequest(role: string, pizzaId: number, price: number) {
  const res = request('PUT', SERVER_URL + `/pizza/${pizzaId}`, {
    headers: {
      role: role
    },
    json: {
      price
    }
  });

  return {
    status: res.statusCode,
    body: res.getJSON(),
  };
}

export function updateAllPizzaPricesRequest(role: string, increaseAmount: number) {
  const res = request('PUT', SERVER_URL + '/pizza/all', {
    headers: {
      role: role
    },
    json: {
      increaseAmount
    }
  });

  return {
    status: res.statusCode,
    body: res.getJSON(),
  };
}

const pizzaName1 = "Margherita";
const pizzaName2 = "Meat Lovers";
const small = "Small";
const medium = "Medium";
const large = "Large";

beforeEach(() => {
  deleteRequest();
});

// '/pizza/add'
describe ('addNewPizza', () => {
  describe('errors', () => {
    test('Pizza name is empty', () => {
      const { status, body } = addNewPizzaRequest('', small, 10);
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_PIZZA_NAME',
        message: expect.any(String)
      });
    });

    test('Pizza name is shorter than 3', () => {
      const { status, body } = addNewPizzaRequest('', small, 2);
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_PIZZA_NAME',
        message: expect.any(String)
      });
    });

    test('Pizza name is longer than 20', () => {
      const name = 'p'.repeat(21);
      const { status, body } = addNewPizzaRequest(name, small, 2);
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_PIZZA_NAME',
        message: expect.any(String)
      });
    });

    test('Pizza price is less than 10', () => {
      const { status, body } = addNewPizzaRequest(pizzaName2, small, 9);
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_PIZZA_PRICE',
        message: expect.any(String)
      });
    });

    test('Pizza price is greater than 50', () => {
      const { status, body } = addNewPizzaRequest(pizzaName2, small, 51);
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_PIZZA_PRICE',
        message: expect.any(String)
      });
    });

    test('Pizza name and size are the same as existing one', () => {
      addNewPizzaRequest(pizzaName1, small, 20);
      const { status, body } = addNewPizzaRequest(pizzaName1, small, 12);
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_PIZZA',
        message: expect.any(String)
      });
    });
  });

  describe('success', () => {
    test('Pizza is added', () => {
      const { status, body } = addNewPizzaRequest(pizzaName1, small, 10);
      expect(status).toBe(200);
      expect(body).toStrictEqual({
        pizzaId: expect.any(Number)
      });
    });
  });
});

// '/pizza/filter'
describe ('getPizzasByPrice', () => {
  describe('errors', () => {
    test('Pizza price is less than 10', () => {
      const { status, body } = getPizzasByPriceRequest(3);
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_PIZZA_PRICE',
        message: expect.any(String)
      });
    });

    test('Pizza price is greater than 50', () => {
      const { status, body } = getPizzasByPriceRequest(51);
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_PIZZA_PRICE',
        message: expect.any(String)
      });
    });
  });

  describe('success', () => {
    test('gets pizzas in descending price under given amount', () => {
      addNewPizzaRequest(pizzaName1, small, 13);
      addNewPizzaRequest(pizzaName2, small, 12);
      addNewPizzaRequest(pizzaName1, medium, 20);
      addNewPizzaRequest(pizzaName1, large, 21);

      const { status, body } = getPizzasByPriceRequest(20);
      expect(status).toBe(200);
      expect(body).toStrictEqual({
        pizzas: [
          {
            name: pizzaName1,
            size: medium,
            price: 20
          },
          {
            name: pizzaName1,
            size: small,
            price: 13
          },
          {
            name: pizzaName2,
            size: small,
            price: 12
          },
        ]
      });
    });
  });
});

// '/pizza/list'
describe ('getPizzasByIds', () => {
  let pizza1: number, pizza2: number, pizza3: number, pizza4: number;
  beforeEach(() => {
    pizza1 = addNewPizzaRequest(pizzaName1, small, 13).body.pizzaId;
    pizza2 = addNewPizzaRequest(pizzaName2, small, 12).body.pizzaId;
    pizza3 = addNewPizzaRequest(pizzaName1, medium, 18).body.pizzaId;
    pizza4 = addNewPizzaRequest(pizzaName1, large, 21).body.pizzaId;
  });

  describe('errors', () => {
    test('One of the pizzaIds does not refer to a valid pizza', () => {
      const { status, body } = getPizzasByIdsRequest(String(pizza4 + 1));
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_PIZZA_ID',
        message: expect.any(String)
      });
    });

    test('One of the pizzaIds does not refer to a valid pizza', () => {
      const { status, body } = getPizzasByIdsRequest(`${pizza1}, ${pizza4 + 1}`);
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_PIZZA_ID',
        message: expect.any(String)
      });
    });
  });

  describe('success', () => {
    test('gets pizzas in order of ids', () => {
      const { status, body } = getPizzasByIdsRequest(`${pizza1}, ${pizza4}, ${pizza3}, ${pizza2}`);
      expect(status).toBe(200);
      expect(body).toStrictEqual({
        pizzas: [
          {
            name: pizzaName1,
            size: small,
            price: 13
          },
          {
            name: pizzaName1,
            size: large,
            price: 21
          },
          {
            name: pizzaName1,
            size: medium,
            price: 18
          },
          {
            name: pizzaName2,
            size: small,
            price: 12
          }
        ]
      });
    });
  });
});

// '/pizza/:pizzaid'
describe ('updatePizzaPriceById', () => {
  let pizza1: number;
  beforeEach(() => {
    pizza1 = addNewPizzaRequest(pizzaName1, small, 13).body.pizzaId;
  });

  describe('errors', () => {
    test('Pizza name is empty', () => {
      const { status, body } = updatePizzaPriceByIdRequest('admin', pizza1 + 1, 15);
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_PIZZA_ID',
        message: expect.any(String)
      });
    });

    test('Pizza price is less than 10', () => {
      const { status, body } = updatePizzaPriceByIdRequest('admin', pizza1, 9);
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_PIZZA_PRICE',
        message: expect.any(String)
      });
    });

    test('Pizza price is greater than 50', () => {
      const { status, body } = updatePizzaPriceByIdRequest('admin', pizza1, 60);
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_PIZZA_PRICE',
        message: expect.any(String)
      });
    });

    test('role is not admin', () => {
      const { status, body } = updatePizzaPriceByIdRequest('NOT_ADMIN', pizza1, 20);
      expect(status).toBe(403);
      expect(body).toStrictEqual({
        error: 'INVALID_ROLE',
        message: expect.any(String)
      });
    });
  });

  describe('success', () => {
    test('pizza price is updated (lower price)', () => {
      const { status, body } = updatePizzaPriceByIdRequest('admin', pizza1, 10);
      expect(status).toBe(200);
      expect(body).toStrictEqual({});
    });

    test('pizza price is updated (higher price)', () => {
      const { status, body } = updatePizzaPriceByIdRequest('admin', pizza1, 15);
      expect(status).toBe(200);
      expect(body).toStrictEqual({});
    });

    test('pizza price is updated, get by id', () => {
      updatePizzaPriceByIdRequest('admin', pizza1, 10);
      const { status, body } = getPizzasByPriceRequest(10);
      expect(status).toBe(200);
      expect(body).toStrictEqual({
        pizzas: [
          {
            name: pizzaName1,
            size: small,
            price: 10
          }
        ]
      });
    });
  });
});

// '/pizza/all'
describe ('updateAllPizzaPrices', () => {
  let pizza1, pizza2, pizza3, pizza4;
  beforeEach(() => {
    pizza1 = addNewPizzaRequest(pizzaName1, small, 12).body.pizzaId;
    pizza2 = addNewPizzaRequest(pizzaName2, small, 13).body.pizzaId;
    pizza3 = addNewPizzaRequest(pizzaName1, medium, 30).body.pizzaId;
    pizza4 = addNewPizzaRequest(pizzaName1, large, 31).body.pizzaId;
  });

  describe('errors', () => {
    test('increaseAmount is less than 0.5', () => {
      const { status, body } = updateAllPizzaPricesRequest('admin', 0.2);
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_INCREASE_AMOUNT',
        message: expect.any(String)
      });
    });

    test('increaseAmount is greater than 5', () => {
      const { status, body } = updateAllPizzaPricesRequest('admin', 6);
      expect(status).toBe(400);
      expect(body).toStrictEqual({
        error: 'INVALID_INCREASE_AMOUNT',
        message: expect.any(String)
      });
    });

    test('role is not admin', () => {
      const { status, body } = updateAllPizzaPricesRequest('NOT_ADMIN', 6);
      expect(status).toBe(403);
      expect(body).toStrictEqual({
        error: 'INVALID_ROLE',
        message: expect.any(String)
      });
    });
  });

  describe('success', () => {
    test('all prices are increased', () => {
      const { status, body } = updateAllPizzaPricesRequest('admin', 1);
      expect(status).toBe(200);
      expect(body).toStrictEqual({});
    });

    test('all prices are increased, get by id', () => {
      updateAllPizzaPricesRequest('admin', 1);
      const { status, body } = getPizzasByPriceRequest(30);
      expect(status).toBe(200);
      expect(body).toStrictEqual({
        pizzas: [
          {
            name: pizzaName2,
            size: small,
            price: 14
          },
          {
            name: pizzaName1,
            size: small,
            price: 13
          }
        ]
      });
    });

    test('all prices are increased, when no pizza', () => {
      deleteRequest();
      updateAllPizzaPricesRequest('admin', 1);
      const { status, body } = getPizzasByPriceRequest(30);
      expect(status).toBe(200);
      expect(body).toStrictEqual({
        pizzas: []
      });
    });
  });
});