import React from 'react';
import _ from 'lodash';

class StateOutline extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

    };

  }

  componentDidMount() {

    // Assign text ids to text
    const _this = this;
    if (this.props.textMode == true) {

      for (let key in this.props.labelOrder) {
        if (this.props.labelOrder.hasOwnProperty(key)) {

          const position = _.padStart(this.props.labelOrder[key], 2, '0');
          const findID = key.replace(/ /g, '');

          if (key != 'Minnesota') {

            $('#' + findID + '-txt').text(position);
            $('#z-' + findID + '-txt').text(position);

          }

        }

      }

    }

  }

  componentWillReceiveProps(nextProps) {

    // Remove whitespace from label
    const featuredLabel = nextProps.featured.replace(/ /g, '');

    if (this.props.textMode == true) {

      $('#StateMN-txt text').removeClass('featured');
      $('#StateMN-txt text').attr('filter', 'url(#text-effect-1)');
      $('#StateMN-txt path').removeClass('featured');
      if (featuredLabel != '') {
        $('#StateMN-txt #' + featuredLabel + '-txt').addClass('featured');
        $('#StateMN-txt #z-' + featuredLabel + '-txt').addClass('featured');

        if (featuredLabel != 'Minnesota') {

          // State labels
          $('#StateMN-txt #' + featuredLabel + '-txt').appendTo('#StateMN-txt');
          $('#StateMN-txt #' + featuredLabel + '-txt').attr('filter', 'url(#text-effect-2)');

          // Zoom labels
          $('#StateMN-txt #z-' + featuredLabel + '-txt').appendTo('#StateMN-txt .place-container');
          $('#StateMN-txt #z-' + featuredLabel + '-txt').attr('filter', 'url(#text-effect-2)');

        }
      }

    } else {

      $('#StateMN text').removeClass('featured');
      $('#StateMN text').removeClass('featured');
      $('#StateMN path').removeClass('featured');
      if (featuredLabel != '') {
        $('#StateMN #' + featuredLabel).addClass('featured');
        if (featuredLabel != 'Minnesota') $('#StateMN #' + featuredLabel).appendTo('#StateMN');
      }
    }

  }

  componentWillUnmount() {
    $('#StateMN text').removeClass('featured');
  }

  render() {

    return (
      <div className={'state-outline ' + (this.props.playState ?  'home' : 'selection')}>

        {this.props.textMode == true ? (
        <svg id='StateMN-txt' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1195.58 1146.08'>
          <defs>

            <filter x='-0.1' y='-0.05' width='1.2' height='1.1' id='text-effect-1'>
              <feFlood floodColor='transparent'/>
              <feComposite in='SourceGraphic'/>
            </filter>

            <filter x='-0.1' y='-0.05' width='1.2' height='1.1' id='text-effect-2'>
              <feFlood floodColor='#c24630'/>
              <feComposite in='SourceGraphic'/>
            </filter>

            <filter id='text-effect-2b' x='-6' y='-6' width='12' height='12' >
               <feFlood floodColor='#c24630' result='base' />
               <feMorphology result='bigger' in='SourceGraphic' operator='dilate' radius='9'/>
               <feColorMatrix result='mask' in='bigger' type='matrix'
                  values='0 0 0 0 0
                          0 0 0 0 0
                          0 0 0 0 0
                          0 0 0 1 0' />
               <feComposite result='drop' in='base' in2='mask' operator='in' />
               <feGaussianBlur result='blur' in='drop' stdDeviation='0' />
               <feBlend in='SourceGraphic' in2='blur' mode='normal' />
            </filter>


          </defs>
          <title>minnesota-map-outline-silhouetteb</title>

          <path id='Minnesota-txt' className='cls-1' d='M26.9,236.6c-1,1.1-.2,3.3-0.5,4.9s-1,2.9-1.3,4.5a16,16,0,0,0-.4,4.9,22.68,22.68,0,0,1-.6,5c-0.6,3.6,1.1,6,1.9,9.2a10,10,0,0,0,.4,2.4c0.4,0.7.9,0.9,1.1,1.4,1.1,1.9,1.6,1.7,1.9,4.4,0.1,1.9-.1,3,0.9,4.6s2,2.1,2.4,4.4c0.2,1.7-.1,3.5,0,5.3a7.38,7.38,0,0,0,.1,2.6c0.2,0.6,1.4,1,1.5,1.5,0.6,1.6-.2,2.1-0.9,3.9-0.6,2-.4,3,0.4,5a8.3,8.3,0,0,0,2,3.4c1.4,1.4,3.1.9,3.4,3.1,0.1,0.9-.7,2.4-0.9,3.2a17.32,17.32,0,0,0,.5,3.5c0.5,3.1.9,3.3,2.7,5.6,1.5,1.9,2.6,4.4,2.2,6.5-0.4,1.9-1.9,4.7,1.5,5.3,0.1,1.1-.1,2.6.4,3.6,0.4,0.7,1.7,1.4,2.2,2.2,1.3,2.1,1,5.1,1.3,7.5,0.9,4.5,4,7.9,4.1,12.8,0,2.7,0,4.9,1.1,7.2,1.1,1.9,3.1,3.3,3.3,5.6,0.1,0.7-.1,3.1-0.6,3.5-1,1.4-1.9-.1-2.1,2.2s2.1,3.7,1.6,6.6c-0.2,0-.5.1-0.7,0.1-0.5,1.6.6,2.9,0.9,4.4,0.4,1.9-.2,3-1.1,4.5-1,1.9-1.4,2.1-1.3,4,0.1,1.5.9,2.9,1,4.5,0.1,1.4-.9,3.4-0.4,4.5s2.2,1.7,2.7,3c1.3,3.1-.6,6.6-0.1,9.7a0.52,0.52,0,0,0-.4-0.2c-1.5,13.1.9,26-.1,39-0.2,3.4.1,6.8-.5,10.2a56.33,56.33,0,0,0-1,9.3c0,1.5.4,3.4-.1,4.9-0.2.7-1.3,1.4-1.3,2.4s1.1,1,1.3,1.4c0.5,1.4.2,9.7,3.5,7.6,0.6,1.1.5,2.4,1,3.5,0.9,1.7,1.3,1.3,2.7,2.2,3.4,2.2,1.1,3.5,1.3,7.1-0.5-.1-1.1.2-1.6,0.1-0.2,2.1-.1,3-1.1,4.7-0.5.9-1.1,0.7-1.5,1.9a8.1,8.1,0,0,0-.1,3.1,12.18,12.18,0,0,1,0,2.7c-0.2,1.1-1.1,1.3-1.3,1.9-0.9,2-.2,3.1.2,5,1.5,6.2,1.7,14.9-.2,21.2-1.1,3.3-3.7,6.2-2.7,9.7,1.1,3.3,2.9,5.9,4.5,8.8,3.5,6.1.2,14.8,3.4,20.9,0.7,1.3,1.5,1.1,2.4,2.1s0.6,2.4.7,3.6c0.5,2.9.4,5.6,2.4,8a15,15,0,0,1,3.3,5.9c0.9,2.6,3.5,4.4,3.3,7.5a11.63,11.63,0,0,1,4.4,3.2c1,1.4.7,6.2,1.3,6.2l-0.5,4.5c0,0.2-.7,2.7-0.9,3.6,0,1.7,1,3,.9,4.9-0.1,1.7-1.4,2.5-.6,4.5,0.7,1.6,2,1.6,2.4,3.5,0.2,1.6-.6,3.1-0.4,4.9,0.2,1.6.9,3.1,0.9,5,0,3.9,1,7.2,1.3,10.6,0.4,4.1-2,6.2-2.7,9.8-0.6,3.2-.2,7.9,0,11.1,0.7,7.2,1.1,14.5,0,21.8-1.1,7.5-4.5,11.5-8.7,17.4a77.86,77.86,0,0,1-6.4,8.7c-2.5,2.7-6,4.2-9.3,5.9-4.9,2.4-13.3,6.5-14.6,12.1-0.9,3.4-1.1,5.9.9,8.8,1.5,2.5,3.4,4.5,4.9,7.1,2.9,5.3,3.4,10.8,6.4,16.1a36.82,36.82,0,0,0,5.3,7c1.7,2,3.3,5.1,5.6,6.5,2.6,1.4,6.1.2,9,1.1,2.6,1,4.7,3.4,7.1,4.9,2.9,1.6,4.9,2.7,7.2,5.2,1.6,1.6,3.3,5.1,4.4,5.9L94,815,81.5,1165.4l736.5,7.5a0.59,0.59,0,0,0,.5-0.9c-1.1-1.9-3.4-6.7-3-9.7,0.5-4-1.7-7.1-3.5-15.1s2.2-16.8,2.2-23.1-9.3-24-16.1-32.9-21.8-17.8-29.8-20-8.5-7.6-16.8-14.3c-8.5-6.7-7.6-5.7-16.1-11.1s-12.1-9.8-12.1-15.1-6.7-6.7-6.2-13.3S714,1006.3,701,1001c-12.8-5.3-26.6-8.8-30.6-14.3s-2.2-16.8-11.1-17.8-21.8-1-27.5-3.1-4-6.7-8.5-7.6-0.5-6.2-7.6-12.1c-7.1-5.7-19.6-12.5-20.4-13.8s-1.3-4.9,2.2-12.5,5.3-12.5,3.1-16.1,1.3-4,1.3-8.5,0.5-11.6-3.1-17.3-5.3-11.1-1-14.3c4.5-3.1,5.3-5.3,4.9-11.1s-3.1-6.7-1.7-10.6-1.7-12.5,1.7-17.3,6.2-2.2,7.1-6.2-1.3-6.2,2.2-9.3,6.2-7.6,5.3-11.6-5.3-4.5-8-8.8a40.12,40.12,0,0,1-5.7-14.6c-1-5.3-2.2-3.1-8.5-2.7S584,776.3,584,761.2s0-16.8,4.5-20,11.1-8,12.1-13.3,2.2-14.3,6.2-18.3S622.4,698,625.9,698s2.7-5.3,7.1-6.2,5.7,3.1,8,0,1.7-8.5,7.1-7.6,8.5,3.7,9.8-.1,1.7-8.8,4-8.3c0.3,0.1.6,0.1,0.9,0.2a1.11,1.11,0,0,0,1.3-1.1l-0.5-115.1h10.6s4.5-3.5,4.9-5.3-1-4.5,2.7-6.7c3.5-2.2,7.6-2.7,8.5-6.7s-4.9-5.3,1.3-10.2,28.9-17.3,36-23.5,34.2-32.9,39.1-36.4a122.64,122.64,0,0,0,17.8-16.4c4.5-5.3,24-26.6,26.2-30.1s20.9-26.6,31.1-33.9c10.2-7.1,43.1-32.4,53.8-36.4s33.4-13.8,38.6-14.6,11.1-2.7,13.8-4.5,14.6-7.6,18.7-9.3,34.1-18.7,39.6-24.4c8.3-7.2,2.2-6.6,2.2-6.6l-5-2.2c-5-2.2-6.7-3.1-10.2-2.7s-5.3,5.7-11.6,6.2-10.6-.5-13.3-3.5-4.9-9.3-8-12.5-13.3-4.5-20.4-4.5-14.3-1.3-18.7,0-8.8,4.5-11.6,2.7-5.3-5.2-11.1-3.3-8.5,4.6-9.8,1.5-1.7-5-7.1-2-13.8,8.7-16.8,6-8-7.6-5.7-10.6-4-6.7-5.7-9.8-1.3-10.6-5.3-9.8-18.7,7.1-24,10.6c-5.5,3.5-20.9,18.3-25.8,20.9s-4,4.5-10.6,4-11.1,7.6-14.3,4-15.6,2.2-16.4-3.1c-1-5.3-12.5-9.8-12.5-9.8s-8.5-1.7-7.6-9.3-1.3-6.7-1.3-6.7l-16.8-1L714,255a12.88,12.88,0,0,1-9.8-2.7c-4.5-3.5-8-11.1-8-16.1s-3.5-5.3-8.5-5.3-11.7,1.7-19.6,3.1-11.1,4.9-8.8,10.2,8,9.3,4.9,10.2-8,4.9-11.1,3.1-14.3-18.3-15.6-22.7,2.2-8,1.7-12.1-2.7-9.8-12.1-7.6-15.6,4.5-18.3,1.3-6.4-14.2-.5-12.1c8.5,3.1,15.1-6.7,5.3-8.8s-14.6,0-24-5.7-15.6-10.2-28.4-9.3-19.1,0-20.9-2.7-9.3-2.7-14.6,0-3.1,7.1-7.6,5.7-10.2,1.3-10.6,4-1,8-2,8.5-10.3,6.2-16.6,4.9-5.7.5-12.1,1c-6.2.5-16.1,0.5-15.6-4.9s4.5-7.6.5-13.8-12.8-4-23.1-5.3-24.9-.5-29.8-2-4.5-6.5-6.2-9.6-10.6-5.7-18.7-4,0,6.2-8,4.9-4.5.6-13.3-5.5-16.8-10.5-15.6-20.3,6.2-10.6,2.7-20.4-6.2-26.2-9.3-36a138.4,138.4,0,0,1-6.2-27.1c-1.3-10.2,0-14.3,0-14.3s-6.5-3.1-14.1-7.6-9.8-1.3-13.8,0-9.3,1.6-12.1-2.4-3.1,0-3.1,0l-2.3,70.7L20.7,95.8s-2.2,10.2,1.7,20,4,12.1,2.7,14.3,0.5,6.2,3.1,12.5,5.7,14.6,6.7,17.8-4,8.5-5.7,13.3-6.2,4.5-3.1,11.6,0.5,7.6,1.7,12.8,3.1,9.3,1,12.1a52.28,52.28,0,0,1-4.9,5.3,41,41,0,0,1,4,11.6Z' transform='translate(-17.58 -29.32)'/>

          <text id='Anoka-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(494.85 805.93)' textAnchor='middle' dominantBaseline='middle'>XX</text>
          <text id='Mendota-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(526.04 870.81)' textAnchor='middle' dominantBaseline='middle'>XX</text>
          <text id='Wabasha-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(688.98 982.18)' textAnchor='middle' dominantBaseline='middle'>XX</text>
          <text id='Kasota-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(406.08 993.01)' textAnchor='middle' dominantBaseline='middle'>XX</text>
          <text id='Kandiyohi-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(266.92 817.68)' textAnchor='middle' dominantBaseline='middle'>XX</text>
          <text id='Minnehaha-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(519.17 864.99)' textAnchor='middle' dominantBaseline='middle'>XX</text>
          <text id='Shakopee-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(472.73 889.24)' textAnchor='middle' dominantBaseline='middle'>XX</text>
          <text id='Chanhassen-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(472.73 875.56)' textAnchor='middle' dominantBaseline='middle'>XX</text>
          <text id='Minnetonka-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(482.67 864.24)' textAnchor='middle' dominantBaseline='middle'>XX</text>
          <text id='LakeCalhoun-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(503.08 855.68)' textAnchor='middle' dominantBaseline='middle'>XX</text>
          <text id='Waconia-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(434.67 878.49)' textAnchor='middle' dominantBaseline='middle'>XX</text>
          <text id='Wayzata-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(475.67 852.74)' textAnchor='middle' dominantBaseline='middle'>XX</text>
          <text id='Mankato-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(401.21 1021.41)' textAnchor='middle' dominantBaseline='middle'>XX</text>
          <text id='Owatonna-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(514.48 1037.01)' textAnchor='middle' dominantBaseline='middle'>XX</text>
          <text id='Chaska-txt' className='cls-3' filter='url(#text-effect-1)' transform='translate(461.67 890.49)' textAnchor='middle' dominantBaseline='middle'>XX</text>

          <g className='z-container'>
            <g className='place-container'>
              <g>
                <path className='z-cls-1' d='M1152.14,633.26c-3.31,9.23,3.08,11.36,4,25.09s-0.95,18.93-11.6,26.27c-10.18,7.57-6.15,20.35,2.37,33.85s7.34,30.3,7.34,40.95-8.28,11.6-3.08,20.12,0.95,20.12-7.34,38.11-7.1,26.51-5.21,29.59c1.23,2,14.14,9.49,27.64,18.19A264.59,264.59,0,0,0,1157.15,591c-0.33.41-.66,0.84-1,1.31C1148.11,603.67,1155.45,624,1152.14,633.26Z' transform='translate(-526.1 -466.27)'/>
                <path id='z-Minnesota-txt' className='z-cls-2' d='M671.37,735.71c0,146,118.39,264.44,264.44,264.44a264.34,264.34,0,0,0,230.48-134.74c-13.5-8.7-26.41-16.19-27.64-18.19-1.89-3.08-3.08-11.6,5.21-29.59s12.54-29.59,7.34-38.11,3.08-9.47,3.08-20.12,1.18-27.46-7.34-40.95-12.54-26.27-2.37-33.85c10.65-7.34,12.54-12.54,11.6-26.27s-7.34-15.86-4-25.09-4-29.59,4-40.95c0.33-.47.66-0.9,1-1.31A264.19,264.19,0,0,0,935.81,471.27C789.76,471.27,671.37,589.66,671.37,735.71Z' transform='translate(-526.1 -466.27)'/>
              </g>

              <text id='z-Anoka-txt' className='z-cls-3' filter='url(#text-effect-1)' textAnchor='middle' dominantBaseline='middle' transform='translate(416.57 151.13)'>XX</text>
              <text id='z-Mendota-txt' className='z-cls-3' filter='url(#text-effect-1)' textAnchor='middle' dominantBaseline='middle' transform='translate(490.18 304.74)'>XX</text>
              <text id='z-Minnehaha-txt' className='z-cls-3' filter='url(#text-effect-1)' textAnchor='middle' dominantBaseline='middle' transform='translate(474.09 291.01)'>XX</text>
              <text id='z-Shakopee-txt' className='z-cls-3' filter='url(#text-effect-1)' textAnchor='middle' dominantBaseline='middle' transform='translate(364.03 348.29)'>XX</text>
              <text id='z-Chanhassen-txt' className='z-cls-3' filter='url(#text-effect-1)' textAnchor='middle' dominantBaseline='middle' transform='translate(364.03 316.1)'>XX</text>
              <text id='z-Minnetonka-txt' className='z-cls-3' filter='url(#text-effect-1)' textAnchor='middle' dominantBaseline='middle' transform='translate(387.7 289.12)'>XX</text>
              <text id='z-LakeCalhoun-txt' className='z-cls-3' filter='url(#text-effect-1)' textAnchor='middle' dominantBaseline='middle' transform='translate(435.98 269)'>XX</text>
              <text id='z-Waconia-txt' className='z-cls-3' filter='url(#text-effect-1)' textAnchor='middle' dominantBaseline='middle' transform='translate(274.09 322.97)'>XX</text>
              <text id='z-Wayzata-txt' className='z-cls-3' filter='url(#text-effect-1)' textAnchor='middle' dominantBaseline='middle' transform='translate(371.13 261.9)'>XX</text>
              <text id='z-Chaska-txt' className='z-cls-3' filter='url(#text-effect-1)' textAnchor='middle' dominantBaseline='middle' transform='translate(337.99 351.37)'>XX</text>

              <circle className='z-cls-4' cx='412.56' cy='269.44' r='264.44'/>
            </g>
            <polygon className='z-cls-5' points='158 321 36 390 169 372 157.12 347.7'/>
          </g>

        </svg>

          ) : (

          <svg id='StateMN' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 995.58 1146.08'>
            <defs>
            </defs>
            <title>minnesota-map-outline-silhouettec</title>

            <path id='Minnesota' className='cls-1' d='M26.9,236.6c-1,1.1-.2,3.3-0.5,4.9s-1,2.9-1.3,4.5a16,16,0,0,0-.4,4.9,22.68,22.68,0,0,1-.6,5c-0.6,3.6,1.1,6,1.9,9.2a10,10,0,0,0,.4,2.4c0.4,0.7.9,0.9,1.1,1.4,1.1,1.9,1.6,1.7,1.9,4.4,0.1,1.9-.1,3,0.9,4.6s2,2.1,2.4,4.4c0.2,1.7-.1,3.5,0,5.3a7.38,7.38,0,0,0,.1,2.6c0.2,0.6,1.4,1,1.5,1.5,0.6,1.6-.2,2.1-0.9,3.9-0.6,2-.4,3,0.4,5a8.3,8.3,0,0,0,2,3.4c1.4,1.4,3.1.9,3.4,3.1,0.1,0.9-.7,2.4-0.9,3.2a17.32,17.32,0,0,0,.5,3.5c0.5,3.1.9,3.3,2.7,5.6,1.5,1.9,2.6,4.4,2.2,6.5-0.4,1.9-1.9,4.7,1.5,5.3,0.1,1.1-.1,2.6.4,3.6,0.4,0.7,1.7,1.4,2.2,2.2,1.3,2.1,1,5.1,1.3,7.5,0.9,4.5,4,7.9,4.1,12.8,0,2.7,0,4.9,1.1,7.2,1.1,1.9,3.1,3.3,3.3,5.6,0.1,0.7-.1,3.1-0.6,3.5-1,1.4-1.9-.1-2.1,2.2s2.1,3.7,1.6,6.6c-0.2,0-.5.1-0.7,0.1-0.5,1.6.6,2.9,0.9,4.4,0.4,1.9-.2,3-1.1,4.5-1,1.9-1.4,2.1-1.3,4,0.1,1.5.9,2.9,1,4.5,0.1,1.4-.9,3.4-0.4,4.5s2.2,1.7,2.7,3c1.3,3.1-.6,6.6-0.1,9.7a0.52,0.52,0,0,0-.4-0.2c-1.5,13.1.9,26-.1,39-0.2,3.4.1,6.8-.5,10.2a56.33,56.33,0,0,0-1,9.3c0,1.5.4,3.4-.1,4.9-0.2.7-1.3,1.4-1.3,2.4s1.1,1,1.3,1.4c0.5,1.4.2,9.7,3.5,7.6,0.6,1.1.5,2.4,1,3.5,0.9,1.7,1.3,1.3,2.7,2.2,3.4,2.2,1.1,3.5,1.3,7.1-0.5-.1-1.1.2-1.6,0.1-0.2,2.1-.1,3-1.1,4.7-0.5.9-1.1,0.7-1.5,1.9a8.1,8.1,0,0,0-.1,3.1,12.18,12.18,0,0,1,0,2.7c-0.2,1.1-1.1,1.3-1.3,1.9-0.9,2-.2,3.1.2,5,1.5,6.2,1.7,14.9-.2,21.2-1.1,3.3-3.7,6.2-2.7,9.7,1.1,3.3,2.9,5.9,4.5,8.8,3.5,6.1.2,14.8,3.4,20.9,0.7,1.3,1.5,1.1,2.4,2.1s0.6,2.4.7,3.6c0.5,2.9.4,5.6,2.4,8a15,15,0,0,1,3.3,5.9c0.9,2.6,3.5,4.4,3.3,7.5a11.63,11.63,0,0,1,4.4,3.2c1,1.4.7,6.2,1.3,6.2l-0.5,4.5c0,0.2-.7,2.7-0.9,3.6,0,1.7,1,3,.9,4.9-0.1,1.7-1.4,2.5-.6,4.5,0.7,1.6,2,1.6,2.4,3.5,0.2,1.6-.6,3.1-0.4,4.9,0.2,1.6.9,3.1,0.9,5,0,3.9,1,7.2,1.3,10.6,0.4,4.1-2,6.2-2.7,9.8-0.6,3.2-.2,7.9,0,11.1,0.7,7.2,1.1,14.5,0,21.8-1.1,7.5-4.5,11.5-8.7,17.4a77.86,77.86,0,0,1-6.4,8.7c-2.5,2.7-6,4.2-9.3,5.9-4.9,2.4-13.3,6.5-14.6,12.1-0.9,3.4-1.1,5.9.9,8.8,1.5,2.5,3.4,4.5,4.9,7.1,2.9,5.3,3.4,10.8,6.4,16.1a36.82,36.82,0,0,0,5.3,7c1.7,2,3.3,5.1,5.6,6.5,2.6,1.4,6.1.2,9,1.1,2.6,1,4.7,3.4,7.1,4.9,2.9,1.6,4.9,2.7,7.2,5.2,1.6,1.6,3.3,5.1,4.4,5.9L94,815,81.5,1165.4l736.5,7.5a0.59,0.59,0,0,0,.5-0.9c-1.1-1.9-3.4-6.7-3-9.7,0.5-4-1.7-7.1-3.5-15.1s2.2-16.8,2.2-23.1-9.3-24-16.1-32.9-21.8-17.8-29.8-20-8.5-7.6-16.8-14.3c-8.5-6.7-7.6-5.7-16.1-11.1s-12.1-9.8-12.1-15.1-6.7-6.7-6.2-13.3S714,1006.3,701,1001c-12.8-5.3-26.6-8.8-30.6-14.3s-2.2-16.8-11.1-17.8-21.8-1-27.5-3.1-4-6.7-8.5-7.6-0.5-6.2-7.6-12.1c-7.1-5.7-19.6-12.5-20.4-13.8s-1.3-4.9,2.2-12.5,5.3-12.5,3.1-16.1,1.3-4,1.3-8.5,0.5-11.6-3.1-17.3-5.3-11.1-1-14.3c4.5-3.1,5.3-5.3,4.9-11.1s-3.1-6.7-1.7-10.6-1.7-12.5,1.7-17.3,6.2-2.2,7.1-6.2-1.3-6.2,2.2-9.3,6.2-7.6,5.3-11.6-5.3-4.5-8-8.8a40.12,40.12,0,0,1-5.7-14.6c-1-5.3-2.2-3.1-8.5-2.7S584,776.3,584,761.2s0-16.8,4.5-20,11.1-8,12.1-13.3,2.2-14.3,6.2-18.3S622.4,698,625.9,698s2.7-5.3,7.1-6.2,5.7,3.1,8,0,1.7-8.5,7.1-7.6,8.5,3.7,9.8-.1,1.7-8.8,4-8.3c0.3,0.1.6,0.1,0.9,0.2a1.11,1.11,0,0,0,1.3-1.1l-0.5-115.1h10.6s4.5-3.5,4.9-5.3-1-4.5,2.7-6.7c3.5-2.2,7.6-2.7,8.5-6.7s-4.9-5.3,1.3-10.2,28.9-17.3,36-23.5,34.2-32.9,39.1-36.4a122.64,122.64,0,0,0,17.8-16.4c4.5-5.3,24-26.6,26.2-30.1s20.9-26.6,31.1-33.9c10.2-7.1,43.1-32.4,53.8-36.4s33.4-13.8,38.6-14.6,11.1-2.7,13.8-4.5,14.6-7.6,18.7-9.3,34.1-18.7,39.6-24.4c8.3-7.2,2.2-6.6,2.2-6.6l-5-2.2c-5-2.2-6.7-3.1-10.2-2.7s-5.3,5.7-11.6,6.2-10.6-.5-13.3-3.5-4.9-9.3-8-12.5-13.3-4.5-20.4-4.5-14.3-1.3-18.7,0-8.8,4.5-11.6,2.7-5.3-5.2-11.1-3.3-8.5,4.6-9.8,1.5-1.7-5-7.1-2-13.8,8.7-16.8,6-8-7.6-5.7-10.6-4-6.7-5.7-9.8-1.3-10.6-5.3-9.8-18.7,7.1-24,10.6c-5.5,3.5-20.9,18.3-25.8,20.9s-4,4.5-10.6,4-11.1,7.6-14.3,4-15.6,2.2-16.4-3.1c-1-5.3-12.5-9.8-12.5-9.8s-8.5-1.7-7.6-9.3-1.3-6.7-1.3-6.7l-16.8-1L714,255a12.88,12.88,0,0,1-9.8-2.7c-4.5-3.5-8-11.1-8-16.1s-3.5-5.3-8.5-5.3-11.7,1.7-19.6,3.1-11.1,4.9-8.8,10.2,8,9.3,4.9,10.2-8,4.9-11.1,3.1-14.3-18.3-15.6-22.7,2.2-8,1.7-12.1-2.7-9.8-12.1-7.6-15.6,4.5-18.3,1.3-6.4-14.2-.5-12.1c8.5,3.1,15.1-6.7,5.3-8.8s-14.6,0-24-5.7-15.6-10.2-28.4-9.3-19.1,0-20.9-2.7-9.3-2.7-14.6,0-3.1,7.1-7.6,5.7-10.2,1.3-10.6,4-1,8-2,8.5-10.3,6.2-16.6,4.9-5.7.5-12.1,1c-6.2.5-16.1,0.5-15.6-4.9s4.5-7.6.5-13.8-12.8-4-23.1-5.3-24.9-.5-29.8-2-4.5-6.5-6.2-9.6-10.6-5.7-18.7-4,0,6.2-8,4.9-4.5.6-13.3-5.5-16.8-10.5-15.6-20.3,6.2-10.6,2.7-20.4-6.2-26.2-9.3-36a138.4,138.4,0,0,1-6.2-27.1c-1.3-10.2,0-14.3,0-14.3s-6.5-3.1-14.1-7.6-9.8-1.3-13.8,0-9.3,1.6-12.1-2.4-3.1,0-3.1,0l-2.3,70.7L20.7,95.8s-2.2,10.2,1.7,20,4,12.1,2.7,14.3,0.5,6.2,3.1,12.5,5.7,14.6,6.7,17.8-4,8.5-5.7,13.3-6.2,4.5-3.1,11.6,0.5,7.6,1.7,12.8,3.1,9.3,1,12.1a52.28,52.28,0,0,1-4.9,5.3,41,41,0,0,1,4,11.6Z' transform='translate(-17.58 -29.32)'/>

            <circle id='Anoka' className='cls-2' cx='494.85' cy='805.93' r='5'/>
            <circle id='Mendota' className='cls-2' cx='526.04' cy='870.81' r='5'/>
            <circle id='Wabasha' className='cls-2' cx='688.98' cy='982.18' r='5'/>
            <circle id='Kasota' className='cls-2' cx='406.08' cy='993.01' r='5'/>
            <circle id='Kandiyohi' className='cls-2' cx='266.92' cy='817.68' r='5'/>
            <circle id='Minnehaha' className='cls-2' cx='519.17' cy='864.99' r='5'/>
            <circle id='Shakopee' className='cls-2' cx='472.73' cy='889.24' r='5'/>
            <circle id='Chanhassen' className='cls-2' cx='472.73' cy='875.56' r='5'/>
            <circle id='Minnetonka' className='cls-2' cx='482.67' cy='864.24' r='5'/>
            <circle id='LakeCalhoun' className='cls-2' cx='503.08' cy='855.68' r='5'/>
            <circle id='Waconia' className='cls-2' cx='434.67' cy='878.49' r='5'/>
            <circle id='Wayzata' className='cls-2' cx='475.67' cy='852.74' r='5'/>
            <circle id='Mankato' className='cls-2' cx='401.21' cy='1021.41' r='5'/>
            <circle id='Owatonna' className='cls-2' cx='514.48' cy='1037.01' r='5'/>
            <circle id='Chaska' className='cls-2' cx='461.67' cy='890.49' r='5'/>

          </svg>

        )}

      </div>
    );
  }

}

StateOutline.propTypes = {

  playState: React.PropTypes.bool,
  featured: React.PropTypes.string,
  textMode: React.PropTypes.bool,
  labelOrder: React.PropTypes.object,

};

StateOutline.defaultProps = {

  playState: true,
  featured: '',
  textMode: false,
  labelOrder: {},

};

export default StateOutline;
