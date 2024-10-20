import { Form, useFetcher } from "react-router-dom";
import Button from "../UI/Button";
import { updateOrder } from "../services/apiRestaurant";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  function handelUpdatePriority() {}
  return (
    <div>
      <fetcher.Form method="PATCH" className="text-right">
        <Button type="primary" onClick={handelUpdatePriority}>
          priority
        </Button>
      </fetcher.Form>
    </div>
  );
}

export default UpdateOrder;
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
}
