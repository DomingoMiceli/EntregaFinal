import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import "./ItemListContainer.css";
import Loader from "../Loader/Loader";
import { db } from "../../services/config";
import { collection, getDocs, query, where } from "firebase/firestore";

const ItemListContainer = () => {
	const [productos, setProductos] = useState([]);
	const [loader, setLoader] = useState(false);
	const { categoriaId } = useParams();

	useEffect(() => {
		setLoader(true);
		const productosRef = collection(db, "productos");
		const queryProductos = categoriaId
			? query(productosRef, where("categoria", "==", categoriaId))
			: productosRef;
		getDocs(queryProductos)
			.then((res) => {
				const productos = res.docs.map((doc) => {
					return { id: doc.id, ...doc.data() };
				});
				setProductos(productos);
			})
			.catch("Error al obtener los productos.")
			.finally(() => {
				setLoader(false);
			});
	}, [categoriaId]);

	return (
		<div className="contenedorItemListProductos">
			{loader ? <Loader /> : <ItemList productos={productos} />}
		</div>
	);
};

export default ItemListContainer;
