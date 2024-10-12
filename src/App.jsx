import NavBar from "./componentes/NavBar/NavBar";
import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./componentes/ItemDetailContainer/ItemDetailContainer";
import Cart from "./componentes/Cart/Cart";
import Checkout from "./componentes/Checkout/Checkout";
import Payment from "./componentes/Payment/Payment";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<CarritoProvider>
					<NavBar />
					<Routes>
						<Route
							path="/"
							element={<ItemListContainer greeting="" />}
						/>
						<Route
							path="/categoria/:categoriaId"
							element={<ItemListContainer greeting="" />}
						/>
						<Route
							path="/item/:itemId"
							element={<ItemDetailContainer />}
						/>
						<Route path="/cart" element={<Cart />} />
						<Route path="/checkout" element={<Checkout />} />
						<Route path="/payment" element={<Payment />} />
						<Route path="*" element={<h1>404 NOT FOUND</h1>} />
					</Routes>
				</CarritoProvider>
				<ToastContainer />
			</BrowserRouter>
		</>
	);
};

export default App;
