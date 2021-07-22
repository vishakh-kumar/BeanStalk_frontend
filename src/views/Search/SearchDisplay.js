import MultiDropdownNavbar from "../../components/Navbars/MultiDropdownNavbar";
import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Input,
    InputGroupAddon,
    InputGroup,
    InputGroupText, Button,
} from "reactstrap";
import "./SearchDisplay.css";
import FooterBlack from "../../components/Footers/FooterBlack";

export default function SearchDisplay() {
    const [roasterList, setRoasterList] = useState(null);
    const [displayCount, setDisplayCount] = useState(10);
    const history = useHistory();


    useEffect(() => {
        getRoasters();
    }, [])

    const getRoasters = async () => {
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;char=UTF-8",
                "Access-Control-Allow-Origin": `${process.env.REACT_APP_BACKEND_URL}`,
                "withCredentials": "true"
            },
        };
        try {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/roasters`, axiosConfig)
                .then(res => {
                    console.log(res)
                    setRoasterList(res.data.roaster)
                })
        } catch (e) {
            console.log(e)
        }
    }

    const displayCounter = () => {
        if (displayCount > roasterList.length) {
            setDisplayCount(roasterList.length)
        }
        return displayCount;
    }

    return (
        <>
            <MultiDropdownNavbar colorPointOverride={0} />
            <div className="wrapper">
                <div className="section text-center landing-section">
                    <Container>
                        <Row>
                            <Col className="mr-auto " xs="12" md="6">
                                <h3 className="title search-title">Explore roasters</h3>  {/* search-title from local css */}
                                <InputGroup>
                                    {/* Since the css properties cannot check the previous sibling of an element and for the design consistency we recommend to use the "input-group-addon" after the "form-control" like in this example */}
                                    <Input placeholder="Search roaster, roast, location" type="text" />
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText>
                                            <i className="nc-icon nc-zoom-split" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>

                                <div>
                                    <h3 className="trends">Trending</h3>
                                    <div className="trending">
                                        {roasterList && roasterList.map((roaster, idx) => {
                                            if (idx < 5) return (
                                                <div key={roaster.id} className="roaster-small">
                                                    <img src={roaster.img_url} />
                                                    <div className="rating">
                                                        <i className={`fa fa-heart ${true ? "filled" : ""}`} />
                                                        <i className={`fa fa-heart ${true ? "filled" : ""}`} />
                                                        <i className={`fa fa-heart ${true ? "filled" : ""}`} />
                                                        <i className={`fa fa-heart ${true ? "filled" : ""}`} />
                                                        <i className={`fa fa-heart ${true ? "filled" : ""}`} />
                                                    </div>
                                                    <div className="name">{roaster.name}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="trends">Top rated</h3>
                                    <div className="trending">
                                        {roasterList && roasterList.map((roaster, idx) => {
                                            if (idx > 6 && idx < 12) return (
                                                <div key={roaster.id} className="roaster-small">
                                                    <img src={roaster.img_url} />
                                                    <div className="rating">
                                                        <i className={`fa fa-heart ${true ? "filled" : ""}`} />
                                                        <i className={`fa fa-heart ${true ? "filled" : ""}`} />
                                                        <i className={`fa fa-heart ${true ? "filled" : ""}`} />
                                                        <i className={`fa fa-heart ${true ? "filled" : ""}`} />
                                                        <i className={`fa fa-heart ${true ? "filled" : ""}`} />
                                                    </div>
                                                    <div className="name">{roaster.name}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="full-list">
                                    {roasterList &&
                                    <>
                                        <h5 className="display-count">Displaying {displayCounter()} of {roasterList.length} roasters</h5>
                                        {roasterList.map((roaster, idx) => {
                                            if (idx < displayCount) return (
                                                <div key={roaster.id} className="roaster-full" onClick={(e) => {
                                                    if (e.target instanceof HTMLAnchorElement ) {
                                                        console.log("Not a redirect")
                                                    } else {
                                                        history.push(`/roaster/${roaster.id}`)
                                                    }
                                                }}>
                                                    <img src={roaster.img_url}/>
                                                    <div className="infoline">
                                                        <div className="first-info">
                                                            <p className="fullname">{roaster.name}</p>
                                                            <div className="rating">
                                                                <i className={`fa fa-heart ${true ? "filled" : ""}`}/>
                                                                <i className={`fa fa-heart ${true ? "filled" : ""}`}/>
                                                                <i className={`fa fa-heart ${true ? "filled" : ""}`}/>
                                                                <i className={`fa fa-heart ${true ? "filled" : ""}`}/>
                                                                <i className={`fa fa-heart ${true ? "filled" : ""}`}/>
                                                            </div>
                                                        </div>
                                                        <div className="second-info">
                                                            <p className="roast-count">{roaster.roast.length} different roasts</p>
                                                            <a href="http://www.google.com" className="roaster-site">www.beanstalk.com</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        {(displayCount !== roasterList.length) &&
                                            <Button
                                                className="btn-round btn-magnify"
                                                color="danger"
                                                onClick={() => setDisplayCount(prevState => prevState + 10)}
                                            >
                                                Show More
                                            </Button>
                                        }
                                    </>
                                    }
                                </div>

                            </Col>
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