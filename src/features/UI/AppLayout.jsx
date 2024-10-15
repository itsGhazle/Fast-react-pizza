import { Outlet } from "react-router-dom"
import CartOverview from "../cart/CartOverview"
import Header from "./Header"

function AppLayout() {
    return (
        <>
           <Header/> 
           <main>
            <Outlet/>
           </main>
           <CartOverview/>
        </>
    )
}

export default AppLayout
