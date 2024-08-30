/// <reference types="cypress" />

describe('корректная работа при добавлении ингредиентов в конструктор', function() {
    beforeEach(function () {
      // Перехват запросов в тестах
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.viewport(1300, 800);
      cy.visit('http://localhost:4000');
    });
  
    it('Тест добавления булок и начинки в конструктор', function () {
      cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=constructor-bun-1]')
        .contains('Ингредиент 1')
        .should('exist');
      cy.get('[data-cy=constructor-bun-2]')
        .contains('Ингредиент 1')
        .should('exist');
    });
  
    //Первые ингридиенты из разных категорий по клику
    it('Тест добавления обычных ингредиентов', function () {
      cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=constructor-ingredients]')
        .contains('Ингредиент 3')
        .should('exist');
      cy.get('[data-cy=constructor-ingredients]')
        .contains('Ингредиент 7')
        .should('exist');
    });
  });

//Тест открытия и закрытия модального окна ингредиента
describe('тест открытия модального окна ингредиентов', function() {
    beforeEach(function () {
      // Перехват запросов в тестах
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.viewport(1300, 800);
      cy.visit('http://localhost:4000');
    });
  
    it('тест открытия модального окна', function () {
      cy.contains('Детали ингредиента').should('not.exist');
      cy.contains('Ингредиент 1').click();
      cy.contains('Детали ингредиента').should('exist');
      //проверка верного ингредиента в модальном окне
      cy.get('#modals').contains('Ингредиент 1').should('exist');
    });
  
    it('тест закрытия модального окна по клику на кнопку', function () {
      cy.contains('Ингредиент 1').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('#modals button[aria-label="Закрыть"]').click();
      //проверка закрытия модального окна
      cy.contains('Детали ингредиента').should('not.exist');
      });

    it('тест закрытия модального окна кликом по оверлею', function () {
      cy.contains('Ингредиент 1').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('[data-cy=modal-overlay]').click('left', { force: true });
      //проверка закрытия модального окна
      cy.contains('Детали ингредиента').should('not.exist');
    });
  });

//Тест оформления заказа
describe('тест оформления заказа', function() {
    beforeEach(function () {
      // Перехват запросов в тестах
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as('postOrder');

      //Моковые токены
      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('test-refreshToken')
      );
      cy.setCookie('accessToken', 'test-accessToken');
      cy.viewport(1300, 800);
      cy.visit('http://localhost:4000');
    });

    afterEach(function () {
      cy.clearLocalStorage();
      cy.clearCookies();
    });

    it('тест оформления заказа', function () {
      cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=order-sum] button').click();

      //Тест корректной отправки ингредиентов
      cy.wait('@postOrder')
        .its('request.body')
        .should('deep.equal', {
          ingredients: ['1', '3', '7', '1']
        });

      //Тест номера заказа
      cy.get('[data-cy=order-number]').contains('1234567').should('exist');

      //Тест закрытия модального окна
      cy.get('#modals button[aria-label="Закрыть"]').click();
      cy.contains('[data-cy=order-number]').should('not.exist');

      //Тест очистки конструктора
      cy.get('[data-cy=constructor]')
        .contains('Ингредиент 1')
        .should('not.exist');
    });
});
