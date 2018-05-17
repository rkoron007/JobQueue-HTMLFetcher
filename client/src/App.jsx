import React, { Component } from 'react';
import { createJobAndAddQueue } from "./frontend_api_helper";
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      url: '',
      message:''
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
    this.handleJob = this.handleJob.bind(this);
  }

  handleUpdate(e){
    this.setState({url: e.target.value});
  }

  componentDidMount() {
    // fetch('/')
    //   .then(res => console.log(res));
      // .then(title => this.setState({ title }));
  }

  handleUrl(e){
    e.preventDefault();

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
    console.log("job");
  }

  render() {
    return (
      <div className="App">
        <h1>Input Url</h1>
        <input onChange={this.handleUpdate}></input>
        <button onClick={this.handleUrl}>Create Job</button>
          <h4>or</h4>
        <h1>Check on a Job</h1>
        <input onChange={() => this.handleUpdate("job")}></input>
        <button onClick= {() => this.handleJob()}>Find Job</button>
      </div>
    );
  }
}


export default App;
