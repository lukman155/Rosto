import './style.css';
import logo from './images/Rosto.jpg';

const logoImg = document.querySelector('.logo');

logoImg.src = logo;
const baseURl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken';

const getMeals = async (url) => {
  const data = await fetch(url);
  return data.json();
};

const displayPopup = () => {
  console.log('displayPopup');
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

//   data.forEach((item) => {
//     container.innerHTML += `
//     <li class='card'>
//     <div class='img-holder'>
//       <img src='${item.strMealThumb}' alt='' />
//     </div>
//     <div class="info">
//       <h2 class="card-title">${item.strMeal}</h2>
//       <button onclick=''
//       )}' class='explore'>Explore more</button>
//     </div>
//   </li>
// `;
//   });
// };

document.addEventListener('DOMContentLoaded', async () => {
  const data = await getMeals(baseURl);
  render(data.meals);
});
