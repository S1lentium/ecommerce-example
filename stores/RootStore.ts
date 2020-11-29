import { enableStaticRendering } from "mobx-react-lite";
import CartStore from "./CartStore";

enableStaticRendering(typeof window === 'undefined');

export default class RootStore {
  cartStore: CartStore;

  constructor() {
    this.cartStore = new CartStore(this);
  }
}
