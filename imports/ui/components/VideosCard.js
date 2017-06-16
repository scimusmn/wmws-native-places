import React from 'react';
import _ from 'lodash';
import Modal from '/node_modules/react-overlays/lib/Modal';

let VelocityComponent = require('/node_modules/velocity-react/velocity-component');

class VideoCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      video: props.video,
      playing: false,
      camMoveClass: '',
      showDakota: false,
    };

    this.lockStatic = false;
    this.mediaHost = '';
    const goodMovies = ['Minnehaha', 'Wabasha', 'Shakopee', 'Minnetonka', 'Kandiyohi', 'Chaska', 'Wayzata', 'Kasota'];
    const movIndex = goodMovies.indexOf(props.video.labelEn);

    if (movIndex == -1) {

      // Only use image for thumb
      this.lockStatic = true;

    }

    // Splits loading between multiple http-servers.
    const numServers = Meteor.settings.public.mediaServer.length;
    let slot = this.modulo(movIndex, numServers);
    this.mediaHost = Meteor.settings.public.mediaServer[slot];

    if (this.lockStatic == true) {
      // Static cards can go to random server.
      slot = Math.floor(Math.random() * Meteor.settings.public.mediaServer.length);
    }

  }

  componentDidMount() {

  }

  modulo(n, m) {
    return ((n % m) + m) % m;
  }

  componentWillReceiveProps(nextProps) {

    // Check if newly featured.
    if (nextProps.isFeatured == true && this.props.isFeatured == false) {

      this.featuredCamSequence();

    }

  }

  featuredCamSequence() {

    // Newly featured, set up some
    // timed random movements.
    setTimeout(() => {
      // First Movement
      this.setState({camMoveClass:this.randomCamClass()});
    }, 2600);

    setTimeout(() => {
      // Second Movement
      this.setState({camMoveClass:this.randomCamClass()});
    }, 4200);

    setTimeout(() => {
      // Third Movement
      this.setState({camMoveClass:this.randomCamClass()});
    }, 5800);

    setTimeout(() => {
      // Final return to center
      this.setState({camMoveClass:' cam-mid'});
    }, 7800);

  }

  handleVideoSelect(e) {

    // Send parent component the video launch event
    this.props.launchVideoPlayer(e);

  }

  getClassName() {

    let className = 'video-button ' + this.props.video.labelEn;

    // Is currently Active?
    className += ((this.props.isActive == true) ? ' active' : '');

    // Is currently Featured?
    className += ((this.props.isFeatured == true) ? ' featured' : '');

    // Is currently Disabled?
    className += ((this.props.isDisabled == true) ? ' disabled' : '');

    // Position in grid
    className += ' scanlines video-0' + this.props.position;

    // Camera movement when featured.
    if (this.state.camMoveClass != '') className += this.state.camMoveClass;

    return className;

  }

  randomCamClass() {
    // Pick random class names to
    // randomly move camera on featured.
    // const timings = ['early', 'mid', 'late'];
    let moves = ['left', 'right', 'up', 'down'];

    // Chaska exception. Stack odds to go right..
    // if (this.props.video.labelEn == '04') moves.push('right', 'right', 'right');

    let classString = '';
    const mClass = moves[Math.floor(Math.random() * moves.length)];

    classString += ' cam-' + mClass;

    return classString;

  }

  instructionClass() {

    let className = 'instruction-card ' + ((this.props.isInstruction == true) ? 'active' : '');

    return className;

  }

  callToAction() {
    if (this.props.isFeatured == true) {
      return '. Touch to view';
    } else {
      return '';
    }
  }

  render() {

    const { video } = this.props;
    const paddedVideoNumber = _.padStart(video.videoNumber, 2, '0');
    const buttonVideoPath = this.mediaHost + `/media/${video.componentNumber}/${paddedVideoNumber}_thumb.mp4`;
    const buttonImagePath = this.mediaHost + `/media/${video.componentNumber}/${paddedVideoNumber}_dakota.png`;
    const staticThumbPath = this.mediaHost + `/media/${video.componentNumber}/${paddedVideoNumber}_thumb.png`;

    const paddedPosition = _.padStart(this.props.position, 2, '0');

    return (
      <div
        onClick={this.handleVideoSelect.bind(this)}
        className={this.getClassName()}
        data-position={this.props.position}
        data-vid-num={video.videoNumber}
        id={`video-${paddedVideoNumber}`}
      >

        <h2>
          <div className='en'>{paddedPosition}{this.callToAction()}</div>
          <div className='es'>{video.labelEs}</div>
        </h2>

        <div className={this.instructionClass()}>

          <h3>Where did these place names come from?</h3>
          <img src='/images/horizontal-rule-small.png' className='h-break' />
          <h3 className='sub'>Touch one to find out.</h3>

        </div>

        <img src={buttonImagePath} className='dakota' />

        <div className='overlay'></div>

        <div className='thumb'>

          {this.lockStatic == false ? (

            <video
              loop='loop'
              ref='vidRef'
              muted='muted'
              autoPlay={true}
            >
              <source
                src={buttonVideoPath}
                type='video/mp4'
              />
            </video>

          ) : (

            <img className='static feed' src={staticThumbPath} />

          )}

        </div>

      </div>
    );
  }

}

VideoCard.propTypes = {
  playing: React.PropTypes.bool,
  video: React.PropTypes.object,
  launchVideoPlayer: React.PropTypes.func,
  position: React.PropTypes.number,
  isActive: React.PropTypes.bool,
  isInstruction: React.PropTypes.bool,
  isFeatured: React.PropTypes.bool,
  isDisabled: React.PropTypes.bool,
};

export default VideoCard;
