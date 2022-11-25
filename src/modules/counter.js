const mealCounter = () => {
  const container = document.querySelector('.container');
  const mealcounter = document.querySelector('.meal-count');
  mealcounter.innerHTML = `(${container.children.length} recipes available)`;
};

export default mealCounter;