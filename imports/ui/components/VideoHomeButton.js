import React from 'react';
import StateOutline from './StateOutline';

class VideoHomeButton extends React.Component {

  render() {
    return (
      <div onClick={this.props.homeAction.bind(this)} className='home-button'>
        <img src='/images/home.png' />
        <StateOutline featured={Session.get('selectedPlace') != undefined ? Session.get('selectedPlace').labelEn : ''}></StateOutline>
      </div>
    );
  }

}

VideoHomeButton.propTypes = {
  homeAction: React.PropTypes.func,
};

export default VideoHomeButton;
