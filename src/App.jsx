import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./features/UI/Home";
import Cart from "./features/cart/Cart";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import CreateOrder, {
  action as actionOrder,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./features/UI/AppLayout";
import Error from "./features/UI/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },

      { path: "order/new", element: <CreateOrder />, action: actionOrder },
      {
        path: "order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
