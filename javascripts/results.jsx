import React from 'react';

export default class Info extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        {this.props.currency}
      </div>
    )
  }
}
