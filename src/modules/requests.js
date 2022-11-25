const baseURl =
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast';
const commentsURL =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/QFvjY7RTqycik4cqN134/comments';

const postData = async (requestUrl, data = {}) => {
  const response = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const postComment = async (data = {}) => {
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

const getData = async (requestUrl) => {
  const data = await fetch(requestUrl);
  return data.json();
};

const getMeals = async (url) => {
  const data = await fetch(url);
  return data.json();
};

const getCommentsList = async (id) => {
  const comments = await fetch(`${commentsURL}?item_id=${id}`);
  return comments.json();
};

export { baseURl, postData, getData, getMeals, getCommentsList };
