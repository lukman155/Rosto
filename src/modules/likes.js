import { postData, getData } from './requests.js';

const likesURL =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4OI0ZtaDIMh4pRk2DGft/likes/';

const postLikes = (id) => {
  postData(likesURL, { item_id: id });
};

const getLikes = async () => {
  const data = await getData(likesURL);
  return data.reduce((prev, current) => {
    return { ...prev, [`${current.item_id}`]: current };
  }, {});
};

const renderLikes = async () => {
  const data = await fetch(likesURL);
  const likes = await data.json();
  likes.forEach((like) => {
    if (like.item_id) {
      const element = document.querySelector(`.a${like.item_id}`);
      element.textContent = `${like.likes} Likes`;
    }
  });
};

export { postLikes, getLikes, renderLikes };
