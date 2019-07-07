import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Create from './components/Create';
import Show from './components/Show';
import Edit from './components/Edit';
import './App.css';
import { storage } from './Firebase';
import { Table, Header} from 'semantic-ui-react';

export default class App extends Component {
  constructor() {
    super();
    this.ref = storage.collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }
  // onSnapshot is the copy van data/and it is instead of .get()
  // querySnapshot is the selector
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  onCollectionUpdate = querySnapshot => {
    const boards = [];
    querySnapshot.forEach(doc => {
      const { title, description, author } = doc.data();
      boards.push({
        key: doc.id,
        doc,
        title,
        description,
        author
      });
    });
    this.setState({
      boards
    });
  };
  render() {
    //console.log(this.state.boards);
    return (
      <div>
        <BrowserRouter>
        <Link to='/showing'>testingggggg</Link>
          <Header as='h1'>Board List</Header>
          <Header as='h3'>
            <Link to='/create'>Add Board</Link>
          </Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Author</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.boards.map(board => (
                <Table.Row disabled key={board.key}>
                  <Table.Cell>
                    <Link key={board.key} to={`/show/${board.key}`}>{board.title}</Link>
                  </Table.Cell>
                  <Table.Cell>{board.description}</Table.Cell>
                  <Table.Cell>{board.author}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <div className='App'>
            <Switch>
              <Route exact path='/create' component={Create} />
              <Route exact path='/show:id' component={Show} />
              <Route exact path='/edit:id' component={Edit} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
