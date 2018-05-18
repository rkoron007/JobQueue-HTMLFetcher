import React, { Component } from 'react';
import { createJobAndAddQueue,
  getJobStatus } from "./frontend_api_helper";
import '../stylesheets/App.css';
import JobShow from "./JobShow";

class App extends Component {
  constructor(){
    super();
    this.state = {
      url: '',
      id: '',
      job: null,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
    this.handleJob = this.handleJob.bind(this);
  }

  handleUpdate(input){
    return (e) => this.setState({[input]: e.target.value});
  }

  handleUrl(){
    if (this.state.url === ''){
      this.state.url = 'www.google.com';
    }
    createJobAndAddQueue({ url: this.state.url }, (job) => {
      this.setState({job: job.message});
    });
    this.setState({url: ''});
  }

  handleJob(){
    getJobStatus(this.state.id, (data) => {
      this.setState({ url: '', id: ''});
    if (data['obj']) {
        this.setState({job: data['obj']});
      } else {
        this.setState({job: data['message']});
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="input-info">Input Url</h1>
          <input placeholder="www.facebook.com" className="url-input"
            onChange={this.handleUpdate("url")}
            value={this.state.url}>
          </input>

        <button className="request-button"
          onClick={() => this.handleUrl()}>Create Job
        </button>

        <h2>or</h2>
        <h1 className="input-info">Check on a Job</h1>
        <input className="url-input" onChange={this.handleUpdate("id")}value={this.state.id}>
        </input>
        <button onClick={() => this.handleJob()} className="request-button">Find Job</button>
        <JobShow job={this.state.job}/>
      </div>
    );
  }
}


export default App;
