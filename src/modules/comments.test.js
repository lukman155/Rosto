import { commentsCounter } from './counter.js';

jest.mock('./requests');

describe('commens counter test', () => {
  test('should render comments counter ', () => {
    document.body.innerHTML = '<p>Comments (<span class="comments"></span>)</p>';

    commentsCounter([
      { creation_date: '2022-11-24', username: 'jo', comment: 'bo' },
      { creation_date: '2022-11-24', username: 'mo', comment: 'bo' },
    ]);

    const commentsText = document.querySelector('.comments').textContent;
    expect(Number(commentsText)).toEqual(2);
  });
});