import {useContext} from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TokenContext } from '../TokenContext';

const style = { textDecoration: "none" };

// Simple navigation bar
export default function Navigation() {

	const token = localStorage.getItem("token");

	const getAuthState = () => {
		if (token) {
			return <Link to="/" style={style} onClick={() => {localStorage.removeItem("token")}}> Logout </Link>;
		} else {
			if (window.location.pathname === "/" || window.location.pathname === "/signup") {
				return <Link to="/login" style={style}> Login </Link>;
			} else {
				return <Link to="/signup" style={style}> Signup </Link>;
			}
		}
	
	}

	const getHomeState = () => {
		if (token) {
			return <Navbar.Brand href="/profile">GiveNet</Navbar.Brand>
		} else {
			return <Navbar.Brand href="/">GiveNet</Navbar.Brand>
		}
	}
	

	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Container>
					{getHomeState()}
					<Nav className="me-auto">
						<Nav.Link>
							<Link to="/profile" style={style}>
								Profile
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/tagging" style={style}>
								Tags & Categories
							</Link>
						</Nav.Link>
						<NavDropdown title="Pickups" className="me-auto">
							<NavDropdown.Item href="/pickupcreatedemo">Create Pickups</NavDropdown.Item>
							<NavDropdown.Item href="/pickupviewdemo">My Pickups</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="Listings" className="me-auto">
							<NavDropdown.Item href="/viewlistings">All Listings</NavDropdown.Item>
							<NavDropdown.Item href="/profile/listings">Create Listings</NavDropdown.Item>
							<NavDropdown.Item href="/mylistings">My Listings</NavDropdown.Item>
							<NavDropdown.Item href="/listingfilters">Search Listings</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Navbar.Text>
						{getAuthState()}
					</Navbar.Text>
				</Container>
			</Navbar>
		</>
	);
}
