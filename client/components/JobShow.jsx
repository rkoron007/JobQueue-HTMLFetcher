import React, { Component } from 'react';


class JobShow extends Component {

  render() {
    if (!this.props.job){
      return null;
    }
    // {this.props.job.completed ? 'View the HTML' : 'Still Working On It' }

    return (
      <div className="job-status">
        {this.props.job}
      </div>
    );
  }
}



export default JobShow;
