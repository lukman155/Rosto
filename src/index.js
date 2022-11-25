import './style.css';
import logo from './images/Rosto.jpg';
import { postLikes, getLikes, renderLikes } from './modules/likes.js';
import mealCounter from './modules/counter.js';
import { getMeals, baseURl } from './modules/requests.js';

const logoImg = document.querySelector('.logo');

logoImg.src = logo;

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

const render = (data) => {
  const container = document.querySelector('.container');
  container.innerHTML = '';
  data.forEach((item) => {
    const card = document.createElement('li');
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
        getLikes(item.idMeal);
      }
    });

    const label = document.createElement('label');
    label.setAttribute('for', `${item.idMeal}`);
    label.innerHTML = likeTemplate;

    const noLikes = document.createElement('span');
    noLikes.classList.add('no-likes');
    noLikes.classList.add(`a${item.idMeal}`);
    noLikes.textContent = '';

    const btn = document.createElement('button');
    btn.classList.add('explore');
    btn.textContent = 'View Recipe';
    btn.addEventListener('click', () => {

    });

    info.appendChild(title);
    likeContainer.appendChild(likeInput);
    likeContainer.appendChild(label);
    likeContainer.appendChild(noLikes);
    likeContainer.appendChild(btn);
    info.appendChild(likeContainer);
    card.appendChild(info);
    container.appendChild(card);
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  const data = await getMeals(baseURl);
  render(data.meals);
  mealCounter();
  renderLikes();
});
