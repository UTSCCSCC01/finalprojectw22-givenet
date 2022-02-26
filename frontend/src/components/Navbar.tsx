import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const style = { textDecoration: "none" };

export default function Navigation() {
	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="/">GiveNet</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link>
							<Link to="/" style={style}>
								Home
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/" style={style}>
								About Us
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/" style={style}>
								Contact
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/" style={style}>
								Learn More
							</Link>
						</Nav.Link>
					</Nav>
					<Navbar.Text>
						<Link to="/login" style={style}>
							Login
						</Link>{" "}
					</Navbar.Text>
				</Container>
			</Navbar>
		</>
	);
}
