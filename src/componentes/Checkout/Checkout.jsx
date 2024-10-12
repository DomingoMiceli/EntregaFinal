import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { useState } from "react";
import { Form, Input, Button, Card, Typography, Space, Radio } from "antd";
import { CreditCardOutlined, DollarOutlined } from "@ant-design/icons";
import { Navigate } from "react-router-dom";
import { db } from "../../services/config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import Loader from "../Loader/Loader";

const { Title, Text } = Typography;

const Checkout = () => {
	const { carrito, total, cantidadTotal, vaciarCarritoSinConfirmar } =
		useContext(CarritoContext);
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [telefono, setTelefono] = useState("");
	const [email, setEmail] = useState("");
	const [emailConfirmacion, setEmailConfirmacion] = useState("");
	const [direccion, setDireccion] = useState("");
	const [tarjetaNumero, setTarjetaNumero] = useState("");
	const [tarjetaVencimiento, setTarjetaVencimiento] = useState("");
	const [tarjetaCvv, setTarjetaCvv] = useState("");
	const [tarjetaNombre, setTarjetaNombre] = useState("");
	const [metodoPago, setMetodoPago] = useState("");
	const [errorFormulario, setErrorFormulario] = useState("");
	const [redirigir, setRedirigir] = useState(false);
	const [ordenId, setOrdenId] = useState("");
	const [fecha, setFecha] = useState("");
	const [loader, setLoader] = useState(false);

	const finalizarCompra = (datos) => {
		if (validarFormulario(datos)) {
			setErrorFormulario("");
			setLoader(true);

			const ordenDeCompra = {
				items: carrito.map((producto) => ({
					id: producto.item.id,
					nombre: producto.item.nombre,
					cantidad: producto.cantidad,
				})),
				total: total,
				fecha: new Date(),
				nombre,
				apellido,
				telefono,
				email,
				direccion,
				metodoPago:
					metodoPago === "tarjeta"
						? "Tarjeta de Crédito"
						: "Efectivo",
			};

			Promise.all(
				ordenDeCompra.items.map(async (productoOrden) => {
					const productoRef = doc(db, "productos", productoOrden.id);
					const productoDoc = await getDoc(productoRef);
					const stockActual = productoDoc.data().stock;
					await updateDoc(productoRef, {
						stock: stockActual - productoOrden.cantidad,
					});
				})
			)
				.then(() => {
					addDoc(collection(db, "ordenes"), ordenDeCompra)
						.then((docRef) => {
							setNombre("");
							setApellido("");
							setTelefono("");
							setEmail("");
							setEmailConfirmacion("");
							setNombre("");
							setApellido("");
							setTelefono("");
							setEmail("");
							setEmailConfirmacion("");
							setDireccion("");
							setTarjetaNumero("");
							setTarjetaVencimiento("");
							setTarjetaCvv("");
							setTarjetaNombre("");
							setMetodoPago("");
							setErrorFormulario("");
							vaciarCarritoSinConfirmar();
							setOrdenId(docRef.id);
							setFecha(ordenDeCompra.fecha.toLocaleDateString());
							setRedirigir(true);
						})
						.catch(() => {
							setErrorFormulario(
								"Se produjo un error procesar su compra. Por favor, inténtelo nuevamente."
							);
						})
						.finally(() => {
							setLoader(false);
						});
				})
				.catch(() => {
					setErrorFormulario(
						"Se produjo un error al actualizar el stock. Por favor, inténtelo nuevamente."
					);
				})
				.finally(() => {
					setLoader(false);
				});
		}
	};

	if (redirigir) {
		return (
			<Navigate
				to="/payment"
				state={{ ordenId: ordenId, fecha: fecha }}
			/>
		);
	}

	const validarFormulario = (datos) => {
		const camposRequeridos = [
			"nombre",
			"apellido",
			"email",
			"confirmarEmail",
			"telefono",
			"direccion",
			"metodoDePago",
		];

		for (let valor of camposRequeridos) {
			if (!datos[valor]) {
				return false;
			}
		}

		if (datos.metodoDePago === "tarjeta") {
			const camposTarjeta = [
				"tarjetaNumero",
				"tarjetaNombre",
				"tarjetaVto",
				"tarjetaCvv",
			];
			for (let valor of camposTarjeta) {
				if (!datos[valor]) {
					return false;
				}
			}
		}

		return true;
	};

	return loader ? (
		<Loader />
	) : (
		<>
			<Card style={{ maxWidth: 600, margin: "0 auto" }}>
				<Title level={2}>Mercado Cobro</Title>

				<Card type="inner" title="Resumen de la Compra">
					<Text strong>Total: ${total}</Text>
					<br />
					<Text strong>Cantidad de productos: {cantidadTotal}</Text>
				</Card>

				<Form
					layout="vertical"
					onFinish={finalizarCompra}
					style={{ marginTop: 20 }}
				>
					{errorFormulario && (
						<Text type="danger">{errorFormulario}</Text>
					)}

					<Form.Item
						name="nombre"
						label="Nombre"
						rules={[
							{
								required: true,
								message: "Por favor ingrese su nombre",
							},
						]}
					>
						<Input
							placeholder="Juan"
							onChange={(e) => setNombre(e.target.value)}
							value={nombre}
						/>
					</Form.Item>

					<Form.Item
						name="apellido"
						label="Apellido"
						rules={[
							{
								required: true,
								message: "Por favor ingrese su apellido",
							},
						]}
					>
						<Input
							placeholder="Pérez"
							onChange={(e) => setApellido(e.target.value)}
							value={apellido}
						/>
					</Form.Item>

					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								required: true,
								message: "Por favor ingrese su email",
							},
							{
								type: "email",
								message: "Por favor ingrese un email válido",
							},
						]}
					>
						<Input
							placeholder="juan.perez@ejemplo.com"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</Form.Item>

					<Form.Item
						name="confirmarEmail"
						label="Confirmar Email"
						dependencies={["email"]}
						rules={[
							{
								required: true,
								message: "Por favor confirme su email",
							},
							{
								type: "email",
								message: "Por favor ingrese un email válido",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (
										!value ||
										getFieldValue("email") === value
									) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error("Los emails no coinciden")
									);
								},
							}),
						]}
					>
						<Input
							placeholder="juan.perez@ejemplo.com"
							onChange={(e) =>
								setEmailConfirmacion(e.target.value)
							}
							value={emailConfirmacion}
						/>
					</Form.Item>

					<Form.Item
						name="telefono"
						label="Teléfono"
						rules={[
							{
								required: true,
								message:
									"Por favor ingrese su número de teléfono",
							},
						]}
					>
						<Input
							placeholder="1234567890"
							onChange={(e) => setTelefono(e.target.value)}
							value={telefono}
						/>
					</Form.Item>

					<Form.Item
						name="direccion"
						label="Dirección"
						rules={[
							{
								required: true,
								message: "Por favor ingrese su dirección",
							},
						]}
					>
						<Input
							placeholder="Calle Ejemplo 123, Ciudad"
							onChange={(e) => setDireccion(e.target.value)}
							value={direccion}
						/>
					</Form.Item>

					<Form.Item
						name="metodoDePago"
						label="Método de Pago"
						rules={[
							{
								required: true,
								message:
									"Por favor seleccione un método de pago",
							},
						]}
					>
						<Radio.Group
							onChange={(e) => setMetodoPago(e.target.value)}
						>
							<Space direction="vertical">
								<Radio value="tarjeta">
									<CreditCardOutlined /> Tarjeta de Crédito
								</Radio>
								<Radio value="efectivo">
									<DollarOutlined /> Efectivo
								</Radio>
							</Space>
						</Radio.Group>
					</Form.Item>

					{metodoPago === "tarjeta" && (
						<>
							<Form.Item
								name="tarjetaNumero"
								label="Número de Tarjeta"
								rules={[
									{
										required: true,
										message:
											"Por favor ingrese el número de tarjeta",
									},
								]}
							>
								<Input
									placeholder="1234 5678 9012 3456"
									onChange={(e) =>
										setTarjetaNumero(e.target.value)
									}
									value={tarjetaNumero}
								/>
							</Form.Item>
							<Form.Item
								name="tarjetaNombre"
								label="Nombre en la Tarjeta"
								rules={[
									{
										required: true,
										message:
											"Por favor ingrese el nombre en la tarjeta",
									},
								]}
							>
								<Input
									placeholder="Juan Pérez"
									onChange={(e) =>
										setTarjetaNombre(e.target.value)
									}
									value={tarjetaNombre}
								/>
							</Form.Item>
							<Space>
								<Form.Item
									name="tarjetaVto"
									label="Fecha de Expiración"
									rules={[
										{
											required: true,
											message:
												"Por favor ingrese la fecha de expiración",
										},
									]}
								>
									<Input
										placeholder="MM/AA"
										onChange={(e) =>
											setTarjetaVencimiento(
												e.target.value
											)
										}
										value={tarjetaVencimiento}
									/>
								</Form.Item>
								<Form.Item
									name="tarjetaCvv"
									label="CVV"
									rules={[
										{
											required: true,
											message: "Por favor ingrese el CVV",
										},
									]}
								>
									<Input
										placeholder="123"
										onChange={(e) =>
											setTarjetaCvv(e.target.value)
										}
										value={tarjetaCvv}
									/>
								</Form.Item>
							</Space>
						</>
					)}

					{metodoPago === "efectivo" && (
						<Text>
							Por favor, pague en la caja al recoger su pedido.
						</Text>
					)}

					<Form.Item>
						<Button type="primary" htmlType="submit">
							{metodoPago === "tarjeta"
								? "Confirmar Pago"
								: "Confirmar Pedido"}
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</>
	);
};

export default Checkout;
