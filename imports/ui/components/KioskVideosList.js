import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import VideoCard from './VideosCard';
import VideoPlayer from './VideoPlayer';
import LoopingBackground from './LoopingBackground';
import VideoPlayerScreenSaver from './VideoPlayerScreenSaver';
import logger from '../../modules/logger';
import _ from 'lodash';
import TweenMax from 'gsap';

class KioskVideoList extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      videos: props.videos,
      playing: props.playing,
      transitioning: false,
      componentNumber: props.componentNumber,
      selectedVideo: '0',
      selectedPosition: -1,
      selectedHomeX:-1,
      selectedHomeY:-1,
      instructionPosition: -1,
      showVideo: false,
      idleTime: 0,
      screenSaver: 'inactive',
    };

    // Generate video-card positions
    this.videoOrder = this.createVideoOrder(props.shuffleOnStart);

    this.transEnterTime = 700;
    this.transLeaveTime = 500;

    this.startInstructionCycle();

  }

  componentDidMount() {
    setInterval(() => {
      this.timerIncrement();
    }, 1000);
  }

  timerIncrement() {
    const idleTime = this.state.idleTime + 1;
    this.setState({ idleTime });
    const screenSaverTimeout = Meteor.settings.public.screenSaverTimeout;
    if (this.state.idleTime >= screenSaverTimeout) {

      if (this.state.screenSaver == 'inactive') {
        // Log for analytics
        logger.info({message:'inactivity-timeout', inactiveTime:screenSaverTimeout * 1000,});
      }

      this.setState({
        playing: false,
        screenSaver: 'active',
      });

    }
  }

  resetScreenSaverTimer() {
    console.log('Resetting the screensaver timer');
    this.setState({
      idleTime: 0,
      screenSaver: 'inactive',
    });
  }

  clearScreenSaver() {
    console.log('Clearing the screensaver');
    this.setState({
      idleTime: 0,
      screenSaver: 'inactive',
      playing: false,
    });
  }

  createVideoOrder(shuffle) {

    let vidNums = [];

    /*    vidNums.push(this.props.videos[15].videoNumber);
        vidNums.push(this.props.videos[14].videoNumber);
        vidNums.push(this.props.videos[13].videoNumber);
        vidNums.push(this.props.videos[12].videoNumber);
        vidNums.push(this.props.videos[5].videoNumber);
        vidNums.push(this.props.videos[6].videoNumber);
        vidNums.push(this.props.videos[7].videoNumber);
        vidNums.push(this.props.videos[8].videoNumber);
        vidNums.push(this.props.videos[0].videoNumber);
        vidNums.push(this.props.videos[1].videoNumber);
        vidNums.push(this.props.videos[2].videoNumber);
        vidNums.push(this.props.videos[3].videoNumber);
        vidNums.push(this.props.videos[4].videoNumber);
        vidNums.push(this.props.videos[9].videoNumber);
        vidNums.push(this.props.videos[10].videoNumber);
        vidNums.push(this.props.videos[11].videoNumber);*/

    vidNums = [5,6,7,8,1,2,3,4,9,10,11,12,13,14,15,16];

    /*for (var i = 0; i < this.props.videos.length; i++) {

      vidNums.push(this.props.videos[i].videoNumber);

    }

    // Shuffle video order
    if (shuffle) {

      vidNums = _.shuffle(vidNums);

    }*/

    return vidNums;

  }

  startInstructionCycle() {

    setInterval(() => {
      /* const index = Math.floor(Math.random() * this.videoOrder.length);
       this.setState({instructionPosition:this.videoOrder[index]});*/

      const index = Math.floor(Math.random() * 4);
      this.setState({instructionPosition:this.videoOrder[index]});

    }, 10000);

  }

  isActiveCard(index) {

    if (index == this.state.selectedPosition) {
      return true;
    } else {
      return false;
    }
  }

  isInstructionCard(index) {

    if (index == this.state.instructionPosition) {
      return true;
    } else {
      return false;
    }
  }

  isDisabled(index) {

    if (index >= 4) {
      return true;
    } else {
      return false;
    }
  }

  launchVideoPlayer(e) {

    const position = e.currentTarget.getAttribute('data-position');
    const homeX = parseInt($(e.currentTarget).css('left'));
    const homeY = parseInt($(e.currentTarget).css('top'));

    this.setState({
      playing: true,
      selectedVideo: e.currentTarget.id,
      selectedPosition: position,
      selectedHomeX: homeX,
      selectedHomeY: homeY,
      showVideo: true,
      transitioning: true,
    });

    // Log for analytics
    logger.info({ message:'video-selected',
                  kiosk: this.props.location.pathname,
                  selectedVideo:e.currentTarget.id,
                  position:position,
                  });

    // Transition to fullscreen.
    const vidBtn = $('.video-button.video-0' + position);
    TweenMax.to(vidBtn, 0.45, {scale:4, top:0, left:0, ease:Power2.easeOut});
    TweenMax.set(vidBtn, {zIndex:2});

    // Wait for transition
    // to kill display state
    setTimeout(()=> {

      this.setState({ transitioning: false });

    }, this.transEnterTime);

  }

  closeModal(vidData) {

    if (this.state.transitioning == false) {

      this.setState({ transitioning: true, playing: false });

      // Log for analytics
      logger.info({message:'video-exit', vidData});

      setTimeout(()=> {

        // Transition back from fullscreen.
        const vidBtn = $('.video-button.video-0' + this.state.selectedPosition);
        TweenMax.to(vidBtn, 0.45, {scale:1, top:this.state.selectedHomeY, left:this.state.selectedHomeX, ease:Power2.easeOut});
        TweenMax.set(vidBtn, {zIndex:1, delay:0.46});

        this.setState({ transitioning: false, selectedPosition:-1, selectedHomeX:-1, selectedHomeY:-1 });

      }, 200);

    }

  }

  loopBackground() {

    let doLoop = false;

    if (this.props.loopingBackground && this.state.screenSaver != 'active') {
      if (this.state.playing && this.state.transitioning) {
        doLoop = true;
      } else if (!this.state.playing) {
        doLoop = true;
      }
    }

    return doLoop;

  }

  render() {

    /**
     * Loop through the videos and render a card for each question
     */
    const videoCards = this.props.videos.map((video, index) =>
      <VideoCard
        launchVideoPlayer={this.launchVideoPlayer.bind(this)}
        playing={this.state.playing}
        key={video._id}
        position={this.videoOrder[index]}
        video={video}
        isActive={this.isActiveCard(this.videoOrder[index])}
        isInstruction={this.isInstructionCard(this.videoOrder[index])}
        isDisabled={this.isDisabled(index)}
      />
    );

    return (
      <div onClick={this.resetScreenSaverTimer.bind(this)} key='unique' id='selection-screen' className={'vid-count-' + this.props.videos.length}>

        {
            this.loopBackground() === true
            ?
            <div
              className='looping-background'
            >
              <LoopingBackground
                componentNumber={this.state.componentNumber}
              />
            </div>
            : null
        }

        {videoCards}

        <ReactCSSTransitionGroup
              transitionName='player-fade'
              transitionAppear={false}
              transitionEnter={this.props.transitions}
              transitionLeave={this.props.transitions}
              transitionEnterTimeout={this.transEnterTime}
              transitionLeaveTimeout={this.transLeaveTime}>

          {(this.state.playing)
            ?

              <VideoPlayer
                videoPlaying={this.state.playing}
                handleHomeAction={this.closeModal.bind(this)}
                componentNumber={this.state.componentNumber}
                selectedVideo={this.state.selectedVideo}
              />

            : null
          }
          </ReactCSSTransitionGroup>

      </div>
    );
  }

}

KioskVideoList.propTypes = {
  videos: React.PropTypes.array,
  playing: React.PropTypes.bool,
  componentNumber: React.PropTypes.string,
  playingVideo: React.PropTypes.string,
  loopingBackground: React.PropTypes.bool,
  transitions: React.PropTypes.bool,
};

export default KioskVideoList;
