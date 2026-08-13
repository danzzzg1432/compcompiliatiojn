export type EmptyObject = Record<string, never>;

export interface ErrorObject {
  error: string,
  message: string,
}

export type PizzaSize = 'Small' | 'Medium' | 'Large';

export interface PizzaReturn {
  pizzas: Pizza[]
}

export interface PizzaId {
  pizzaId: number,
}

export interface Pizza {
  name: string,
  size: PizzaSize,
  price: number
}

export interface PizzaDataStore extends PizzaId, Pizza {}

export interface DataStore {
  pizzas: PizzaDataStore[]
}

const dataStore: DataStore = {
  pizzas: []
};

export const getData = (): DataStore => dataStore;
