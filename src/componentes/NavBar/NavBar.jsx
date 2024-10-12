import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<header>
			<Link to="/">
				<img className="logo" src="/imagenes/logo.png" alt="logo" />
			</Link>
			<nav>
				<ul>
					<li>
						<NavLink className="nav-link" to="/">
							Todos
						</NavLink>
					</li>
					<li>
						<NavLink className="nav-link" to="/categoria/remeras">
							Remeras
						</NavLink>
					</li>
					<li>
						<NavLink className="nav-link" to="/categoria/buzos">
							Buzos
						</NavLink>
					</li>
					<li>
						<NavLink className="nav-link" to="categoria/camperas">
							Camperas
						</NavLink>
					</li>
					<li>
						<NavLink
							className="nav-link"
							to="/categoria/pantalones"
						>
							Pantalones
						</NavLink>
					</li>
					<li>
						<NavLink
							className="nav-link"
							to="/categoria/accesorios"
						>
							Accesorios
						</NavLink>
					</li>
				</ul>
			</nav>
			<CartWidget />
		</header>
	);
};

export default NavBar;
