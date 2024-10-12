import { useState } from "react";
import { Link } from "react-router-dom";
import "./Contador.css";
import PropTypes from "prop-types";

const Contador = ({ valorInicial, stock, funcionAgregarCantidad }) => {
	const [contador, setContador] = useState(valorInicial);

	const sumarContador = () => {
		if (contador < stock) {
			setContador(contador + 1);
		}
	};

	const restarContador = () => {
		if (contador > valorInicial) {
			setContador(contador - 1);
		}
	};

	return (
		<>
			<div className="contador-wrapper">
				<div className="contador-container">
					<button onClick={restarContador}>-</button>
					<strong> {contador} </strong>
					<button onClick={sumarContador}>+</button>
				</div>
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
					<button
						className="agregar-carrito"
						onClick={() => funcionAgregarCantidad(contador)}
					>
						Agregar al carrito
					</button>
				</div>
			</div>
		</>
	);
};

Contador.propTypes = {
	valorInicial: PropTypes.number,
	stock: PropTypes.number,
	funcionAgregarCantidad: PropTypes.func,
};

export default Contador;
