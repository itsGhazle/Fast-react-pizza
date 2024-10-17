import { Link } from "react-router-dom";
import Button from "../UI/Button";
import LinkButton from "../UI/LinkButton";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import { getUser } from "../user/userSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const { name } = useSelector(getUser);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  function handleClearCart() {
    dispatch(clearCart());
  }
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {name}</h2>
      <ul>
        {cart.map((item, index) => (
          <CartItem item={item} key={index} />
        ))}
      </ul>
      <div>
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
