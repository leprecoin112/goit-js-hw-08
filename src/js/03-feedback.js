import storage from './storage';
import throttle from 'lodash.throttle';

const FORM_STATE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};
const formData = readFromStorage();

refs.form.addEventListener('input', throttle(onWriteToStorageInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  sendForm(e.target);
  storage.remove(FORM_STATE_KEY);
}

function sendForm(form) {
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, name) => {
    data[name] = value;
  });

  console.log(data);
  form.reset();
}

function onWriteToStorageInput(e) {
  formData[e.target.name] = e.target.value;
  storage.save(FORM_STATE_KEY, formData);
}

function readFromStorage() {
  const saveData = storage.load(FORM_STATE_KEY);
  if (saveData) {
    refs.email.value = saveData.email;
    refs.message.value = saveData.message;
    return saveData;
  }

  return {};
}
