import React, { Component } from "react";
import { Button } from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import OrderItem from "./OrderItem";
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
          (item) => item?.author?.username === tmp?.username && !item?.complete
        ),
      }));
    } catch (err) {}
  };
  handleOrder = async (event, order) => {
    event.preventDefault();
    var orderItem = {
      author: localStorage.getItem("userid"),
      table: order.table,
      orders: order.drink,
      totalAmount: order.count,
      paid: true,
      complete: true,
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
  handleCompleteOrder = async (event) => {
    event.preventDefault();
    Promise.all(
      this.state.items.map((order) => {
        return this.handleOrder(event, order);
      })
    ).then(() => {
      this.fetchOrders();
    });
  };

  render() {
    const { items } = this.state;
    return (
      <div className="align-items-center">
        <div className="d-flex flex-wrap">
          {items.map((order) => {
            const item = order.orders[0];
            return (
              <OrderItem
                item={item}
                amount={order.totalAmount}
                isPaid={order.paid}
                table={order.table}
                id={order._id}
              />
            );
          })}
        </div>
        <Button
          onClick={(e) => {
            alert("Open camera to scan QR code");
            this.handleCompleteOrder(e);
          }}
          disabled={
            items.filter((item) => !item.paid || item?.complete).length > 0 ||
            items.length === 0
          }
          color={
            items.filter((item) => !item.paid || item?.complete).length > 0 ||
            items.length === 0
              ? "secondary"
              : "success"
          }
        >
          Complete Order
        </Button>
      </div>
    );
  }
}

export default Order;
