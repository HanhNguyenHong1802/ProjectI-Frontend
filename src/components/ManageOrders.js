import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Form,
  FormGroup,
  Row,
} from "reactstrap";
import React, { Component, useState, useEffect } from "react";
import { baseUrl } from "../shared/baseUrl";

function RenderOrder({ order }) {
  return (
    <tr key={order._id}>
      <th></th>
      <td>{order.table}</td>
      <td>{order.totalAmount}</td>
      <td>{order.paid ? "Yes" : "No"}</td>
      <td>{order.orders[0].name}</td>
      <td>{order.orders[0].price}</td>
    </tr>
  );
}

function ManageOrders(props) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
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
      setItems(response.filter((item) => item.complete === true));
    } catch (err) {}
  };
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th></th>
            <th>Table</th>
            <th>Total Amount</th>
            <th>Paid</th>
            <th>Meal</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((order) => {
            return <RenderOrder order={order} />;
          })}
        </tbody>
      </Table>
    </>
  );
}
export default ManageOrders;
