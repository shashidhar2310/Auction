import React from 'react';
import { Container, Row, Col, Button, Carousel, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <Container fluid className="p-0">
      {/* Carousel Section */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://picsum.photos/900/500"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Experience the Thrill of IPL Auctions</h3>
            <p>Join the excitement and bid for your favorite players.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://picsum.photos/900/500"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Build Your Dream Team</h3>
            <p>Strategize and create a team that stands out.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://picsum.photos/900/500"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Compete with Friends</h3>
            <p>Challenge your friends and see who can assemble the best team.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Welcome Section */}
      <Container className="my-5 text-center">
        <Row>
          <Col>
            <h1>Welcome to IPL Auction</h1>
            <p className="lead">
              Dive into the world of cricket auctions. Bid on your favorite players and build the ultimate team to compete in the league.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/register">
                <Button variant="primary">Register</Button>
              </Link>
              <Link to="/login">
                <Button variant="success">Login</Button>
              </Link>
              <Link to="/auction">
                <Button variant="warning">Go to Auction</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="my-5">
        <Row>
          <Col md={4}>
            <Card className="text-center feature-card">
              <Card.Img variant="top" src="https://picsum.photos/300/200" className="card-img" />
              <Card.Body>
                <Card.Title>Real-time Bidding</Card.Title>
                <Card.Text>
                  Engage in live auctions with participants from around the world.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center feature-card">
              <Card.Img variant="top" src="https://picsum.photos/300/200" className="card-img" />
              <Card.Body>
                <Card.Title>Comprehensive Player Stats</Card.Title>
                <Card.Text>
                  Access detailed statistics to make informed bidding decisions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center feature-card">
              <Card.Img variant="top" src="https://picsum.photos/300/200" className="card-img" />
              <Card.Body>
                <Card.Title>Secure Transactions</Card.Title>
                <Card.Text>
                  Experience safe and secure bidding with our trusted platform.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3">
        <Container>
          <p>&copy; {new Date().getFullYear()} IPL Auction. All Rights Reserved.</p>
        </Container>
      </footer>
    </Container>
  );
};

export default Home;
