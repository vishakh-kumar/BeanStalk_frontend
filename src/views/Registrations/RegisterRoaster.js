import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import AuthenticationContext from "../../AuthenticationContext";

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
import axios from "axios";
import axiosConfig from "../../helpers/axiosConfig";
import WhiteNavbar from "../../components/Navbars/WhiteNavbar";

function RegisterRoaster() {
  const {updateAuthentication} = useContext(AuthenticationContext);
  const history = useHistory();
  const [roasterForm, setRoasterForm] = useState({
    name: "",
    email: "",
    password: "",
    img_url: "",
    password_confirmation: "",
    registrationErrors: "",
  })

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

  const roasterFormChange = (event) => {
    setRoasterForm({ ...roasterForm, [event.target.name]: event.target.value })
  };

  const registerRoaster = function (event) {
    event.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/registrations`,
        {
          roaster: {
            name: roasterForm.name,
            email: roasterForm.email,
            password: roasterForm.password,
            password_confirmation:
              roasterForm.password_confirmation,
          },
        },
        axiosConfig
      )
      .then((res) => {
        updateAuthentication(res.data.roaster);
        history.push(`/roaster/${res.data.roaster.id}/settings`);
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  return (
    <>
      <WhiteNavbar />
      <div className="wrapper">
        <div
          className="page-header"
          style={{
            backgroundImage:
              "url(" +
              require("assets/img/roaster.jpg").default +
              ")",
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6" sm="8" xs="12">
                <Card className="card-register">
                  <CardTitle className="text-center" tag="h3">
                    <div>Sign up as a roaster</div>
                  </CardTitle>
                  <div className="login">
                    <p>
                      Want to discover, rate, and follow roasters?{" "}
                      <a href="" onClick={(e) => {
                        e.preventDefault()
                        history.push('/register/user')
                      }}>
                        Create a user account
                      </a>
                      .
                    </p>
                  </div>
                  <div className="division">
                    <div className="line l" />
                    <span>Info</span>
                    <div className="line r" />
                  </div>
                  <Form className="register-form" onSubmit={registerRoaster}>
                    <Input name="name" placeholder="Business Name (dba)" type="text" onChange={roasterFormChange} />
                    <Input name="email" placeholder="Email" type="text" onChange={roasterFormChange} />
                    <Input name="password" placeholder="Password" type="password" onChange={roasterFormChange} />
                    <Input name="password_confirmation" placeholder="Confirm Password" type="password" onChange={roasterFormChange} />
                    <Button block className="btn-round" color="default">
                      Create roaster account
                    </Button>
                  </Form>
                  <div className="login">
                    <p>
                      Already have an account?{" "}
                      <a href="" onClick={(e) => {
                        e.preventDefault()
                        history.push('/signin')
                      }}>
                        Sign in
                      </a>
                      .
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

export default RegisterRoaster;
