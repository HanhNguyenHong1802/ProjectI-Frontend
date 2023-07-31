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
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { Link } from "react-router-dom";

function RenderItem({ drink, user, updateDrink, deleteDrink }) {
  return (
    <div className="col-10 col-md-5 m-1">
      <Link to={`/menu/${drink._id}`}>
        <Card>
          <CardImg src={drink.image} className="card-img-top" />
          <CardBody>
            <CardTitle>{drink.name}</CardTitle>
          </CardBody>
        </Card>
      </Link>
      {user.user && user.user.isAdmin ? (
        <>
          <EditDrinkForm drink={drink} user={user} updateDrink={updateDrink} />
          <Button color="danger" size="sm" onClick={() => deleteDrink(drink)}>
            DELETE MEAL
          </Button>
        </>
      ) : null}
    </div>
  );
}

class EditDrinkForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleUpdateDrink = this.handleUpdateDrink.bind(this);
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  }

  handleUpdateDrink(event) {
    this.toggleModal();
    this.props.updateDrink({
      _id: this.props.drink._id,
      name: this.name.value,
      description: this.description.value,
      image: this.image.value,
      type: this.type.value,
      recommended: this.recommended.value,
      price: this.price.value,
    });
    event.preventDefault();
  }

  render() {
    return (
      <>
        {this.props.user.loggedIn && this.props.user.user.isAdmin ? (
          <Button color="success" size="sm" onClick={this.toggleModal}>
            EDIT MEAL
          </Button>
        ) : null}
        <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>EDIT MEAL</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleUpdateDrink}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={this.props.drink.name}
                  innerRef={(input) => (this.name = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  defaultValue={this.props.drink.description}
                  innerRef={(input) => (this.description = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="image">Image</Label>
                <Input
                  type="text"
                  id="image"
                  name="image"
                  defaultValue={this.props.drink.image}
                  innerRef={(input) => (this.image = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="typeSelect">Type</Label>
                <Input
                  type="select"
                  name="typeSelect"
                  id="typeSelect"
                  defaultValue={this.props.drink.type}
                  innerRef={(input) => (this.type = input)}
                >
                  <option value={"Coffee"}>Combo 1 người</option>
                  <option value={"ColdMeal"}>Thức ăn nhẹ</option>
                  <option value={"Other"}>Gà rán - Gà quay</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="msSelect">Recommended</Label>
                <Input
                  type="select"
                  name="msSelect"
                  id="msSelect"
                  defaultValue={this.props.drink.recommended}
                  innerRef={(input) => (this.recommended = input)}
                >
                  <option value={false}>NO</option>
                  <option value={true}>YES</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  min={1000}
                  id="price"
                  name="price"
                  defaultValue={this.props.drink.price}
                  innerRef={(input) => (this.price = input)}
                />
              </FormGroup>
              <Button type="submit" value="submit" color="success">
                EDIT
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

class AddDrinkForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddDrink = this.handleAddDrink.bind(this);
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  }

  handleAddDrink(event) {
    this.toggleModal();
    this.props.postDrink({
      name: this.name.value,
      description: this.description.value,
      image: this.image.value,
      type: this.type.value,
      recommended: this.recommended.value,
      price: this.price.value,
    });
  }

  render() {
    return (
      <>
        {this.props.user.loggedIn && this.props.user.user.isAdmin ? (
          <Button color="success" onClick={this.toggleModal}>
            Add Meal
          </Button>
        ) : null}
        <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>ADD Meal</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleAddDrink}>
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  innerRef={(input) => (this.name = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  innerRef={(input) => (this.description = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="image">Image</Label>
                <Input
                  type="text"
                  id="image"
                  name="image"
                  innerRef={(input) => (this.image = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="typeSelect">Type</Label>
                <Input
                  type="select"
                  name="typeSelect"
                  id="typeSelect"
                  innerRef={(input) => (this.type = input)}
                >
                  <option value={"Coffee"}>Combo 1 người</option>
                  <option value={"ColdMeal"}>Thức ăn nhẹ</option>
                  <option value={"Other"}>Gà rán - Gà quay</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="msSelect">Recommended</Label>
                <Input
                  type="select"
                  name="msSelect"
                  id="msSelect"
                  innerRef={(input) => (this.recommended = input)}
                >
                  <option value={false}>NO</option>
                  <option value={true}>YES</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Price</Label>
                <Input
                  type="number"
                  min={1000}
                  id="price"
                  name="price"
                  innerRef={(input) => (this.price = input)}
                />
              </FormGroup>
              <Button type="submit" value="submit" color="success">
                ADD Meal
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const Menu = (props) => {
  var recommended = props.drinks.drinks.map((drink) => {
    if (drink.recommended) {
      return (
        <RenderItem
          drink={drink}
          user={props.user}
          updateDrink={props.updateDrink}
          deleteDrink={props.deleteDrink}
          key={drink._id}
        />
      );
    }
    return null;
  });
  var coffee = props.drinks.drinks.map((drink) => {
    if (drink.type === "Coffee") {
      return (
        <RenderItem
          drink={drink}
          user={props.user}
          updateDrink={props.updateDrink}
          deleteDrink={props.deleteDrink}
          key={drink._id}
        />
      );
    }
    return null;
  });
  var coldDrink = props.drinks.drinks.map((drink) => {
    if (drink.type === "ColdMeal") {
      return (
        <RenderItem
          drink={drink}
          user={props.user}
          updateDrink={props.updateDrink}
          deleteDrink={props.deleteDrink}
          key={drink._id}
        />
      );
    }
    return null;
  });
  var Other = props.drinks.drinks.map((drink) => {
    if (drink.type === "Other") {
      return (
        <RenderItem
          drink={drink}
          user={props.user}
          updateDrink={props.updateDrink}
          deleteDrink={props.deleteDrink}
          key={drink._id}
        />
      );
    }
    return null;
  });

  return (
    <>
      <div style={{ padding: "30px" }}>
        <Row className=" justify-content-center">
          <h5>Recommended</h5>
        </Row>

        <Row
          className="m-1 justify-content-center"
          style={{ textAlign: "center" }}
        >
          {recommended}
        </Row>
        <br />
        <br />

        <Row className=" justify-content-center">
          <h5>Combo 1 người</h5>
        </Row>
        <Row
          className="m-1 justify-content-center"
          style={{ textAlign: "center" }}
        >
          {coffee}
        </Row>
        <br />
        <br />

        <Row className=" justify-content-center">
          <h5>Thức ăn nhẹ</h5>
        </Row>
        <Row
          className="m-1 justify-content-center"
          style={{ textAlign: "center" }}
        >
          {coldDrink}
        </Row>
        <br />
        <br />

        <Row className=" justify-content-center">
          <h5>Gà rán - Gà quay</h5>
        </Row>
        <Row
          className="m-1 justify-content-center"
          style={{ textAlign: "center" }}
        >
          {Other}
        </Row>
      </div>
      <div>
        <AddDrinkForm user={props.user} postDrink={props.postDrink} />
      </div>
    </>
  );
};

export default Menu;
