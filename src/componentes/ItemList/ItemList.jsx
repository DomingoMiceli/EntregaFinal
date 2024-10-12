import Item from "../Item/Item";
import "./ItemList.css";
import PropTypes from "prop-types";

const ItemList = ({ productos }) => {
	return (
		<div className="item-list">
			{productos.map((producto) => (
				<Item key={producto.id} {...producto} />
			))}
		</div>
	);
};

ItemList.propTypes = {
	productos: PropTypes.array,
};

export default ItemList;
