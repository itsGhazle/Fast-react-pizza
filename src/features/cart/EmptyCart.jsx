import { Link } from "react-router-dom";
import Button from "../UI/Button";
import LinkButton from "../UI/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-5 text-center text-sm font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
