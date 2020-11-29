import { makeAutoObservable } from "mobx";
import { CartItem, Product } from "../interfaces";
import RootStore from "./RootStore";

export default class CartStore {
  items: CartItem[] = [];
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  addItem(item: Product, size: string) {
    this.items.push({
      product: item,
      size,
    });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  clearItems() {
    this.items = [];
  }

  get count() {
    return this.items.length;
  }

  get total() {
    const sum = this.items.reduce((sum, item) => {
      return sum + item.product.priceInCents;
    }, 0);

    return `$${(sum / 100).toFixed(2)}`;
  }
}
