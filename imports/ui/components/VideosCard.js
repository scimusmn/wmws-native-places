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
    };

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.isFeatured == true && this.props.isFeatured == false) {

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

    // Pause playback when Fullscreen video is playing
    if (nextProps.isDisabled) return;

    if (nextProps.playing) {
      this.refs.vidRef.pause();
    } else {

      const vidDuration = this.refs.vidRef.duration;

      // If video duration is below
      // 6 seconds, do not play.
      if (vidDuration > 6.0) {
        this.refs.vidRef.play();
      }

    }

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
    let moves = ['left', 'right','up', 'down'];

    // Chaska exception. Stack odds to go right..
    if (this.props.video.labelEn == '04') moves.push('right', 'right', 'right');

    let classString = '';
    const mClass = moves[Math.floor(Math.random() * moves.length)];

    classString += ' cam-' + mClass;

    console.log('cam classString', classString);
    return classString;

  }

  instructionClass() {

    let className = 'instruction-card ' + ((this.props.isInstruction == true) ? 'active' : '');

    return className;

  }

  render() {

    const { video } = this.props;
    const paddedVideoNumber = _.padStart(video.videoNumber, 2, '0');
    const buttonVideoPath = `/media/${video.componentNumber}/${paddedVideoNumber}_thumb.mp4`;
    const buttonImagePath = `/media/${video.componentNumber}/${paddedVideoNumber}_dakota.png`;

    const disabledImagePath = `/media/${video.componentNumber}/${paddedVideoNumber}_thumb.png`;

    const paddedPosition = _.padStart(this.props.position, 2, '0');

    return (
      <div
        onClick={this.handleVideoSelect.bind(this)}
        className={this.getClassName()}
        data-position={this.props.position}
        data-vid-num={video.videoNumber}
        id={`video-${paddedVideoNumber}`}
      >

        <img src={buttonImagePath} className='dakota' />

        <h2>
          <div className='en'>{paddedPosition}</div>
          <div className='es'>{video.labelEs}</div>
        </h2>

        <div className={this.instructionClass()}>
          <h3>Where did these place names come from?</h3>
          <h3 className='sub'>Touch one to find out.</h3>
        </div>

        <div className='overlay'>
        </div>

        {this.props.isDisabled ? (
          <img src={disabledImagePath} />
        ) : (
          <video
            loop='loop'
            ref='vidRef'
          >
            <source
              src={buttonVideoPath}
              type='video/mp4'
            />
          </video>
        )}

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
