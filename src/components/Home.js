import React, { useEffect } from "react";
import { Row, Card, CardImg, CardBody, CardTitle } from "reactstrap";
import Image from "react-bootstrap/Image";
import { baseUrl } from "../shared/baseUrl";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home(props) {
  useEffect(() => {
    let urlParams = window.location.search;
    if (urlParams) {
      let params = urlParams.split("=");
      localStorage.setItem("table", params[1]);
    }
    console.log(urlParams);
  }, []);
  return (
    <>
      <div>
        <Row className=" justify-content-center">
          {/* <Image className="col-10 col-md-10 m-1" src= {baseUrl+"images/gacuon.jpg"} fluid/> */}
          <Carousel autoPlay infiniteLoop>
            <div>
              <Image
                className="col-10 col-md-10 m-1"
                src={baseUrl + "images/gacuon.jpg"}
              />
            </div>
            <div>
              <Image
                className="col-10 col-md-10 m-1"
                src={baseUrl + "images/buatruavuive.webp"}
              />
            </div>
            <div>
              <Image
                className="col-10 col-md-10 m-1"
                src={baseUrl + "images/Homde-phase2.webp"}
              />
            </div>
          </Carousel>
        </Row>
        <Row className="mx-5 justify-content-center">
          <div className="col-12 col-md m-1">
            <Link to="/menu">
              <Card>
                <CardImg
                  src={baseUrl + "images/GA.jpg"}
                  className="card-img-top"
                />
                <CardBody>
                  <CardTitle>{"Combo 1 người"}</CardTitle>
                </CardBody>
              </Card>
            </Link>
          </div>
          <div className="col-12 col-md m-1">
            <Link to="/menu">
              <Card>
                <CardImg
                  src={baseUrl + "images/combo_1_nguoi.jpg"}
                  className="card-img-top"
                />
                <CardBody>
                  <CardTitle>{"Thức ăn nhẹ"}</CardTitle>
                </CardBody>
              </Card>
            </Link>
          </div>
          <div className="col-12 col-md m-1">
            <Link to="/menu">
              <Card>
                <CardImg
                  src={baseUrl + "images/COM.jpg"}
                  className="card-img-top"
                />
                <CardBody>
                  <CardTitle>{"Gà rán - Gà quay"}</CardTitle>
                </CardBody>
              </Card>
            </Link>
          </div>
        </Row>
      </div>
      Bàn số :{localStorage.getItem("table")}
    </>
  );
}

export default Home;
