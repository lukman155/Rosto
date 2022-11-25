import { mealCounter } from './counter.js';
describe('mealCounter', () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <div class="meal-count"></div>
        <div class="container">
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
        </div>`;
    mealCounter();
  });
  test('should display the number of meals available', () => {
    expect(document.querySelector('.meal-count').innerHTML).toBe(
      '(6 recipes available)'
    );
  });
});
