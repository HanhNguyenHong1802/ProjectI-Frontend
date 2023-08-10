import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Button,
  FormGroup,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.amount,
      isDelete: false,
      isPaid: props.isPaid,
    };
  }
  increment = (event) => {
    event.preventDefault();
    this.setState({ count: this.state.count + 1 }, event.preventDefault(event));
  };
  decrement = (event) => {
    event.preventDefault();
    if (this.state.count > 1)
      this.setState(
        { count: this.state.count - 1 },

        event.preventDefault(event)
      );
  };
  handleOrder = async (event) => {
    event.preventDefault();
    var order = {
      author: localStorage.getItem("userid"),
      table: this.props.table,
      orders: this.props.drink,
      totalAmount: this.state.count,
      paid: true,
    };
    var bearer = "Bearer " + localStorage.getItem("token");

    try {
      var response = await fetch(baseUrl + "orders/" + this.props.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        var err = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        err.response = response;
        throw err;
      }

      response = await response.json();
      this.setState({ isPaid: true });
    } catch (err) {}
  };
  handleDeleteOrder = async (event) => {
    event.preventDefault();
    var bearer = "Bearer " + localStorage.getItem("token");

    try {
      var response = await fetch(baseUrl + "orders/" + this.props.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      });

      if (!response.ok) {
        var err = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        err.response = response;
        throw err;
      }

      response = await response.json();
      this.setState({ isDelete: true });
    } catch (err) {}
  };
  render() {
    const { item, table } = this.props;
    const { amount } = this.props;
    return (
      <div className=" col-10 col-md-5 m-1" hidden={this.state.isPaid}>
        <Card>
          <CardImg src={item.image} className="card-img-top" />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            <CardText>{item.description}</CardText>
            <CardText>{item.price * this.state.count} VND</CardText>
            <FormGroup>
              <button
                onClick={(e) => this.increment(e, amount)}
                className="counter"
              >
                +
              </button>
              <button
                onClick={(e) => this.decrement(e, amount)}
                className="counter"
              >
                -
              </button>
              <h2>{this.state.count}</h2>
            </FormGroup>
            <Button color="success" onClick={(e) => this.handleDeleteOrder(e)}>
              Delete this order
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default OrderItem;
