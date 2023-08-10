import React, { Component } from "react";
import Button from "reactstrap/lib/Button";
import { baseUrl } from "../shared/baseUrl";

class OrderComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  fetchOrders = async () => {
    try {
      var response = await fetch(baseUrl + "orders", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        var err = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        err.response = response;
        throw err;
      }

      response = await response.json();
      console.log(
        response[0].author._id.toString,
        localStorage.getItem("userid")
      );
      let tmp = JSON.parse(localStorage.getItem("user"));
      this.setState((prevState) => ({
        items: response.filter(
          (item) => item?.author?.username === tmp?.username && !item?.paid
        ),
      }));
    } catch (err) {}
  };
  handleOrder = async (order) => {
    var orderItem = {
      author: localStorage.getItem("userid"),
      table: order.table,
      orders: order.drink,
      totalAmount: order.count,
      paid: true,
    };
    var bearer = "Bearer " + localStorage.getItem("token");

    try {
      var response = await fetch(baseUrl + "orders/" + order._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
        body: JSON.stringify(orderItem),
      });

      if (!response.ok) {
        var err = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        err.response = response;
        throw err;
      }

      response = await response.json();
    } catch (err) {}
  };
  handleCompleteOrder = async () => {
    await this.fetchOrders();
    Promise.all(
      this.state.items.map((order) => {
        return this.handleOrder(order);
      })
    ).then(() => {
      this.fetchOrders();
    });
  };
  componentDidMount() {
    this.handleCompleteOrder();
  }
  render() {
    return (
      <div className="align-items-center">
        <h1>Order Complete</h1>
        <Button>
          <a href="/menu">Back to Menu</a>
        </Button>
      </div>
    );
  }
}
export default OrderComplete;
