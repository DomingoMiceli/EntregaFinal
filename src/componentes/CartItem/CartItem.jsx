import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import PropTypes from "prop-types";
import { Button, List, Avatar, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const CartItem = ({ item, cantidad }) => {
	const { eliminarProducto } = useContext(CarritoContext);

	return (
		<List>
			<Row style={{ width: "100%" }} align="middle">
				<Col span={8}>
					<Avatar src={item.imagen} shape="square" size={80} />
				</Col>
				<Col span={1} />
				<Col span={15}>
					<h3>{item.nombre}</h3>
					<p>Precio: ${item.precio}</p>
					<p>Cantidad: {cantidad}</p>
					<Button
						type="primary"
						danger
						icon={<DeleteOutlined />}
						onClick={() => eliminarProducto(item.id)}
						style={{ marginTop: "10px" }}
					>
						Eliminar
					</Button>
				</Col>
			</Row>
		</List>
	);
};

CartItem.propTypes = {
	item: PropTypes.object,
	cantidad: PropTypes.number,
};

export default CartItem;
