describe('e2e tests happy path', () => {
  it('fills in the entire form', () => {
    cy.visit('http://localhost:5173')

    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="firstName"]').should('have.value', 'John');

    cy.get('input[name="lastName"]').type('Wick');
    cy.get('input[name="lastName"]').should('have.value', 'Wick');

    cy.get('input[name="email"]').type('john@wick.com');
    cy.get('input[name="email"]').should('have.value', 'john@wick.com');

    cy.contains('Upload a file or drag and drop here')
      .parent()
      .selectFile('cypress/fixtures/john.jpeg', {
        action: 'drag-drop',
      });

    cy.contains('john.jpeg').should('exist');

    cy.get('input[type="range"]')
      .invoke('val', 50)
      .trigger('input')
      .trigger('change')

    cy.get('input[type="range"]').should('have.value', '50')

    cy.get('.react-calendar').should('be.visible')
    cy.get('[data-testid="workout-calendar"]')
      .find('.react-calendar__tile:enabled')
      .first()
      .click()
    cy.get('.react-calendar__tile--active').should('exist')

    cy.contains('12:00').click()

    cy.get('button[type="submit"]').should('not.be.disabled')
  });
})