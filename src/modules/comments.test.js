import { commentsCounter } from './counter.js';

describe('commens counter test', () => {
  jest.mock('./requests');
  document.body.innerHTML = '<p>Comments (<span class="comments"></span>)</p>';
  const comments = [
    { creation_date: '2022-11-24', username: 'jo', comment: 'bo' },
    { creation_date: '2022-11-24', username: 'mo', comment: 'bo' },
  ];
  test('should render comments counter ', () => {
    commentsCounter(comments);
    const commentsCount = document.querySelector('.comments').textContent;
    expect(Number(commentsCount)).toEqual(2);
  });
});
