import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.7.min.css"
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startButton = document.querySelector('button[data-start]');
const datePicker = document.querySelector('#datetime-picker');
let targetDateMs;
let timerId = null;

document.querySelector('.timer').style.display = 'flex';
const fields = document.querySelectorAll('.field');
fields.forEach(field=>{
  field.style.display = 'flex';
  field.style.flexDirection = 'column'
  field.style.alignItems = 'center'
  field.style.padding = '5px'
  field.style.marginTop = '10px'
  field.style.marginRight = '10px'
  field.style.border = '1px solid'
})

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = `${Math.floor(ms / day)}`.padStart(2, '0');
  // Remaining hours
  const hours = `${Math.floor((ms % day) / hour)}`.padStart(2, '0');
  // Remaining minutes
  const minutes = `${Math.floor(((ms % day) % hour) / minute)}`.padStart(2, '0');
  // Remaining seconds
  const seconds = `${Math.floor((((ms % day) % hour) % minute) / second)}`.padStart(2, '0');

  return {days, hours, minutes, seconds};

}

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date().getTime();
    const selectedDate = selectedDates[0].getTime();

    if (selectedDate >= now) {
      startButton.removeAttribute('disabled');
      targetDateMs = selectedDate;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
});


startButton.addEventListener('click', () => {
  startButton.setAttribute('disabled', '');
  datePicker.setAttribute('disabled', '');

  timerId = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = targetDateMs - now;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      Notiflix.Notify.success('Countdown completed!');
      return;
    }

    const {days, hours, minutes, seconds} = convertMs(timeLeft);
    document.querySelector('[data-days]').innerText = days;
    document.querySelector('[data-hours]').innerText = hours;
    document.querySelector('[data-minutes]').innerText = minutes;
    document.querySelector('[data-seconds]').innerText = seconds;
  }, 1000);

});

