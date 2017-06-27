import React from 'react';
import VideoHomeButton from './VideoHomeButton';
import NameTag from './NameTag';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPlaying: props.videoPlaying,
    };

    this.localHomeAction = this.localHomeAction.bind(this);

    const selectedVideo = props.selectedVideo.replace('video-', '') + '.mp4';
    const serverSlot = Math.floor(Math.random() * Meteor.settings.public.mediaServer.length);
    this.videoSrcPath = Meteor.settings.public.mediaServer[serverSlot] + `/media/${props.componentNumber}/${selectedVideo}`;

  }

  componentDidMount() {
    this.setState({isTransitioning:true});

    setTimeout(() => {
      this.setState({isTransitioning:false});
    }, 2250);

    // Start progress bar interval.
    this.progressTimer = setInterval(() => {
      this.updateProgress();
    }, 59);

  }

  componentWillUnmount() {

    // On exit, force the video
    // to stop loading/buffering.
    this.videoSrcPath = '';
    this.refs.mainVideo.src = '';

    // Clear progress timer.
    clearTimeout(this.progressTimer);
    this.progressTimer = {};

  }

  updateProgress() {

    $(this.refs.progressBar).css('transform', 'scaleX(' + this.getPercentWatched() + ')');

  }

  getPercentWatched() {

    if (this.refs.mainVideo) {
      return (this.refs.mainVideo.currentTime / this.refs.mainVideo.duration).toFixed(4);
    } else {
      return 0.0;
    }

  }

  localHomeAction(e) {

    const vidData = { vidId:this.props.selectedVideo,
                      percentWatched:this.getPercentWatched(),
                      vidDuration:this.refs.mainVideo.duration,};

    this.props.handleHomeAction(vidData);

  }

  render() {

    return (

      <div className='video-player'>

        <video
          onEnded={this.localHomeAction}
          autoPlay='autoplay'
          ref='mainVideo'
        >
          <source
            src={this.videoSrcPath}
            type='video/mp4'
          />
        </video>

        <VideoHomeButton
          homeAction={this.localHomeAction}
        />

        {(this.props.showNameTag == true)
          ?

            <NameTag />

          : null
        }

        <div className='progress-bar' ref='progressBar'></div>

      </div>
    );
  }

}

VideoPlayer.propTypes = {
  videoPlaying: React.PropTypes.bool,
  handleHomeAction: React.PropTypes.func,
  componentNumber: React.PropTypes.string,
  selectedVideo: React.PropTypes.string,
  showNameTag: React.PropTypes.bool,
};

export default VideoPlayer;
