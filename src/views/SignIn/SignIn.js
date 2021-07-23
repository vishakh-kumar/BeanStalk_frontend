import React from "react";
import axios from "axios";
import axiosConfig from "../../helpers/axiosConfig";
import { useState, useContext } from "react";
import AuthenticationContext from "../../AuthenticationContext";
import { useHistory } from "react-router";

// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import MultiDropdownNavbar from "components/Navbars/MultiDropdownNavbar.js";

function SignIn(props) {
  const history = useHistory();
  const {updateAuthentication} = useContext(AuthenticationContext);

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    document.body.classList.add("full-screen");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("register-page");
      document.body.classList.remove("full-screen");
    };
  });

  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name) => (event) => {
    console.log()
    setSignIn({ ...signIn, [name]: event.target.value });
  };

  const handleSignIn = function () {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/sessions`,
        {
          account: {
            email: signIn.email,
            password: signIn.password,
          },
        },
        axiosConfig
      )
      .then((res) => {
        if (res.data.hasOwnProperty('roaster')) {
          updateAuthentication(res.data.roaster);
          history.push(`/roaster/${res.data.roaster.id}/settings`);
        } else if (res.data.hasOwnProperty('user')) {
          updateAuthentication(res.data.user);
          history.push(`/search`)
        }

      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  return (
    <>
      <MultiDropdownNavbar />
      <div className="wrapper">
        <div
          className="page-header"
          style={{
            backgroundImage:
              "url(" +
              require("assets/img/Espresso.jpg").default +
              ")",
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="6" md="6" sm="8" xs="12">
                <Card className="card-register">
                  <CardTitle className="text-center" tag="h3">
                    <div>Sign in</div>
                  </CardTitle>
                  <div className="login">
                    <p>
                      New around here?{" "}
                      <a href="" onClick={(e) => {
                        e.preventDefault()
                        history.push('/register/user')
                      }}>
                        Create an account
                      </a>
                      .
                    </p>
                  </div>
                  <div className="division">
                    <div className="line l" />
                    <span>Info</span>
                    <div className="line r" />
                  </div>
                  <Form className="register-form" onSubmit={handleSignIn}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={signIn.email}
                      onChange={handleChange("email")}
                    />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={signIn.password}
                      onChange={handleChange("password")}
                    />
                    <Button
                      block className="btn-round"
                      color="default"
                      onClick={() => handleSignIn()}
                    >
                      Sign In
                    </Button>
                  </Form>
                  <div className="login">
                    <p>
                      <a href="" onClick={(e) => {
                        e.preventDefault()
                        history.push('/register/user')
                      }}>
                        Forgot your password?
                      </a>
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
          <div className="demo-footer text-center">
            <h6>
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Beanstalk Productions
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
