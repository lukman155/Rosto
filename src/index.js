import './style.css';
import logo from './images/Rosto.jpg';

const logoImg = document.querySelector('.logo');

logoImg.src = logo;
const baseURl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken';

const getMeals = async (url) => {
  const data = await fetch(url);
  return data.json();
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
