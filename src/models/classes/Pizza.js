export default class PizzaToOrder {
    constructor(id, quantity,customer ) {
      this.id = id;
      this.customer=customer;
      this.quantity = quantity;
      this.toppings = [];
    }
  
    addTopping(topping) {
      if (!this.toppings.includes(topping)) {
        this.toppings.push(topping);
      }
    }
  
    removeTopping(topping) {
      this.toppings = this.toppings.filter(t => t !== topping);
    }
  
    getTotalPrice() {
      // Assuming a fixed price for toppings
      const toppingPrice = 2; 
      return this.price + (this.toppings.length * toppingPrice);
    }
  }
  