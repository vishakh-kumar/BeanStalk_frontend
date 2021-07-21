import React from "react";
import {useState} from "react";
import {useHistory} from "react-router";

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
import MultiDropdownNavbar from "../../components/Navbars/MultiDropdownNavbar";

function RegisterUser() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
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
    console.log(userInfo);
  }

  return (
    <>
      <MultiDropdownNavbar />
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
                    <Input placeholder="Confirm Password" type="password" onChange={(e) => userFormChange(e, "confirm")} />
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
