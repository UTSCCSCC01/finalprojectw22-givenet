import React from 'react';
import { Container, Row } from 'react-bootstrap';
import MapContainer from '../components/Map';
import Navbar from "../components/Navbar";
import ViewListings from '../components/ViewListings';

const ListingsPage = () => {
  return (
    <div>
      <Navbar />
    <div className="container">
        <h1 id="view-listings-title">ALL ACTIVE LISTINGS</h1>
        <ViewListings isUserListings={false}/>
        <Container>
        <br /><br />
        <h1 id="view-listings-title">Listings Map</h1>
        <br />
        <Row className="justify-content-center">
            <MapContainer />
        </Row>
        </Container>
        <br /><br /><br /><br />
    </div>
    </div>
    

  )
}

export default ListingsPage