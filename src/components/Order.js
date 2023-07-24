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
      console.log(response);
      this.setState((prevState) => ({
        // items: response.filter(
        //   (item) => item.author === this.props.user.user.username && !item.paid
        // ),
        items: response,
      }));
    } catch (err) {}
  };
  // deleteOrders = async () => {

  // }
  render() {
    const { items } = this.state;
    const { user } = this.props;
    return (
      <div className="align-items-center">
        <div className="d-flex flex-wrap">
          {items.map((order) => {
            const item = order.orders[0];
            return (
              <OrderItem
                item={item}
                amount={order.totalAmount}
                user={user.user}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Order;
