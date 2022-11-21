import Player from '@vimeo/player';
import storage from './storage';
import throttle from 'lodash.throttle';

const VIDEO_PLAYER_KEY = 'videoplayer-current-time';

const videoPlayerEl = document.querySelector('#vimeo-player');
const player = new Player(videoPlayerEl);

setCurrentTimePlay(storage.load(VIDEO_PLAYER_KEY));

player.on('timeupdate', throttle(currentTimePlay, 1000));

function currentTimePlay(e) {
  storage.save(VIDEO_PLAYER_KEY, e);
}

function setCurrentTimePlay(time) {
  if (time) {
    player.setCurrentTime(time.seconds);
  }
}
