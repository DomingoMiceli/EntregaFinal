import "./Payment.css";
import { Link, useLocation } from "react-router-dom";

const Payment = () => {
	const location = useLocation();
	const { ordenId, fecha } = location.state;

	return (
		<div className="payment-container">
			<h1 className="payment-title">¡Gracias por su compra!</h1>
			<div className="payment-message">
				<p>Su pedido ha sido procesado con éxito.</p>
				<p>
					Recibirá un correo electrónico con los detalles de su
					compra.
				</p>
			</div>
			<div className="payment-details">
				<h2>Detalles del pedido:</h2>
				<p>Número de pedido: #{ordenId}</p>
				<p>Fecha: {fecha}</p>
			</div>
			<Link to="/">
				<button className="return-button">Volver a la tienda</button>
			</Link>
		</div>
	);
};

export default Payment;
