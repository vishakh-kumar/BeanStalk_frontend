import React from "react";
import "./Homepage.css";
import {useHistory} from "react-router";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// core components

function HomepageMain() {
  let history = useHistory();
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        className="page-header"
        ref={pageHeader}
        style={{
          backgroundImage:
            "url(" +
            require("assets/img/coffeeBeans.jpg").default +
            ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="main-title">Life is but a bean</h1>
              <h3 className="description">
                Discover and review unique coffee roasters
              </h3>
              <br />
              <Row>
                <Col md={{ size: 4, order: 2, offset: 4 }} >
                  <Button
                    className="btn-round btn-move-right mr-1"
                    block
                    color="danger"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push('/search')
                    }}
                  >
                    Get Started <i className="nc-icon nc-minimal-right" />
                  </Button>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default HomepageMain;
