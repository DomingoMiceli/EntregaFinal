import "./CartWidget.css";
import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";

const CartWidget = () => {
	const { cantidadTotal } = useContext(CarritoContext);

	return (
		<div>
			<Link to="/cart">
				<img className="carrito" src="/imagenes/carrito.png" />
			</Link>
			{cantidadTotal > 0 && (
				<strong style={{ color: "white" }}>{cantidadTotal}</strong>
			)}
		</div>
	);
};

export default CartWidget;
