import React from "react";
import {useContext} from "react";
import AuthenticationContext from "../../AuthenticationContext";
import {useHistory} from "react-router";
import { Link } from "react-router-dom";
import {Redirect} from "react-router";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";
import axios from "axios";
import axiosConfig from "../../helpers/axiosConfig";
// core components

function WhiteNavbar() {
  const {signedInUser, updateAuthentication} = useContext(AuthenticationContext);
  const [bodyClick, setBodyClick] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  });

  const logout = async () => {
    axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/logout`, axiosConfig)
        .then((response) => {
          updateAuthentication(null);
          return <Redirect to='/' />
        })
        .catch((error) => {
          console.log("registration error", error);
        });
  }

  return (
    <>
      {bodyClick ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setBodyClick(false);
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className="fixed-top" expand="lg" id="navbar-main">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand id="navbar-brand" tag={Link} onClick={() => history.push('/')}>
              Beanstalk
            </NavbarBrand>
            <button
              className="navbar-toggler"
              id="navigation"
              type="button"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setBodyClick(true);
                setCollapseOpen(true);
              }}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              {signedInUser ?
                  <>
                    <Button
                        className="btn-round"
                        color="link"
                        onClick={(e) => e.preventDefault()}
                    >
                      {signedInUser.name}
                    </Button>
                    <Button
                        className="btn-round"
                        color="link"
                        onClick={(e) => {
                          e.preventDefault()
                          logout();
                        }}
                    >
                      Logout
                    </Button>
                  </>
                   :
                  <>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle className="mr-2" color="default" caret nav>
                        Sign Up
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-danger" right>
                        <DropdownItem to="/register/roaster" tag={Link}>
                          For Roasters
                        </DropdownItem>
                        <DropdownItem to="/register/user" tag={Link}>
                          For Coffee Drinkers
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>
                      <Button
                          className="btn-round btn-magnify"
                          color="danger"
                          href="/signin"
                      >
                        <i className="nc-icon nc-circle-10"/> Sign In
                      </Button>
                    </NavItem>
                  </>
              }
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default WhiteNavbar;
