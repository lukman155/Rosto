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

    const btn = document.createElement('button');
    btn.classList.add('explore');
    btn.textContent = 'View Recipe';
    btn.addEventListener('click', () => {
      displayPopup();
    });

    info.appendChild(title);
    info.appendChild(btn);
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

