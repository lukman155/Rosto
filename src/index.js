import './style.css';
import logo from './images/Rosto.jpg';

const logoImg = document.querySelector('.logo');
logoImg.src = logo;

const chicken = 'www.themealdb.com/api/json/v1/1/filter.php?c=Chicken';
const beef = 'www.themealdb.com/api/json/v1/1/filter.php?c=Beef';
const seafood = 'www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';

const render = (data) => {
  const container = document.querySelector('.container');
  container.innerHTML = '';
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
            <img src="${item.strMealThumb}" alt="${item.strMeal}">
            <h2>${item.strMeal}</h2>
        `;
    container.appendChild(card);
};

const getMeals = async (target) => {
  const response = await fetch(target);
  return response.json();
};

document.querySelector('.beef').addEventListener('click', async () => {
  const data = await getMeals(chicken);
  console.log(data);
});