import './style.css';
import logo from './images/Rosto.jpg';

const logoImg = document.querySelector('.logo');

logoImg.src = logo;
const baseURl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken';
const commentsURL =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/QFvjY7RTqycik4cqN134/comments';
const placeholderImg =
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fplaceholder-image&psig=AOvVaw1vn5H7sUkiIacQfXSh0py-&ust=1669294383106000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKi4qKesxPsCFQAAAAAdAAAAABAE';
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
  console.log(postedData.json());
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
    container.innerHTML += `
    <li class='card'>
    <div class='img-holder'>
      <img src='${item.strMealThumb}' alt='' />
    </div>
    <div class="info">
      <h2 class="card-title">${item.strMeal}</h2>
      <button onclick=''
      )}' class='explore'>Explore more</button>
    </div>
  </li>
`;
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  const data = await getMeals(baseURl);
  render(data.meals);
});
