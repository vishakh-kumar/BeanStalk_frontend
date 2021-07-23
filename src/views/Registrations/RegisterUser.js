import React, {useState, useContext} from "react";
import {useHistory} from "react-router";
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
import WhiteNavbar from "../../components/Navbars/WhiteNavbar";
import axios from "axios";
import axiosConfig from "../../helpers/axiosConfig";

function RegisterUser() {
  const history = useHistory();
  const {updateAuthentication} = useContext(AuthenticationContext);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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
  }, []);

  const userFormChange = (e, name) => {
    setUserInfo({...userInfo, [name]: e.target.value})
  }

  const registerUser = (e) => {
    e.preventDefault();
    axios
        .post(
            `${process.env.REACT_APP_BACKEND_URL}/registrations`,
            {
              user: {
                name: userInfo.name,
                email: userInfo.email,
                password: userInfo.password,
                password_confirmation:
                    userInfo.password_confirmation,
              },
            },
            axiosConfig
        )
        .then((res) => {
          updateAuthentication(res.data.user)
          history.push(`/search`);
        })
        .catch((error) => {
          console.log("registration error", error);
        });
  }

  return (
    <>
      <WhiteNavbar />
      <div className="wrapper">
        <div
          className="page-header"
          style={{
            backgroundImage:
              "url(" +
              require("assets/img/latte.jpeg").default +
              ")",
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="6" md="6" sm="10" xs="12">
                <Card className="card-register">
                  <CardTitle className="text-center" tag="h3">
                    <div>Sign up</div>
                  </CardTitle>
                  <div className="login">
                    <p>
                      Are you a roaster?{" "}
                      <a href="" onClick={(e) => {
                        e.preventDefault()
                        history.push('/register/roaster')
                      }}>
                        Create a business account
                      </a>
                      .
                    </p>
                  </div>
                  <div className="division">
                    <div className="line l" />
                    <span>Info</span>
                    <div className="line r" />
                  </div>
                  <Form className="register-form" onSubmit={registerUser}>
                    <Input placeholder="Name" type="text" onChange={(e) => userFormChange(e, "name")} />
                    <Input placeholder="Email" type="text" onChange={(e) => userFormChange(e, "email")} />
                    <Input placeholder="Password" type="password" onChange={(e) => userFormChange(e, "password")} />
                    <Input placeholder="Confirm Password" type="password_confirmation" onChange={(e) => userFormChange(e, "password_confirmation")} />
                    <Button block className="btn-round" color="default">
                      Create account
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

export default RegisterUser;
