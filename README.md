# video-selector-base

This project is a starting place for future SMM video selectors. Replace the example assets and customize for you needs using CSS and Javascript.

To begin, clone this repository and copy all folder contents (except the hidden .git folder) into an empty repo folder.
* TODO - explain cloning into empty repo in more detail.

# Video Buttons
Any `<div>` node with the class `video-button` can be used to trigger a video so long as it has a `video-path` attribute, pathing to the video file you'd like played. Any html nested inside the Video Button div will become part of the button's clickable area.
For example, the following creates a simple text button that launches `videos/video_1.mp4` when clicked.
```
<div class='video-button' video-path='videos/video_1.mp4'>
  Click me to play video.
</div>
```

You can position and style video buttons using CSS (`css/main.css`). You may want to add unique ids or class names for targeting. Other functionality can be changed through options passed into the constructor of the Video Selector.
For example, if you want the screensaver to show up after two minutes, and your background an image of Stonehenge, use the following.
```
const options = { timeoutSecs:120,
                  background:'http://www.crystalinks.com/stonehengewalkway.jpg', };

new VideoSelector(options);
```


## Options

| Option            | Type                | Default | Description                                                           |
|-------------------|---------------------|---------|-----------------------------------------------------------------------|
| **timeoutSecs**   | `Number`            | `60`    | Seconds of inactivity before triggering screensaver mode. Set to 0 to disable.        |
| **hideCursor**    | `Boolean`           | `false`  | Hides cursor (for touch screens)                                      |
| **background** (mp4s coming soon)    | `String`            | `'images/background.png'`  | Path to either an image or video (mp4) asset. Providing a video asset will generate a looping background video                  |
| **screensaver**   | `String`            | `'videos/screensaver.mp4'` | Path to video asset which displays on loop during screensaver mode.                                              |
| **animation** (coming soon)          | `Boolean`           | `false`                     | Enables default animations for all buttons on press                       |
| **vidWidth**   | `Number`            | `1920`    | Width of video playback (usually matches screen dimension)        |
| **vidHeight**  | `Number`            | `1080`    | Height of video playback (usually matches screen dimension)     |



## .gitignore
I've included example videos because they can be useful while getting started. After replacing these assets, you should remove their filename exceptions from `.gitignore` so you don't push your own larger video files.
