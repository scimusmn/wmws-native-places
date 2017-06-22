import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import VideoCard from './VideosCard';
import VideoPlayer from './VideoPlayer';
import LoopingBackground from './LoopingBackground';
import StateOutline from './StateOutline';
import HorizontalBreak from './HorizontalBreak';
import VideoPlayerScreenSaver from './VideoPlayerScreenSaver';
import logger from '../../modules/logger';
import _ from 'lodash';
import TweenMax from 'gsap';
import Mousetrap from 'mousetrap';

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
      featuredPosition: -1,
      featuredLabel: 'Anoka',
      showVideo: false,
      idleTime: 0,
      screenSaver: 'inactive',
      screenSaverCount: 0,
      selectionScreenTheme: 'theme-fs-grid',
    };

    // Generate video-card positions
    this.labelOrder = [];
    this.videoOrder = [];
    this.positionLookup = {};
    this.createVideoOrder(props.shuffleOnStart);

    this.transEnterTime = 700;
    this.transLeaveTime = 500;

    this.startInstructionCycle();
    this.startFeaturedCycle();

  }

  componentDidMount() {
    setInterval(() => {
      this.timerIncrement();
    }, 1000);

    // Select layout theme
    // for selection screen
    this.selectTheme();

  }

  selectTheme() {

    // Always use default fs grid theme. (June 20, 2017)

    /*

    // Theme id is passed by query string.
    const queryTheme = this.props.location.query.theme;

    if (queryTheme) {

      console.log('Found query theme:', queryTheme);
      this.setState({selectionScreenTheme:queryTheme});

    } else {

      console.log('No query theme found.');

      // Select by odd/even date.
      const d = new Date().getDate();
      const isEvenDay = (d % 2 == 0);

      if (isEvenDay) {
        // Map layout w key
        this.setState({selectionScreenTheme:'theme-mn-map'});
      } else {
        // Fullscreen grid layout
        this.setState({selectionScreenTheme:'theme-fs-grid'});
      }

    }

    */

    // Listen for future 't'
    // keystrokes to toggle in realtime.
    Mousetrap.bind('t', () => {

      if (this.state.selectionScreenTheme == 'theme-mn-map') {
        this.setState({selectionScreenTheme:'theme-fs-grid'});
      } else {
        this.setState({selectionScreenTheme:'theme-mn-map'});
      }

    });

  }

  timerIncrement() {

    // Ignore when video is playing.
    if (this.state.playing == true) {
      return;
    }

    const idleTime = this.state.idleTime + 1;
    this.setState({ idleTime });
    const screenSaverTimeout = Meteor.settings.public.screenSaverTimeout;

    if (this.state.idleTime >= screenSaverTimeout) {

      if (this.state.screenSaver == 'inactive') {

        // Log for analytics
        logger.info({message:'inactivity-timeout', inactiveTime:screenSaverTimeout * 1000,});

        // Select random video as screen saver
        const rIndex = Math.floor(Math.random() * this.props.videos.length);
        const rPosition = this.videoOrder[rIndex].toString();

        // Format video name
        const rVideo = 'video-' + _.padStart(this.props.videos[rIndex].videoNumber, 2, '0');

        // Increment screensaver play count.
        const newScreenSaverCount = this.state.screenSaverCount + 1;

        // Reset screensaver count
        this.resetScreenSaverTimer();

        if (newScreenSaverCount >= 3) {
          // Normally we'd display screensaver here,
          // but since the ss has played multiple times
          // without interaction, we will refresh the page.
          location.reload();
        } else {

          // Launch fullscreen video player
          this.launchVideoPlayer(rVideo, rPosition);

          this.setState({ screenSaverCount: newScreenSaverCount});
        }

        // Exit before setting screensaver
        // state. Will play as any
        // user selected video would.
        return;

      }

      this.setState({
        playing: false,
        screenSaver: 'active',
      });

    }
  }

  resetScreenSaverTimer() {
    this.setState({
      idleTime: 0,
      screenSaver: 'inactive',
      screenSaverCount: 0,
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

    let vids = [];

    for (var i = 0; i < this.props.videos.length; i++) {

      vids.push(this.props.videos[i]);

    }

    // Shuffle video order
    if (shuffle) {

      vids = _.shuffle(vids);

    }

    // Create vid num array
    let vidNums = [];
    let vidLabels = [];
    for (var i = 0; i < vids.length; i++) {

      vidNums.push(vids[i].videoNumber);
      vidLabels.push(vids[i].labelEn);

    }

    this.videoOrder = vidNums;
    this.labelOrder = vidLabels;

    // TODO: What a mess. Could greatly simplify
    // tracking which videos are in which positions
    // by creating one simple lookup object containing
    // the video, label, and id assigned to each position.
    for (var j = 0; j < vids.length; j++) {

      this.positionLookup[this.videoOrder[vids[j].videoNumber - 1]] = vids[j];
      this.positionLookup[vids[j].labelEn] = this.videoOrder[vids[j].videoNumber - 1];

    }

  }

  startInstructionCycle() {

    setInterval(() => {

      const index = Math.floor(Math.random() * this.videoOrder.length);
      this.setState({instructionPosition:this.videoOrder[index]});

    }, 10000);

  }

  startFeaturedCycle() {

    setInterval(() => {

      // Determine next position
      let pos = this.state.featuredPosition + 1;
      if (pos > 16 || pos <= 0) pos = 1;

      // Determine next label
      let label = '';
      for (var i = 0; i < this.videoOrder.length; i++) {

        if (this.videoOrder[i] == pos) {

          label = this.props.videos[i].labelEn;
          break;

        }

      }

      // Temporarily feature none
      this.setState({featuredPosition:-1});
      this.setState({featuredLabel:''});

      setTimeout(() => {

        if (this.state.playing == false) {

          this.setState({featuredPosition:pos});
          this.setState({featuredLabel:label});

        }

      }, 2345);

    }, 11345);

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

  isFeaturedCard(index) {

    if (index == this.state.featuredPosition) {
      return true;
    } else {
      return false;
    }

  }

  isDisabled(index) {

    if (index > 16) {
      return true;
    } else {
      return false;
    }

    return false;

  }

  videoButtonSelected(e) {

    const id = e.currentTarget.id;
    const position = e.currentTarget.getAttribute('data-position');
    const selected = this.positionLookup[position];
    let videoLabel = selected.labelEn;
    if (videoLabel == '' || videoLabel == undefined) videoLabel = 'NA';

    // Log for analytics
    logger.info({ message:'video-selected',
                  kiosk: this.props.location.pathname,
                  selectedVideo: id,
                  position: position,
                  videoLabel: videoLabel,
                  });

    this.launchVideoPlayer(id, position);

  }

  launchVideoPlayer(id, position) {

    const selected = this.positionLookup[position];

    // Global awareness
    // Todo: should be passed through
    // state, but this is temp for trying
    // state-as-home-button idea.
    Session.set('selectedPlace', selected);

    const $btn = $('.video-button.video-0' + position);

    const homeX = parseInt($btn.css('left'));
    const homeY = parseInt($btn.css('top'));

    this.setState({

      playing: true,
      selectedVideo: id,
      selectedPosition: parseInt(position),
      selectedHomeX: homeX,
      selectedHomeY: homeY,
      showVideo: true,
      transitioning: true,

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

      Session.set('selectedPlace', '');

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
        videoButtonSelected={this.videoButtonSelected.bind(this)}
        playing={this.state.playing}
        key={video._id}
        position={this.videoOrder[index]}
        video={video}
        selectedPosition={this.state.selectedPosition}
        isActive={this.isActiveCard(this.videoOrder[index])}
        isInstruction={this.isInstructionCard(this.videoOrder[index])}
        isFeatured={this.isFeaturedCard(this.videoOrder[index])}
        isDisabled={this.isDisabled(this.videoOrder[index])}
      />
    );

    return (
      <div onClick={this.resetScreenSaverTimer.bind(this)} key='unique' id='selection-screen' className={'map-cctv vid-count-' + this.props.videos.length + ' ' + this.state.selectionScreenTheme}>

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

        <div className='thumb-container'>
          {videoCards}
        </div>


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

          {(this.state.selectionScreenTheme == 'theme-mn-map')
            ?

              <div className='left-panel'>

                <HorizontalBreak></HorizontalBreak>
                <h1>Where did these place names come from?</h1>
                <h2>Touch one to find out.</h2>

                <div className='bottom-card'>
                  <div className='state-container'>
                    <StateOutline playState={false} featured={this.state.featuredLabel} textMode={true} labelOrder={this.positionLookup}></StateOutline>
                  </div>

                  <h3 className={(this.state.featuredLabel == '') ? 'featured-label' : 'featured-label active'}>{this.state.featuredLabel}</h3>

                </div>

              </div>

            : null
          }

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
