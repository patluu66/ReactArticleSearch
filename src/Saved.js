import React, { Component } from 'react';
import axios from "axios";

class Saved extends Component {

  constructor(){
    super();
    this.state = { 
        loading: true,
        results: null
    };
}
  componentDidMount() {
    return axios
    .get(`/api/saved`)
    .then((results) => {
      console.log(results);
        this.setState({loading: false, results: results.data});
    });
  }

  removeArticle = (i) => {
    const doc = this.state.results[i];
    return axios.get(`/api/remove/${doc._id}`)
      .then( (response) => {

        this.props.history.push('/empty');
        setTimeout(() => {
          this.props.history.push('/saved');
        });
      })
      .catch( (error) => {
        console.log(error);
      });
}

  render() {
    if (this.state.loading) return (<h3>Loading...</h3>);
    return (
      <div>
        <h3 className="text-center">Saved Articles</h3>
        {this.state.results.map( (doc, i) => 
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title" style={{display: 'inline-block'}}>{doc.title}</h4>
                    <p>Date saved: {doc.createdAt}</p>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        this.removeArticle(i)
                        }} style={{float: 'right'}} class="btn btn-primary">Remove</a>
                </div>
        </div>)}
      </div>
    )
  }
}

  export default Saved;