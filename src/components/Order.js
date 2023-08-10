import React, { Component } from "react";
import { Button } from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import OrderItem from "./OrderItem";
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
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
      let tmp = JSON.parse(localStorage.getItem("user"));
      this.setState((prevState) => ({
        items: response.filter(
          (item) => item?.author?.username === tmp?.username && !item?.paid
        ),
      }));
    } catch (err) {}
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
          }}
          disabled={items.length === 0}
          color={items.length === 0 ? "secondary" : "success"}
        >
          Complete Order
        </Button>
      </div>
    );
  }
}

export default Order;
