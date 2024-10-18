import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import {
  decreaseItemQuantity,
  getCurrentQuantity,
  IncreaseItemQuantity,
} from "./cartSlice";

function UpdateItems({ id }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantity(id));
  return (
    <div className="flex items-center justify-between gap-2">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(id))}>
        -
      </Button>
      <p className="font-semibold">{currentQuantity}</p>
      <Button type="round" onClick={() => dispatch(IncreaseItemQuantity(id))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItems;
