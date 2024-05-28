const startButton = document.querySelector('button[data-start]')
const stopButton = document.querySelector('button[data-stop]')
let timerId;

startButton.addEventListener('click', (e) => {
  startButton.setAttribute('disabled', '')
  stopButton.removeAttribute('disabled')
  timerId = setInterval(() => {
    document.querySelector('body').style.backgroundColor = `${getRandomHexColor()}`
  }, 1000)
});

stopButton.addEventListener('click', (e) => {
  stopButton.setAttribute('disabled', '')
  startButton.removeAttribute('disabled')
  clearInterval(timerId);
});


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


