import React, { Component } from "react";
import {
  Row,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Form,
  FormGroup,
  BreadcrumbItem,
  Breadcrumb,
  CardText,
} from "reactstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";
import ReactStars from "react-rating-stars-component";

function RenderItem({ drink }) {
  return (
    <div className="col-10 col-md-5 m-1">
      <Card>
        <CardImg src={drink.image} className="card-img-top" />
        <CardBody>
          <CardTitle>{drink.name}</CardTitle>
          <CardText>{drink.description}</CardText>
          <CardText>{drink.price} VND</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
class OrderNowForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      count: 1,
    };
    //if(this.state.count<0) this.state.count=0;
    this.toggleModal = this.toggleModal.bind(this);
    this.handleOrderNow = this.handleOrderNow.bind(this);
  }
  // componentDidMount() {
  //   this.props.getOrder();
  // }
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    //cancel, close
    this.onClear();
    this.onCloseForm();
  };
  onCloseForm = () => {
    this.props.onCloseForm();
  };
  onClear = () => {
    this.setState({
      name: "",
      status: false,
    });
  };

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  }

  handleOrderNow(event) {
    this.toggleModal();
    this.props.postOrderModal({
      content: this.content.value,
      quantity: this.quantity.value,
      drink: this.props.drink._id,
    });
  }

  increment = (event) => {
    this.setState({ count: this.state.count + 1 }, event.preventDefault(event));
  };
  decrement = (event) => {
    if (this.state.count > 1)
      this.setState(
        { count: this.state.count - 1 },

        event.preventDefault(event)
      );
  };

  message = async (event) => {
    event.preventDefault();
    var order = {
      author: localStorage.getItem("userid"),
      table: localStorage.getItem("table"),
      orders: this.props.drink,
      totalAmount: this.state.count,
      paid: false,
    };
    var bearer = "Bearer " + localStorage.getItem("token");
    try {
      var response = await fetch(baseUrl + "orders/", {
        method: "POST",
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
      if (response._id) {
        console.log(response);
        alert("Order successfully");
      }
    } catch (err) {}
    this.toggleModal();
  };
  render() {
    console.log(this.props.user.user);
    return (
      <>
        {this.props.user.loggedIn && !this.props.user.user.isAdmin ? (
          <Button color="success" onClick={this.toggleModal}>
            Order now
          </Button>
        ) : null}
        <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Order Now</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleOrderNow}>
              <FormGroup>
                <button onClick={this.increment} className="counter">
                  +
                </button>
                <button onClick={this.decrement} className="counter">
                  -
                </button>
                <h2>{this.state.count}</h2>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="content">Note</Label>
                <Input
                  type="textarea"
                  id="content"
                  name="content"
                  innerRef={(input) => (this.content = input)}
                />
              </FormGroup>
              <Button
                type="submit"
                value="submit"
                color="success"
                onClick={this.message}
              >
                ORDER
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
class AddCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  }

  handleAddComment(event) {
    event.preventDefault();
    this.props.postComment({
      content: this.content.value,
      rating: this.rating.value,
      drink: this.props.drink._id,
    });
    this.toggleModal();
  }

  render() {
    return (
      <>
        {this.props.user.loggedIn && !this.props.user.user.isAdmin ? (
          <Button color="success" onClick={this.toggleModal}>
            Add Comment
          </Button>
        ) : null}

        <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>ADD COMMENT</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleAddComment}>
              <FormGroup>
                <Label for="ratingSelect">Rating</Label>
                <Input
                  type="select"
                  name="ratingSelect"
                  id="ratingSelect"
                  innerRef={(input) => (this.rating = input)}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="content">Comment</Label>
                <Input
                  type="textarea"
                  id="content"
                  name="content"
                  innerRef={(input) => (this.content = input)}
                />
              </FormGroup>
              <Button type="submit" value="submit" color="success">
                Add Meal
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

function RenderComments({ drink, comments, postComment, user, deleteComment }) {
  return (
    <div className="col-10 col-md-5 m-1">
      <h5>Comments</h5>
      <ul>
        {comments.map((comment) => {
          return (
            <React.Fragment key={comment._id}>
              <li>
                <ReactStars value={comment.rating} edit={false} />
                {comment.content}
                <br /> -- {comment.author.nickname}
              </li>
              {user.user && user.user.isAdmin ? (
                <Button
                  outline
                  color="danger"
                  size="sm"
                  onClick={() => deleteComment(comment)}
                >
                  DELETE COMMENT
                </Button>
              ) : null}
            </React.Fragment>
          );
        })}
      </ul>
      <br />
      <br />
      <OrderNowForm
        drink={drink}
        // getOrder={getOrder}
        // postOrder={postOrder}
        user={user}
      />
      <AddCommentForm drink={drink} postComment={postComment} user={user} />
    </div>
  );
}

const MenuItem = (props) => {
  if (props.drink) {
    return (
      <>
        <div>
          <Row>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.drink.name}</BreadcrumbItem>
            </Breadcrumb>
          </Row>
          <Row className="m-1 justify-content-center">
            <RenderItem drink={props.drink} />
            <RenderComments
              drink={props.drink}
              comments={props.comments}
              postComment={props.postComment}
              postOrderModal={props.postOrderModal}
              user={props.user}
              // orders={this.props.orders}
              // postOrder={this.props.postOrder}
              // getOrder={this.props.getOrder}
              // updateOrder={this.props.updateOrder}
              deleteComment={props.deleteComment}
            />
          </Row>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default MenuItem;
