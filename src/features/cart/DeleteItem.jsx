import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import { deleteItemFromCart } from "./cartSlice";

function DeleteItem({ id }) {
  const dispatch = useDispatch();
  function handleDeleteItem() {
    dispatch(deleteItemFromCart(id));
  }
  return (
    <div>
      <Button type="small" onClick={handleDeleteItem}>
        Delete
      </Button>
    </div>
  );
}

export default DeleteItem;
