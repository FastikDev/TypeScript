type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: "ordered" | "completed";
};

let cashInRegister = 100;
let nextOrderId = 1;
let nextPizzaId = 1;

const menu: Pizza[] = [
  { id: nextPizzaId++, name: "Margherita", price: 8 },
  { id: nextPizzaId++, name: "Pepperoni", price: 10 },
  { id: nextPizzaId++, name: "Hawaiian", price: 10 },
  { id: nextPizzaId++, name: "Veggie", price: 9 },
];

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  const newPizza = {
    ...pizzaObj,
    id: nextPizzaId++,
  };
  menu.push(newPizza);

  return newPizza;
}

const orderQueue: Order[] = [];

function placeOrder(pizzaName: string) {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);

  if (!selectedPizza) {
    console.error(`${pizzaName} does not exist in the menu`);
    return;
  }

  cashInRegister += selectedPizza.price;
  const newOrder: Order = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);

  return newOrder;
}

function addToArray<T>(array: T[], item: T): T[] {
  array.push(item);
  return array;
}

addToArray<Pizza>(menu, { id: nextPizzaId++, name: "Bayraktar", price: 12 });
addToArray<Order>(orderQueue, {
  id: nextOrderId++,
  pizza: menu[2],
  status: "completed",
});

console.log("Menu", menu);
console.log("Order", orderQueue);

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find((order) => order.id === orderId);

  if (!order) {
    console.error(`Order with ID ${orderId} not found in the orderQueue`);
    return;
  }

  order.status = "completed";

  return order;
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
  if (typeof identifier === "string") {
    return menu.find(
      (pizza) =>
        pizza.name.toLocaleLowerCase() === identifier.toLocaleLowerCase()
    );
  } else if (typeof identifier === "number") {
    return menu.find((pizza) => pizza.id === identifier);
  } else {
    throw new Error(
      "Parameter `identifier` must be either a string or a number"
    );
  }
}
