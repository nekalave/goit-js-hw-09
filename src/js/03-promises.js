import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.7.min.css"

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const initDelay = Number(event.target.elements.delay.value);
  const stepDelay = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);
    for (let i = 1; i <= amount; i += 1) {
      const delay = initDelay + stepDelay * (i - 1);
      createPromise(i, delay)
        .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay})
    } else {
      reject({ position, delay})
    }
  }, delay)
  })
}