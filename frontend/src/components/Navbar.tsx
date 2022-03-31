import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const style = { textDecoration: "none" };

// Simple navigation bar
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
              <Link to="/pickups" style={style}>
                Pickups
              </Link>
            </Nav.Link>
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
						<Nav.Link>
							<Link to="/viewlistings" style={style}>
								View Listings
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/profile/listings" style={style}>
								Create Listing
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/mylistings" style={style}>
								My listings
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/listingfilters" style={style}>
								Listing Search
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/pickups/past" style={style}>
								Past Pickup
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
