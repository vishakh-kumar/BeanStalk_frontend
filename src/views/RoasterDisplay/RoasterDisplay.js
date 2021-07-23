import WhiteNavbar from "../../components/Navbars/WhiteNavbar";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import axios from "axios";
import axiosConfig from "../../helpers/axiosConfig";
import {
    Container,
    Row,
    Col,
    Input,
    InputGroupAddon,
    InputGroup,
    InputGroupText, Button,
} from "reactstrap";
import "./RoasterDisplay.css";
import FooterBlack from "../../components/Footers/FooterBlack";

export default function RoasterDisplay(props) {
    const [roaster, setRoaster] = useState(null);
    const [displayCount, setDisplayCount] = useState(10);
    let {id} = useParams();

    useEffect(() => {
        getRoasters();
    }, [])

    const getRoasters = async () => {
        try {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/roasters/${id}`, axiosConfig)
                .then(res => {
                    console.log(res)
                    setRoaster(res.data.roaster)
                })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <WhiteNavbar />
            <div className="wrapper">
                <div className="section text-center landing-section">
                    <Container>
                        <Row>
                            {roaster &&
                            <Col className="mr-auto " xs="12" md="6">
                                <h3 className="title search-title">{roaster.name}</h3>  {/* search-title from local css */}
                                <InputGroup>
                                    <Input placeholder="Search roaster, roast, location" type="text"/>
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText>
                                            <i className="nc-icon nc-zoom-split"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Col>}
                        </Row>

                        <Row>

                        </Row>
                    </Container>
                </div>
            </div>
            <FooterBlack />
        </>
    )
}