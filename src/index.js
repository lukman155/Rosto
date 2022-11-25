import './style.css';
import logo from './images/Rosto.jpg';
import closeIcon from './images/x.svg';

const logoImg = document.querySelector('.logo');
const closeImg = document.querySelector('.close');
logoImg.src = logo;
closeImg.src = closeIcon;

const handelBase = (category = 'Seafood') => {
  const baseURl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  return `${baseURl}${category}`;
};

const commentsURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/QFvjY7RTqycik4cqN134/comments';
const placeholderImg = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fplaceholder-image&psig=AOvVaw1vn5H7sUkiIacQfXSh0py-&ust=1669294383106000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKi4qKesxPsCFQAAAAAdAAAAABAE';
const form = document.querySelector('form');
const postData = async (data = {}) => {
  const postedData = await fetch(commentsURL, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return postedData;
};

const getMeals = async (url) => {
  const data = await fetch(url);
  return data.json();
};

const getCommentsList = async (id) => {
  const comments = await fetch(`${commentsURL}?item_id=${id}`);
  return comments.json();
};

const displayCommentsList = async (id) => {
  const data = await getCommentsList(id);
  const commentsList = document.querySelector('.comments-list');
  commentsList.innerHTML = '';
  if (data.length) {
    data.forEach((comment) => {
      commentsList.innerHTML += `<li class='comment'>
        <p>${comment.creation_date}<p/>
        <p>${comment.username}<p/> 
        <p>${comment.comment}<p/>
      <li/>`;
    });
  } else commentsList.innerHTML = '<li>No comments</li>';
};

const commentsCounter = async (id) => {
  const commentsData = await getCommentsList(id);
  const commentsText = document.querySelector('.comments');
  commentsText.textContent = `Comments (${
    commentsData.length ? commentsData.length : 0
  })`;
};

const displayPopup = (item, id) => {
  const modal = document.querySelector('.overlay');
  const img = document.querySelector('.modal-img img');
  const productTitle = document.querySelector('.product-title');
  form.parentElement.setAttribute('data-set', id);
  img.src = item ? item.strMealThumb : placeholderImg;
  productTitle.textContent = item.strMeal;
  modal.classList.add('active-modal');
  commentsCounter(id);
  displayCommentsList(id);
};

const render = async (data) => {
  const container = document.querySelector('.container');
  container.innerHTML = '';
  data.meals.forEach((item) => {
    const card = document.createElement('li');
    card.setAttribute('data-set', item.idMeal);
    card.classList.add('card');
    card.innerHTML = `
      <div class='img-holder'>
      <img src='${item.strMealThumb}' alt='${item.strMeal}' />
      </div>`;
    const info = document.createElement('div');
    info.classList.add('info');
    const title = document.createElement('h2');
    title.classList.add('card-title');
    title.textContent = item.strMeal;

    const btn = document.createElement('button');
    btn.classList.add('explore');
    btn.textContent = 'View Recipe';
    info.append(title, btn);
    card.appendChild(info);
    container.appendChild(card);
    btn.addEventListener('click', async () => {
      const cardId = btn.parentElement.parentElement.dataset.set;
      displayPopup(item, cardId);
    });
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  const getData = await getMeals(handelBase());
  render(getData);
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', async () => {
    const data = await getMeals(handelBase(link.textContent));
    render(data);
  });
});

closeImg.addEventListener('click', () => {
  const modal = document.querySelector('.overlay');
  modal.classList.remove('active-modal');
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.querySelector('.name').value;
  const comment = document.querySelector('.insights').value;
  const popupId = form.parentElement.dataset.set;
  await postData({ item_id: popupId, username, comment });
  commentsCounter(popupId);
  displayCommentsList(popupId);

  form.reset();
});
