import React, { Component } from "react";
import Button from "reactstrap/lib/Button";

class OrderComplete extends Component {
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
