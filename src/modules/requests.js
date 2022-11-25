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

const getData = async (requestUrl) => {
  const data = await fetch(requestUrl);
  return data.json();
};

const getMeals = async (url) => {
  const data = await fetch(url);
  return data.json();
};

export {
  postData, getData, getMeals,
};