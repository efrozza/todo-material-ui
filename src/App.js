import React, { Component } from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class App extends Component {
  state = {
    todos: [],
    input: '',
    open: false,
    idDelete: '',
  };
  handleClickOpen = todoId => {
    this.setState({ open: true, idDelete: todoId });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  addTodo(todoName) {
    this.setState(state => {
      const newTodos = state.todos.concat({
        name: todoName,
        id: Date.now(),
      });
      return {
        todos: newTodos,
        input: '',
      };
    });
  }

  deleteTodo(todoID) {
    this.setState(state => {
      const newTodos = state.todos.filter(todo => todo.id !== todoID);
      return {
        todos: newTodos,
      };
    });
    this.handleClose();
  }

  handleInput(e) {
    this.setState({ input: e.target.value });
  }

  renderList(todo) {
    const liTodo = (
      <ListItem key={todo.id}>
        <Icon>drag_handle</Icon>
        <ListItemText primary={todo.name} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <Icon onClick={() => this.handleClickOpen(todo.id)}>delete</Icon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
    return liTodo;
  }

  render() {
    return (
      <div className="App">
        <Card className="container">
          <TextField
            className="text-input"
            label="Add new to do "
            type="text"
            value={this.state.input}
            onChange={event => this.handleInput(event)}
            onKeyPress={e => {
              if (e.key == 'Enter') {
                this.addTodo(this.state.input);
              }
            }}
          />
          <List>
            {this.state.todos.map(todo => {
              return this.renderList(todo);
            })}
          </List>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{'To do List'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure do you wanting delete this?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button
              onClick={() => this.deleteTodo(this.state.idDelete)}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App;
