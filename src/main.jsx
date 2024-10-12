import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider } from "antd";
import es_ES from "antd/locale/es_ES";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ConfigProvider locale={es_ES}>
		<App />
	</ConfigProvider>
);
