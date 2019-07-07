import React, { Component } from 'react';
import {storage} from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    //console.log(this.props.match.params.id,"key in firestore");
    const ref = storage.collection('boards').doc(this.props.match.params.id);
    //console.log(ref.id,"reference in firestore")
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }
  delete=(id)=>{
    storage.collection('boards').doc(this.state.key).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
  render() {
    // console.log(this.state.key,"key in state")
    // console.log(this.state.board,"object in state")
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
          <h4><Link to="/">Board List</Link></h4>
            <h3 className="panel-title">
              {this.state.board.title}
            </h3>
       <button onClick={this.delete}>testttttttt</button>
      </div>
      </div>
      </div>
    );
  }
}
  export default Show;
