import "./ItemDetail.css";
import Contador from "../Contador/Contador";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";
import { useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const ItemDetail = ({
	id,
	nombre,
	precio,
	imagen,
	detalle,
	stock,
	colores,
	talles,
	material,
}) => {
	const [cantidad, setCantidad] = useState(0);
	const { agregarAlCarrito } = useContext(CarritoContext);

	const funcionAgregarCantidad = (cantidad) => {
		setCantidad(cantidad);
		const item = { id, nombre, precio, imagen };
		agregarAlCarrito(item, cantidad);
		toast.success("Producto agregado al carrito", {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};

	return (
		<div className="contenedorItemDetail">
			<div className="contenido-interno">
				<img
					src={imagen}
					alt={nombre}
					style={{ maxWidth: "250px", height: "auto" }}
					onError={(e) => {
						e.target.onerror = null;
						e.target.src = "/imagenes/Image-not-found.png";
					}}
				/>
				<h2>{nombre}</h2>
				{stock <= 0 ? <h3>(Producto agotado)</h3> : null}
				<p>Detalle: {detalle}</p>
				<p>Colores: {colores}</p>
				<p>Talles: {talles}</p>
				<p>Material: {material}</p>

				{cantidad > 0 ? (
					<>
						<p>Precio unitario: ${precio}</p>
						<p>Cantidad: {cantidad}</p>
						<p>Total: ${precio * cantidad}</p>
					</>
				) : (
					<>
						<p>Stock: {stock}</p>
						<p>Precio: ${precio}</p>
					</>
				)}

				{stock <= 0 ? (
					<Link to="/">
						<button className="boton-seguir-comprando">
							Seguir comprando
						</button>
					</Link>
				) : cantidad > 0 ? (
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							width: "320px",
							alignItems: "center",
						}}
					>
						<Link to="/">
							<button className="boton-seguir-comprando">
								Seguir comprando
							</button>
						</Link>
						<Link to="/cart">
							<button className="boton-finalizar-compra">
								Finalizar compra
							</button>
						</Link>
					</div>
				) : (
					<Contador
						valorInicial={1}
						stock={stock}
						funcionAgregarCantidad={funcionAgregarCantidad}
					/>
				)}
			</div>
		</div>
	);
};
ItemDetail.propTypes = {
	id: PropTypes.string,
	nombre: PropTypes.string,
	precio: PropTypes.number,
	imagen: PropTypes.string,
	detalle: PropTypes.string,
	categoria: PropTypes.string,
	stock: PropTypes.number,
	colores: PropTypes.string,
	talles: PropTypes.string,
	material: PropTypes.string,
};

export default ItemDetail;
