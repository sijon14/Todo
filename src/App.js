import "./App.css";
import React, { Component } from "react";
import Todoinput from "./components/Todoinput";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "uuid";

//uuid creates a unique ID
export default class App extends Component {
  state = {
    items: [],
    id: uuid(),
    item: "",
    editItem: false
  };

  //this method will hande the event and change the value of item
  handleChange = e => {
    this.setState({
      item: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const newItem = {
      id: this.state.id,
      title: this.state.item
    };
    console.log(newItem);

    //spread operator
    //When CLICKED on 'ADD ITEM' => spread operator adds and updates the state to newItem >
    const updatedItems = [...this.state.items, newItem];

    this.setState({
      items: updatedItems,
      item: "",
      // Here when uuid() function is run creates new id when creating updated items to ToDolist
      id: uuid(),
      editItem: false
    });
  };

  clearList = () => {
    this.setState({
      items: []
    });
  };

  // this method filters ID clicked to ID not clicked on filteredItems then passes filteredItems to state.
  handleDelete = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: filteredItems
    });
  };

  //On handle edit we want the edit to run to the ToDo Input
  handleEdit = id => {
    // console.log(id);
    const filteredItems = this.state.items.filter(item => item.id !== id);
    console.log(filteredItems);

    const selectedItems = this.state.items.find(item => item.id === id);
    console.log(selectedItems);

    this.setState({
      items: filteredItems,
      item: selectedItems.title,
      editItem: true,
      //Here we would like to grab UUID we will override and and acess the new item created ID
      id: id
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10.mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center">To do Input</h3>
            <Todoinput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
            />
            <TodoList
              items={this.state.items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          </div>
        </div>
      </div>
    );
  }
}
