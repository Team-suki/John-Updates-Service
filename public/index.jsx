import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

import Updates from './updates.jsx';
import Comments from './comments.jsx';
import PostComment from './postComment.jsx';


class Index extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      id: 1, //This is the default id... but how do we set it to render based on the campaign?
      updates: {},
      comments: []
    }
    this.send = this.send.bind(this);
  }

  //Updates only show up on a specific campaign so the campaign ID will need to be passed in. Assuming each campaign has only one update, I am using the campaigne/s primary key as the id for update as well.
  componentDidMount() {

    //consider relative path?
    $.ajax({
      type: 'GET',
      url: `/api/update${window.location.pathname}`
    }).then((results) =>{
      var id = window.location.pathname
      id = parseInt(id.substring(1));
      //console.log(results);
      this.setState({
        campaignID: id,
        id: id,
        updates: results[0]
      });
      $.ajax({
        type: 'GET',
        url: `/api/comment/${results[0].campaignID}`
      }).then((res) =>{
        this.setState({
          comments: res
        });
      });
    });
  }

  send (thing) {
    thing.campaignID = this.state.campaignID;
    thing.updateID = this.state.updates.updateID;

    $.ajax({
      type: "POST",
      url: "/api/comment",
      data: thing
    });
    this.componentDidMount()
  };

  render() {
    return (
      <div>
        <Updates update = {this.state.updates}/>
        <div>
          <PostComment onSubmit={this.send} updatesID = {this.state.updates.id}/>
          <Comments comment = {this.state.comments}/>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <Index/>,
  document.getElementById('update')
);

export default Index;