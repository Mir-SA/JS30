// Get all the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButton = player.querySelectorAll('[data-skip]');
const ranger = player.querySelectorAll('.player__slider');

// Build all "our" functions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();

  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
}

document.onkeydown = function (event) {
  switch (event.keyCode) {
    case 32:
      event.preventDefault();
      togglePlay();
      break;
  }
};

function updateButton() {
  const buttonIcon = this.paused ? '►' : '❚❚';

  // console.log(buttonIcon);
  toggle.textContent = buttonIcon;
}

function skip() {
  // console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function updateRange() {
  video[this.name] = this.value;

  // console.log(this.name);
  // console.log(this.value);
}

function progressHandle() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;

  // console.log(e);
}

// Add the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressHandle);

let mousedown = false;
toggle.addEventListener('click', togglePlay);
skipButton.forEach(button => button.addEventListener('click', skip));
ranger.forEach(slider => slider.addEventListener('change', updateRange));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousedown', () => mousedown = true);
