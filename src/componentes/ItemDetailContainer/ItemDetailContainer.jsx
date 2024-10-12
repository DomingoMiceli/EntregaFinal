import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { Card, Skeleton } from "antd";
import { db } from "../../services/config";
import { getDoc, doc } from "firebase/firestore";

const ItemDetailContainer = () => {
	const [producto, setProducto] = useState(null);
	const { itemId } = useParams();
	const [cargando, setCargando] = useState(true);

	useEffect(() => {
		const docRef = doc(db, "productos", itemId);
		getDoc(docRef)
			.then((res) => setProducto({ id: res.id, ...res.data() }))
			.catch("Error al obtener los datos del producto.")
			.finally(() => setCargando(false));
	}, [itemId]);

	return (
		<Card
			style={{
				width: 500,
				margin: "auto",
				marginTop: 50,
				marginBottom: 50,
				backgroundColor: "#f2f2f2",
			}}
		>
			{cargando ? (
				<Skeleton active avatar paragraph={{ rows: 4 }} />
			) : (
				<ItemDetail {...producto} />
			)}
		</Card>
	);
};

export default ItemDetailContainer;
