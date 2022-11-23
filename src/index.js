import './style.css';
import logo from './images/Rosto.jpg';

const logoImg = document.querySelector('.logo');

logoImg.src = logo;
const baseURl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken';
const commentsURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/QFvjY7RTqycik4cqN134/comments';
const likesURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/QFvjY7RTqycik4cqN134/likes';
// const postData = async (data = {}) => {
//   const postedData = await fetch(commentsURL, {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });
//   console.log(postedData.json());
//   return postedData;
// };

const getMeals = async (url) => {
  const data = await fetch(url);
  return data.json();
};

const getCommentsList = async (id) => {
  const comments = await fetch(`${commentsURL}?item_id=${id}`);
  return comments.json();
};

const displayPopup = async (item) => {
  //   const commentsData = await getCommentsList(item.id);
  //   console.log(item.id);
  console.log('got logged without call!!');
  //   const modal = document.querySelector('.overlay');

  //   const img = document.querySelector('.modal-img img');
  //   const productTitle = document.querySelector('.product-title');
  //   const commentsText = document.querySelector('.comments');
  //   const commentsList = document.querySelector('.comments-list');
  //   const form = document.querySelector('form');
  // img.src = item ? item.strMealThumb : placeholderImg;
  // productTitle.textContent = item.strMeal;
  // commentsText.textContent = `Comments (${commentsData.length})`;
  //   modal.classList.add('active-modal');
  //   commentsList.innerHTML = '';
  //   commentsData.forEach((comment) => {
  //     commentsList.innerHTML += `<li>
  //      ${comment.username}: ${comment.insights}
  //     <li/>`;
  //   });

  //   form.addEventListener('submit', async (e) => {
  //     e.preventDefault();
  //     const username = document.querySelector('.name').value;
  //     const comment = document.querySelector('.insights').value;
  //     await postData({ item_id: item.id, username, comment });
  //   });
};

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

    const label = document.createElement('label');
    label.setAttribute('for', `${item.idMeal}`);
    label.innerHTML = likeTemplate;

    const btn = document.createElement('button');
    btn.classList.add('explore');
    btn.textContent = 'View Recipe';
    btn.addEventListener('click', () => {
      displayPopup();
    });

    info.appendChild(title);
    likeContainer.appendChild(likeInput);
    likeContainer.appendChild(label);
    likeContainer.appendChild(btn);
    info.appendChild(likeContainer);
    card.appendChild(info);
    container.appendChild(card);
  });
};

const mealCounter = () => {
  const container = document.querySelector('.container');
  const mealcounter = document.querySelector('.meal-count');
  mealcounter.innerHTML = `(${container.children.length} recipes available)`;
};

document.addEventListener('DOMContentLoaded', async () => {
  const data = await getMeals(baseURl);
  render(data.meals);
  mealCounter();
});
