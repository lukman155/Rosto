import './style.css';
import logo from './images/Rosto.jpg';
import closeIcon from './images/x.svg';

import { postLikes, getLikes } from './modules/likes.js';
import { mealCounter, commentsCounter } from './modules/counter.js';
import { getMeals, getCommentsList, postComment } from './modules/requests.js';

const logoImg = document.querySelector('.logo');
const closeImg = document.querySelector('.close');
logoImg.src = logo;

closeImg.src = closeIcon;

const handelBase = (category = 'Beef') => {
  const baseURl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  return `${baseURl}${category}`;
};

const placeholderImg =
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fplaceholder-image&psig=AOvVaw1vn5H7sUkiIacQfXSh0py-&ust=1669294383106000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKi4qKesxPsCFQAAAAAdAAAAABAE';
const form = document.querySelector('form');

const likeTemplate = `
      <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
        <g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
          <path id="heart" d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" fill="#AAB8C2"/>
          <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>

          <g id="grp7" opacity="0" transform="translate(7 6)">
            <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/>
            <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/>
          </g>


          <g id="grp6" opacity="0" transform="translate(0 28)">
            <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/>
            <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/>
          </g>

          <g id="grp3" opacity="0" transform="translate(52 28)">
            <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/>
            <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/>
          </g>

          <g id="grp2" opacity="0" transform="translate(44 6)">
            <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"/>
            <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp5" opacity="0" transform="translate(14 50)">
            <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2"/>
            <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp4" opacity="0" transform="translate(35 50)">
            <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2"/>
            <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp1" opacity="0" transform="translate(24)">
            <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
            <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
          </g>
        </g>
      </svg>`;

const displayCommentsList = async (data) => {
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

const displayPopup = async (item, id) => {
  const data = await getCommentsList(id);
  const modal = document.querySelector('.overlay');
  const img = document.querySelector('.modal-img img');
  const productTitle = document.querySelector('.product-title');
  form.parentElement.setAttribute('data-set', id);
  img.src = item ? item.strMealThumb : placeholderImg;
  productTitle.textContent = item.strMeal;
  modal.classList.add('active-modal');
  commentsCounter(data);
  displayCommentsList(data);
};

const render = async (data) => {
  const likesData = await getLikes();
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

    const likeContainer = document.createElement('div');
    likeContainer.classList.add('like-container');

    const likeInput = document.createElement('input');
    likeInput.type = 'checkbox';
    likeInput.setAttribute('id', `${item.idMeal}`);
    likeInput.classList.add('checkbox');
    likeInput.addEventListener('change', () => {
      if (likeInput.checked) {
        postLikes(item.idMeal);
        const element = document.querySelector(`.a${item.idMeal}`);
        let likesCount = element.textContent.split(' ')[0];
        likesCount = parseInt(likesCount, 10) + 1;
        element.textContent = `${likesCount} likes`;
      }
    });

    const label = document.createElement('label');
    label.setAttribute('for', `${item.idMeal}`);
    label.innerHTML = likeTemplate;

    const noLikes = document.createElement('span');
    noLikes.classList.add(`a${item.idMeal}`);

    noLikes.textContent = `${likesData[item.idMeal]?.likes || 0} likes`;

    const btn = document.createElement('button');
    btn.classList.add('explore');
    btn.textContent = 'View Recipe';
    btn.addEventListener('click', async () => {
      const cardId = btn.parentElement.parentElement.parentElement.dataset.set;
      displayPopup(item, cardId);
    });

    info.appendChild(title);
    likeContainer.append(likeInput, label, noLikes, btn);
    info.appendChild(likeContainer);
    card.appendChild(info);
    container.appendChild(card);
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  const getData = await getMeals(handelBase());
  render(getData);
  setTimeout(() => {
    mealCounter();
  }, 500);
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', async () => {
    const data = await getMeals(handelBase(link.textContent));
    render(data);
    mealCounter();
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
  await postComment({ item_id: popupId, username, comment });

  const numberOfComments = document.querySelector('.comments').textContent;

  document.querySelector('.comments').textContent = `${
    Number(numberOfComments) + 1
  }`;

  const commentText = document.createElement('li');
  commentText.classList.add('comment');
  const date = new Date();
  const year = date.toLocaleString('default', { year: 'numeric' });
  const month = date.toLocaleString('default', { month: '2-digit' });
  const day = date.toLocaleString('default', { day: '2-digit' });
  const formatDate = `${year}-${month}-${day}`;

  commentText.innerHTML = `<p>${formatDate}<p/>
  <p>${username}<p/> 
  <p>${comment}<p/>`;
  document.querySelector('.comments-list').appendChild(commentText);

  form.reset();
});
