import React from "react";
import axios from "axios";
import {useState} from "react";

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
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("full-screen");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
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
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;char=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "withCredentials": true
      },
    };
    axios
        .post(
            "https://beanstalk-api.herokuapp.com/sessions",
            {
              roaster: {
                email: signIn.email,
                password: signIn.password,
              },
            },
            axiosConfig
        )
        .then((response) => {
          console.log("registration res", response);
          props.signIn(response.data.roaster.email);
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
              require("assets/img/beans.jpg").default +
              ")",
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6" sm="6">
                <Card className="card-register">
                  <CardTitle tag="h3">Welcome</CardTitle>
                  <Form className="register-form">
                    <label>Email</label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={signIn.email}
                        onChange={handleChange("email")}
                        autocomplete
                        required
                    />
                    <label>Password</label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={signIn.password}
                        onChange={handleChange("password")}
                        autocomplete
                        required
                    />
                    <Button
                        block className="btn-round"
                        color="danger"
                        onClick={() => handleSignIn()}
                    >
                      Sign In
                    </Button>
                  </Form>
                  <div className="forgot">
                    <Button
                      className="btn-link"
                      color="danger"
                    >
                      Forgot password?
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
            <div className="demo-footer text-center">
              <h6>
                © {new Date().getFullYear()}, made with{" "}
                <i className="fa fa-heart heart" /> by Beanstalk Productions
              </h6>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default SignIn;
