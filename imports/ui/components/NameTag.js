import React from 'react';
import _ from 'lodash';

class NameTag extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

    };

    this.fadeTimer = {};

  }

  componentDidMount() {
    this.setState({isTransitioning:true});

    this.fadeTimer = setTimeout(() => {
      this.setState({isTransitioning:false});
      this.fadeTimer = setTimeout(() => {
        this.setState({isTransitioning:true});
      }, 8100);
    }, 3300);

  }

  componentWillUnmount() {
    clearTimeout(this.fadeTimer);
    this.fadeTimer = {};
  }

  render() {

    return (
      <div className={'name-tag ' + (this.props.playState && this.state.isTransitioning == false ?  'active' : '')}>

        <h2>Ethan Neerdaels</h2>
        <p>Dakota</p>

      </div>
    );
  }

}

NameTag.propTypes = {

  playState: React.PropTypes.bool,

};

NameTag.defaultProps = {

  playState: true,

};

export default NameTag;
