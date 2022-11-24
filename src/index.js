import './style.css';
import logo from './images/Rosto.jpg';
import closeIcon from './images/x.svg';

const logoImg = document.querySelector('.logo');
const closeImg = document.querySelector('.close');
logoImg.src = logo;
closeImg.src = closeIcon;

const baseURl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken';

const commentsURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/QFvjY7RTqycik4cqN134/comments';
const placeholderImg = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fplaceholder-image&psig=AOvVaw1vn5H7sUkiIacQfXSh0py-&ust=1669294383106000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKi4qKesxPsCFQAAAAAdAAAAABAE';
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

const displayPopup = async (item) => {
  const modal = document.querySelector('.overlay');
  const img = document.querySelector('.modal-img img');
  const productTitle = document.querySelector('.product-title');
  const form = document.querySelector('form');
  img.src = item ? item.strMealThumb : placeholderImg;
  productTitle.textContent = item.strMeal;
  modal.classList.add('active-modal');
  commentsCounter(item.idMeal);
  displayCommentsList(item.idMeal);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.querySelector('.name').value;
    const comment = document.querySelector('.insights').value;
    await postData({ item_id: item.idMeal, username, comment });
    commentsCounter(item.idMeal);
    displayCommentsList(item.idMeal);

    form.reset();
  });
};

const render = async () => {
  const data = await getMeals(baseURl);
  const container = document.querySelector('.container');
  container.innerHTML = '';
  data.meals.forEach((item) => {
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
      displayPopup(item);
    });

    info.appendChild(title);
    info.appendChild(btn);
    card.appendChild(info);
    container.appendChild(card);
  });
};

document.addEventListener('DOMContentLoaded', render);

closeImg.addEventListener('click', () => {
  const modal = document.querySelector('.overlay');
  modal.classList.remove('active-modal');
});
