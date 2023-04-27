import throttle from 'lodash.throttle';

const refs = {
  email: document.querySelector('[name="email"]'),
  textarea: document.querySelector('[name="message"]'),
  form: document.querySelector('form'),
};

const STORAGE_KEY = 'feedback-form-state';
let feedbackData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

function recoverData() {
  refs.email.value = feedbackData.email || '';
  refs.textarea.value = feedbackData.message || '';
}

recoverData();

function updateFeedbackData(event) {
  feedbackData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackData));
}
function onFormSubmitting(event) {
  event.preventDefault();
  if (refs.email.value === '' || refs.textarea.value === '') {
    alert('Будь ласка, заповніть всі поля форми.');
  }
  console.log(feedbackData);

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
  feedbackData = {};
}

refs.form.addEventListener('input', throttle(updateFeedbackData, 500));
refs.form.addEventListener('submit', onFormSubmitting);
