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

  }

  componentWillUnmount() {

    // On exit, force the video
    // to stop loading/buffering.
    this.videoSrcPath = '';
    this.refs.mainVideo.src = '';

  }

  localHomeAction(e) {

    const vidData = { vidId:this.props.selectedVideo,
                      percentWatched:(this.refs.mainVideo.currentTime / this.refs.mainVideo.duration).toFixed(2),
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
