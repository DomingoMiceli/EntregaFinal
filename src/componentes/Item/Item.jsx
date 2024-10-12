import "./Item.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Item = ({ id, nombre, precio, imagen, stock }) => {
	return (
		<div className="cardProductos">
			<img
				src={imagen}
				alt={nombre}
				onError={(e) => {
					e.target.onerror = null;
					e.target.src = "/imagenes/Image-not-found.png";
				}}
			/>
			<h3>
				{nombre} {stock > 0 ? "(Hay stock)" : "(Producto agotado)"}
			</h3>
			<p>Precio: ${precio}</p>
			<Link to={`/item/${id}`} className="boton-detalles">
				Ver Detalles
			</Link>
		</div>
	);
};

Item.propTypes = {
	id: PropTypes.string,
	nombre: PropTypes.string,
	precio: PropTypes.number,
	imagen: PropTypes.string,
	stock: PropTypes.number,
};

export default Item;
