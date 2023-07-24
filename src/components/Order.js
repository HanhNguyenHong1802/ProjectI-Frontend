import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], // Array to store order items
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }
  fetchOrders = async () => {
    try {
      var response = await fetch(
        baseUrl + "orders?author=" + this.props.user.user.username,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        var err = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        err.response = response;
        throw err;
      }

      response = await response.json();
      console.log(response);
      this.setState((prevState) => ({
        items: response,
      }));
    } catch (err) {}
  };
  handleOrder = async (event) => {};
  render() {
    const { items } = this.state;
    return (
      <div className="align-items-center">
        <div className="d-flex flex-wrap">
          {items.map((order) => {
            const item = order.orders[0];
            return (
              <div className=" col-10 col-md-5 m-1">
                <Card>
                  <CardImg src={item.image} className="card-img-top" />
                  <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardText>{item.description}</CardText>
                    <CardText>{item.price * order.totalAmount} VND</CardText>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
        <Button color="success" onClick={() => this.handleOrder()}>
          Order
        </Button>
      </div>
    );
  }
}
export default Order;
