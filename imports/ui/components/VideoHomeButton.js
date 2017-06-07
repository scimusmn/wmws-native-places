import React from 'react';
import StateOutline from './StateOutline';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class VideoHomeButton extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      isTransitioning: false,
    };

  }

  componentDidMount() {
    this.setState({isTransitioning:true});

    setTimeout(() => {
      this.setState({isTransitioning:false});
    }, 2250);

  }

  getClassName() {

    let className = 'home-button';
    if (this.state.isTransitioning == true) className += ' fade';
    return className;

  }

  render() {
    return (
      <div onClick={this.props.homeAction.bind(this)} className={this.getClassName()}>
        <img src='/images/home.png' />
        {(Session.get('selectedPlace') != '')
            ?

              <StateOutline featured={ Session.get('selectedPlace').labelEn }></StateOutline>

            : null
          }

      </div>
    );
  }

}

VideoHomeButton.propTypes = {
  homeAction: React.PropTypes.func,
};

export default VideoHomeButton;
