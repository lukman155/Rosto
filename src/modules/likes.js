import { postData, getData } from './requests.js';

const likesURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4OI0ZtaDIMh4pRk2DGft/likes/';

const postLikes = (id) => {
  postData(likesURL, { item_id: id });
};

const getLikes = async (id) => {
  getData(likesURL)
    .then((data) => {
      data.forEach((like) => {
        const element = document.querySelector(`.a${like.item_id}`);
        if (like.item_id === id) {
          let likesCount = element.innerHTML;
          likesCount = likesCount.replace(/[^0-9]/g, '');
          likesCount = parseInt(likesCount, 10);
          likesCount += 1;
          element.textContent = `${likesCount} Likes`;
        }
      });
    });
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