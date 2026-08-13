/**
 * The backend implementation below has already been completed for you.
 * DO NOT make any modifications to the code below.
 */

import {
  DataStore,
  EmptyObject,
  ErrorObject,
  getData,
  Pizza,
  PizzaDataStore,
  PizzaId,
  PizzaReturn,
  PizzaSize,
} from './dataStore.ts';

const MIN_PIZZA_NAME = 3;
const MAX_PIZZA_NAME = 20;
const MIN_PIZZA_PRICE = 10;
const MAX_PIZZA_PRICE = 50;
const MIN_INCREASE_AMOUNT = 0.5;
const MAX_INCREASE_AMOUNT = 5;

/**
 *  Resets all data to initial empty state.
 *
 * @returns {EmptyObject}
 */
export const clear = (): EmptyObject => {
  const data = getData();
  data.pizzas = [];
  return {};
};

/**
 * Creates a new pizza given name, size, and price
 *
 * @param {string} pizzaName - name of the new pizza
 * @param {PizzaSize} size - size of the new pizza
 * @returns {PizzaId | ErrorObject} - Returns the created pizza's Id on success,
 * or an object containing the error message if validation fails.
 */
export const addNewPizza = (name: string, size: PizzaSize, price: number): PizzaId | ErrorObject => {
  const data: DataStore = getData();

  if (!name) {
    return {
      error: 'INVALID_PIZZA_NAME',
      message: 'Empty pizza name'
    };
  }

  if (name.length < MIN_PIZZA_NAME || name.length > MAX_PIZZA_NAME) {
    return {
      error: 'INVALID_PIZZA_NAME',
      message: 'Pizza name too short or too long'
    };
  }

  if (price < MIN_PIZZA_PRICE || price > MAX_PIZZA_PRICE) {
    return {
      error: 'INVALID_PIZZA_PRICE',
      message: 'Pizza price must be between 10 and 50'
    };
  }

  if (data.pizzas.find(t => t.name === name && t.size === size)) {
    return {
      error: 'INVALID_PIZZA',
      message: `${size} ${name} already exists`
    };
  }

  const pizzaId = data.pizzas.length;
  const newPizza: PizzaDataStore = {
    pizzaId: pizzaId,
    name: name,
    size: size,
    price: price
  };
  data.pizzas.push(newPizza);

  return { pizzaId };
};

/**
 * Gets pizzas that has price of lower than, or equal to the query price parameter (in descending price order)
 *
 * @param {number} price - the price of pizzas to be retrieved
 * @returns {PizzaReturn | ErrorObject} - returns a list of pizzas that are under the given price if found,
 * otherwise, returns an object containing the error message if validation fails.
 */
export const getPizzasByPrice = (price: number): PizzaReturn | ErrorObject => {
  const data : DataStore = getData();

  if (price < MIN_PIZZA_PRICE || price > MAX_PIZZA_PRICE) {
    return {
      error: 'INVALID_PIZZA_PRICE',
      message: 'Pizza price must be between 10 and 50'
    };
  }

  const pizzas: PizzaDataStore[] = data.pizzas.filter(t => t.price <= price);
  const pizzasRet: Pizza[] = pizzas.map(({ pizzaId, ...rest }) => rest)
                                  .sort((a, b) => b.price - a.price);

  return {
    pizzas: pizzasRet
  };
};

/**
 * Get pizzas by IDs given a list of comma-separated team Ids.
 * Returns the pizzas in the order of the ids given.
 *
 * @param {number[]} pizzaIds - list of pizza ids
 * @returns {PizzaReturn | ErrorObject} - Returns the pizzas given a list of ids if found,
 * otherwise an object containing the error message if validation fails.
 */
export const getPizzasByIds = (pizzaIds: number[]): PizzaReturn | ErrorObject => {
  const data: DataStore = getData();
  const pizzas: PizzaDataStore[] = [];

  for (const pizzaId of pizzaIds) {
    const pizza = data.pizzas.find(t => t.pizzaId === pizzaId);
    if (!pizza) {
      return {
        error: 'INVALID_PIZZA_ID',
        message: 'One of the pizzaIds does not refer to a valid pizza'
      };
    }

    pizzas.push(pizza);
  }

  const pizzasRet: Pizza[] = pizzas.map(({ pizzaId, ...rest }) => rest);

  return {
    pizzas: pizzasRet
  };
};

/**
 * Update pizza price given a pizza Id
 *
 * @param {string} role - role of the user attempting to update pizza price
 * @param {number} pizzaId - ID of the pizza whose price is to be updated
 * @param {number} newPrice - new price to be set to the pizza
 * @returns {EmptyObject | ErrorObject} Returns an empty object on success, or an error object if validation fails.
 */
export const updatePizzaPriceById = (role: string, pizzaId: number, newPrice: number): EmptyObject | ErrorObject => {
  const data: DataStore = getData();

  if (role !== 'admin') {
    return {
      error: 'INVALID_ROLE',
      message: 'Permission denied to update price'
    };
  }

  const pizza = data.pizzas.find(t => t.pizzaId === pizzaId);
  if (!pizza) {
    return {
      error: 'INVALID_PIZZA_ID',
      message: 'Invalid pizzaId'
    };
  }

  if (newPrice < MIN_PIZZA_PRICE || newPrice > MAX_PIZZA_PRICE) {
    return {
      error: 'INVALID_PIZZA_PRICE',
      message: 'Pizza price must be between 10 and 50'
    };
  }


  pizza.price = newPrice;

  return {};
};

/**
 * Updates all pizza prices by adding increaseAmount to the original pirce.
 * If the final increased price after applying increaseAmount is greater than 50, the price is capped at 50.
 *
 * @param {string} role - role of the user attempting to update pizza prices
 * @param {number} increaseAmount - the amount that all pizza prices has to be increased
 * @returns {EmptyObject | ErrorObject} Returns an empty object on success, or an error object if validation fails.
 */
export const updateAllPizzaPrices = (role: string, increaseAmount: number): EmptyObject | ErrorObject => {
  const data: DataStore = getData();

  if (role !== 'admin') {
    return {
      error: 'INVALID_ROLE',
      message: 'Permission denied to update pizza price'
    };
  }

  if (increaseAmount < MIN_INCREASE_AMOUNT || increaseAmount > MAX_INCREASE_AMOUNT) {
    return {
      error: 'INVALID_INCREASE_AMOUNT',
      message: 'Increase amount must be between 0.5 and 5'
    };
  }

  data.pizzas.forEach(p => {
    p.price = Math.min(p.price += increaseAmount, MAX_PIZZA_PRICE);
  });

  return {};
};
