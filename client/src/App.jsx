import React, { Component } from 'react';
import { createJobAndAddQueue,
  getJobStatus } from "./frontend_api_helper";
import '../stylesheets/App.css';
import JobShow from "../components/JobShow";

class App extends Component {
  constructor(){
    super();
    this.state = {
      url: '',
      id: '',
      job: null
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
    this.handleJob = this.handleJob.bind(this);
  }

  handleUpdate(input){
    return (e) => this.setState({[input]: e.target.value});
  }

  handleUrl(){
    this.setState({
      url: '',
      id: ''
    });
    createJobAndAddQueue({ url: this.state.url }, (job) => {
      console.log(job);
      // this.setState({ jobs: this.state.jobs.concat([job]),
      //         message: `JOB-ID ${job.jobId} was added to queue`
      //       })
      //     })
      //   }
        // else {
        //   // this.setState({ message: {} });
        // }
    });
  }

  handleJob(){
    getJobStatus(this.state.id, (job) => {
      this.setState({
        url: '',
        id: ''
      });
      console.log(job);
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Input Url</h1>
        <input onChange={this.handleUpdate("url")} value={this.state.url}></input>
        <button onClick={this.handleUrl}>Create Job</button>
          <h4>or</h4>
        <h1>Check on a Job</h1>
        <input onChange={this.handleUpdate("id")}value={this.state.id}></input>
        <button onClick= {this.handleJob}>Find Job</button>
        <JobShow job={this.state.job}/>
      </div>
    );
  }
}


export default App;
