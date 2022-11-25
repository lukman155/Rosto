export const mealCounter = () => {
  const container = document.querySelector('.container');
  const mealcounter = document.querySelector('.meal-count');
  mealcounter.innerHTML = `(${
    container.children.length || 0
  } recipes available)`;
};

export const commentsCounter = (commentsData) => {
  const commentsText = document.querySelector('.comments');
  commentsText.textContent = commentsData?.length ? commentsData.length : 0;
  return commentsData;
};
