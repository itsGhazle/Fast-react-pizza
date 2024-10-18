import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../services/apiRestaurant";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import {
  fetchAddress,
  getStatus,
  getUserName,
  selectAddress,
  selectError,
  selectPosition,
} from "../user/userSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formError = useActionData();
  const name = useSelector(getUserName);
  const cart = useSelector(getCart);
  const position = useSelector(selectPosition);
  const error = useSelector(selectError);
  const address = useSelector(selectAddress);
  console.log(address);
  const status = useSelector(getStatus);
  const isLoadingPosition = status === "loading";

  const cartPrice = useSelector(getTotalPrice);
  const [withPriority, setWithPriority] = useState(false);
  const priorityPrice = withPriority ? 0.25 * cartPrice : 0;
  const totalPrice = cartPrice + priorityPrice;
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" className="py-6">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              defaultValue={name}
              className="input w-full"
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              defaultValue={address}
              className="input w-full"
              required
            />
          </div>
          {!position.latitude && !position.longitude && (
            <span
              className={`absolute right-1 ${isLoadingPosition && "bg-stone-400"}`}
            >
              <Button
                type="small"
                disabled={isLoadingPosition}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
          {status === "error" && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {error.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 px-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div className="px-4 py-3">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={position && JSON.stringify(position)}
          />
          <Button type="primary" disabled={isSubmitting || isLoadingPosition}>
            {isSubmitting
              ? "placing order"
              : ` Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
    position: JSON.parse(data.position),
  };
  console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "please give us the correct phone number!";
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
