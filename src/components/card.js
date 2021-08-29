import '../css/card.css';
import React, { Component } from 'react';
import { Link } from "gatsby";

class Card extends Component {
  render() {
    return (
      <>
        <div className="card">
          {this.props.img !== undefined && <img className="card-image" src={this.props.img} alt='' />}
          <div className="card-contents">
            <div>
              <h3 className="card-heading">{this.props.title}</h3>
              <p className="card-date"> {this.props.date}</p>
              <p className="card-body"> {this.props.description}</p>
            </div>
            <div className="card-tag-container">
              {this.props.tag1 ? <Link className="card-tag-link" to={"/tag/" + this.props.tag1}>{this.props.tag1}</Link> : ""}
              {this.props.tag2 ? <Link className="card-tag-link" to={"/tag/" + this.props.tag2}>{this.props.tag2}</Link> : ""}
              {this.props.tag3 ? <Link className="card-tag-link" to={"/tag/" + this.props.tag3}>{this.props.tag3}</Link> : ""}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Card;