import React, { Component } from 'react';
import "../stylesheets/JobShow.css";

class JobShow extends Component {

// renders either the message saying the job is
// done or the actual job data

  render() {
    if (!this.props.job){
      return null;
    }
    return (
      <div className="job-status">
        <section className="job-section">
          <div
            className="job-box"
            dangerouslySetInnerHTML={{ __html: this.props.job}}>
          </div>
        </section>
      </div>
    );
  }
}



export default JobShow;
