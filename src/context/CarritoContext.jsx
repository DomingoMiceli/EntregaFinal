import PropTypes from "prop-types";
import { useState, createContext } from "react";
import Swal from "sweetalert2";

export const CarritoContext = createContext({
	carrito: [],
	total: 0,
	cantidadTotal: 0,
});

export const CarritoProvider = ({ children }) => {
	const [carrito, setCarrito] = useState([]);
	const [total, setTotal] = useState(0);
	const [cantidadTotal, setCantidadTotal] = useState(0);

	const agregarAlCarrito = (item, cantidad) => {
		const productoExistente = carrito.find(
			(prod) => prod.item.id === item.id
		);

		if (!productoExistente) {
			setCarrito((prev) => [...prev, { item, cantidad }]);
			setCantidadTotal((prev) => prev + cantidad);
			setTotal((prev) => prev + item.precio * cantidad);
		} else {
			const carritoActualizado = carrito.map((prod) => {
				if (prod.item.id === item.id) {
					return { ...prod, cantidad: prod.cantidad + cantidad };
				} else {
					return prod;
				}
			});
			setCarrito(carritoActualizado);
			setCantidadTotal((prev) => prev + cantidad);
			setTotal((prev) => prev + item.precio * cantidad);
		}
	};

	const eliminarProducto = (id) => {
		const productoEliminado = carrito.find((prod) => prod.item.id === id);
		const carritoActualizado = carrito.filter(
			(prod) => prod.item.id !== id
		);
		setCarrito(carritoActualizado);
		setCantidadTotal((prev) => prev - productoEliminado.cantidad);
		setTotal(
			(prev) =>
				prev -
				productoEliminado.item.precio * productoEliminado.cantidad
		);
	};

	const vaciarCarritoSinConfirmar = () => {
		setCarrito([]);
		setCantidadTotal(0);
		setTotal(0);
	};

	const vaciarCarrito = () => {
		Swal.fire({
			title: "Estás seguro de vaciar el carrito?",
			text: "Una vez vaciado el carrito, tendrás que volver a agregarlos.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, quiero vaciar el carrito!",
		}).then((result) => {
			if (result.isConfirmed) {
				setCarrito([]);
				setCantidadTotal(0);
				setTotal(0);
				Swal.fire({
					title: "Eliminado!",
					text: "Tus productos han sido eliminados.",
					icon: "success",
				});
			}
		});
	};

	return (
		<CarritoContext.Provider
			value={{
				carrito,
				total,
				cantidadTotal,
				agregarAlCarrito,
				eliminarProducto,
				vaciarCarritoSinConfirmar,
				vaciarCarrito,
			}}
		>
			{children}
		</CarritoContext.Provider>
	);
};

CarritoProvider.propTypes = {
	children: PropTypes.node,
};
