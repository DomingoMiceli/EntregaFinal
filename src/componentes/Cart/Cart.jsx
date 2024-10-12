import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import { List, Card, Button, Empty } from "antd";

const Cart = () => {
	const { carrito, vaciarCarrito, total, cantidadTotal } =
		useContext(CarritoContext);

	if (cantidadTotal === 0) {
		return (
			<Card
				title="Tu carrito"
				style={{ maxWidth: 600, margin: "0 auto" }}
			>
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={<span>No hay productos en el carrito</span>}
				>
					<Button type="primary">
						<Link to="/">Ir a comprar</Link>
					</Button>
				</Empty>
			</Card>
		);
	}

	return (
		<Card title="Carrito de compras">
			<List
				header={<div>Productos en el carrito</div>}
				itemLayout="horizontal"
				dataSource={carrito}
				renderItem={(producto) => (
					<List.Item>
						<CartItem key={producto.item.id} {...producto} />
					</List.Item>
				)}
			/>
			<br />
			<h3>Total: ${total}</h3>
			<h3>Cantidad de productos: {cantidadTotal}</h3>
			<br />
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					width: "320px",
					alignItems: "center",
				}}
			>
				<Button
					danger
					style={{ width: "150px", height: "40px" }}
					onClick={() => vaciarCarrito()}
				>
					Vaciar carrito
				</Button>
				<Button
					type="primary"
					style={{
						width: "150px",
						height: "40px",
						backgroundColor: "green",
						borderColor: "green",
					}}
				>
					<Link
						to="/checkout"
						style={{
							color: "white",
							display: "block",
							lineHeight: "40px",
						}}
					>
						Finalizar compra
					</Link>
				</Button>
			</div>
		</Card>
	);
};

export default Cart;
