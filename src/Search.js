import React, { Component } from 'react';
import axios from "axios";

class Search extends Component {

    constructor(props){
        super(props);
        this.state = { 
            searchText:'',
            startyear: '',
            endyear: '',
            results: null
        };
    }

    handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		});
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        return axios
            .get(`/api/search?search=${this.state.searchText}&startyear=${this.state.startyear}&endyear=${this.state.endyear}`)
            .then((results) => {
                this.setState({results: results.data.response.docs});
            });
    }
    
    saveArticle = (i) => {
        const doc = this.state.results[i];
        return axios.post('/api/saved', {
            title: doc.headline.main,
            date: doc.pub_date,
            url: doc.web_url
          })
          .then( (response) => {
            this.props.history.push('/saved');
          })
          .catch( (error) => {
            console.log(error);
          });
    }

    render() {
        return (
             <div>
                <h3 className="text-center">Search</h3>
                <form>
                    <div className="form-group">
                        <label className="col-form-label" for="searchText">Search Term</label>
                        <input type="text" className="form-control" id="searchText" onChange={this.handleChange} required placeholder="Search Term" />
                    </div>
                    <div className="form-group">
                        <label className="col-form-label" for="startyear">Start Year</label>
                        <input type="text" className="form-control" id="startyear" onChange={this.handleChange} required placeholder="Start Year" />
                    </div>
                    <div className="form-group">
                        <label className="col-form-label" for="endyear">End Year</label>
                        <input type="text" className="form-control" id="endyear" onChange={this.handleChange} required placeholder="End Year" />
                    </div>
                    <button  onClick={this.handleSubmit} type="submit" class="btn btn-primary">Search</button>
                </form>

                {this.state.results !== null && 
                <div>
                <h3 className="text-center">Results</h3>
                    {this.state.results.map( (doc, i) => 
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title" style={{display: 'inline-block'}}>{doc.headline.main}</h4>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    this.saveArticle(i)
                                    }} style={{float: 'right'}} class="btn btn-primary">Save</a>
                            </div>
                    </div>)}
                </div>
                }
            </div>
        );
    }
}


export default Search;