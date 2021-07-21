/*eslint-disable*/
import React from "react";
import {useHistory} from "react-router";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components

function FooterBlack() {
  const history = useHistory();

  return (
    <>
      <footer className="footer footer-black footer-white">
        <Container>
          <Row>
            <nav className="footer-nav">
              <ul>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      history.push('/')
                    }}
                    className="mr-1"
                  >
                    Beanstalk
                  </a>
                </li>
                {/*<li>*/}
                {/*  <a*/}
                {/*    href="http://blog.creative-tim.com/?ref=pkpr-black-footer"*/}
                {/*    target="_blank"*/}
                {/*    className="mr-1"*/}
                {/*  >*/}
                {/*    Blog*/}
                {/*  </a>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*  <a*/}
                {/*    href="https://www.creative-tim.com/license?ref=pkpr-black-footer"*/}
                {/*    target="_blank"*/}
                {/*  >*/}
                {/*    Licenses*/}
                {/*  </a>*/}
                {/*</li>*/}
              </ul>
            </nav>
            <div className="credits ml-auto">
              <span className="copyright">
                © {new Date().getFullYear()}
                , made with <i className="fa fa-heart heart" /> by Beanstalk Productions
              </span>
            </div>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default FooterBlack;
