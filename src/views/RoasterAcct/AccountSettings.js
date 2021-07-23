import React, {useEffect, useState, useContext} from "react";
import {useParams} from "react-router";
import {useHistory} from "react-router";
import AuthenticationContext from "../../AuthenticationContext";
import axios from "axios";

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CustomInput,
} from "reactstrap";

// core components
import SettingsHeader from "./SettingsHeader.js";
import WhiteNavbar from "../../components/Navbars/WhiteNavbar";
import FooterBlack from "../../components/Footers/FooterBlack";
import ImageUpload from "../../components/ImageUpload";
import axiosConfig from "../../helpers/axiosConfig";

function AccountSettings() {
  const history = useHistory();
  const {id} = useParams();
  const {signedInUser, updateAuthentication} = useContext(AuthenticationContext);
  const [image, setImage] = useState(null);
  const [accountForm, setAccountForm] = useState({
    name: "",
    email: "",
    img_url: "",
    password_digest: "",
    address: "",
    phone: "",
    website: "",
    description: "",
  });

  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("settings-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    if (signedInUser !== null) {
      getRoaster();
      for (const [key, value] of Object.entries(signedInUser)) {
        console.log(key, value);
        setAccountForm(`${key}: ${value}`);
      }
    } else {
      history.push('/')
    }
    return function cleanup() {
      document.body.classList.remove("settings-page");
    }
  }, [signedInUser])

  const getRoaster = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/roasters/${id}`)
        .then(res => console.log(res))
  }

  const updateRoaster = async () => {
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/roasters/${id}`,
        accountForm,
        axiosConfig)
        .then(res => console.log(res))
  }

  const updateImage = async (img) => {
    const form = new FormData();
    form.append("image", img);

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/photos`, {
      header: {
        "Content-Type": "application/json;char=UTF-8",
        "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
      },
      method: "POST",
      body: form,
    })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAccountForm(prevState => ({...prevState, img_url: data.url}))
        });
  };

  return (
    <>
      <WhiteNavbar />
      {signedInUser &&
      <div className="wrapper">
        <SettingsHeader/>
        <div className="profile-content section">
          <h3 className="greeter">Welcome, {signedInUser.name}!</h3>
          <Container>
            <Row>

              <Col className="ml-auto mr-auto" md="6">
                <Form className="settings-form">
                  <Row>
                    <Col md="6" sm="6">
                      <FormGroup>
                        <Input
                            className="border-input"
                            placeholder="Name"
                            value={signedInUser.name ? signedInUser.name : accountForm.name}
                            type="text"
                            onChange={(e) => setAccountForm(prevState => ({...prevState, name: e.target.value}))}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="6">
                      <FormGroup>
                        <Input
                            className="border-input"
                            placeholder="Email"
                            value={signedInUser.email ? signedInUser.email : accountForm.email}
                            type="text"
                            onChange={(e) => setAccountForm(prevState => ({...prevState, email: e.target.value}))}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Input
                        className="border-input"
                        placeholder="Address"
                        value={signedInUser.address ? signedInUser.address : accountForm.address}
                        type="text"
                        onChange={(e) => setAccountForm(prevState => ({...prevState, address: e.target.value}))}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                        className="border-input"
                        placeholder="Phone"
                        value={signedInUser.phone ? signedInUser.phone : accountForm.phone}
                        type="text"
                        onChange={(e) => setAccountForm(prevState => ({...prevState, phone: e.target.value}))}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                        className="border-input"
                        placeholder="Website"
                        value={signedInUser.website ? signedInUser.website : accountForm.website}
                        type="text"
                        onChange={(e) => setAccountForm(prevState => ({...prevState, website: e.target.value}))}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                        placeholder="About Your Roaster"
                        className="textarea-limited"
                        type="textarea"
                        value={signedInUser.description ? signedInUser.description : accountForm.description}
                        onChange={(e) => setAccountForm(prevState => ({...prevState, description: e.target.value}))}
                        rows="3"
                    />
                  </FormGroup>

                  {(signedInUser && signedInUser.img_url) !== null ?
                      <>
                        <img className="active-image" src={signedInUser.img_url} />
                        <Button
                            className="btn-border btn-round mr-1"
                            color="default"
                            outline
                            type="button"
                            onClick={() => {
                              updateAuthentication({...signedInUser, img_url: null})
                              setAccountForm(prevState => ({...prevState, img_url: ""}))
                            }}
                        >
                          Remove Picture
                        </Button>
                      </>
                    :
                      <div className="image-box">
                        <ImageUpload imageSet={(img) => updateImage(img)} />
                      </div>
                    }

                  <div className="text-center">
                    <Button
                        className="btn-wd btn-round submit"
                        color="danger"
                        type="submit"
                        onClick={updateRoaster}
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>}
      <FooterBlack />
    </>
  );
}

export default AccountSettings;
