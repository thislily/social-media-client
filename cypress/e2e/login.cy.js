describe('Login Form Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should log in with valid credentials and redirect to the profile page', () => {
    const email = 'testerson@noroff.no';
    const password = 'testerson';

    cy.contains('Login').click({ force: true });
    cy.get('#loginEmail').type(email, { force: true });
    cy.get('#loginPassword').type(password, { force: true });
    cy.get('#loginEmail').should('have.value', email);
    cy.get('#loginPassword').should('have.value', password);
    cy.get('#loginForm').find('button[type="submit"]').click({ force: true });
    cy.url().should('include', '/?view=profile&name=');
  });

  it('should not log in with invalid credentials and should show an error message in an alert', () => {
    const email = 'wronguser@noroff.no';
    const password = 'wrongPassword';

    cy.contains('Login').click({ force: true });
    cy.get('#loginEmail').type(email, { force: true });
    cy.get('#loginPassword').type(password, { force: true });
    cy.get('#loginEmail').should('have.value', email);
    cy.get('#loginPassword').should('have.value', password);

    // Handle the alert and verify its content
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Either your username was not found or your password is incorrect');
    });

    // Submit the form
    cy.get('#loginForm').find('button[type="submit"]').click({ force: true });
  });
});
