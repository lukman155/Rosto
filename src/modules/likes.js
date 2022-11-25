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

export { postLikes, getLikes };
