describe('Login and Logout Test', () => {
    it('should log in, check localStorage, and log out successfully', () => {
      // Step 1: Visit the site and log in
      cy.visit('/');
      cy.contains('Login').click({ force: true });
  
      cy.get('#loginEmail').type('testerson@noroff.no', { force: true });
      cy.get('#loginPassword').type('testerson', { force: true });
      cy.get('#loginForm').find('button[type="submit"]').click({ force: true });
  
      // Step 2: Ensure the user is redirected and check localStorage
      cy.url().should('include', '/?view=profile&name=testerson');
  
      cy.window().then((win) => {
        const profile = win.localStorage.getItem('profile');
        const token = win.localStorage.getItem('token');
        cy.log('Profile:', profile);
        cy.log('Token:', token);
        expect(profile).to.exist;
        expect(token).to.exist;
      });
  
      // Step 3: Log out
      cy.get('[data-auth="logout"]').should('be.visible').click();
  
      // Step 4: Verify that localStorage is cleared and the login button is visible
      cy.window().then((win) => {
        expect(win.localStorage.getItem('profile')).to.be.null;
        expect(win.localStorage.getItem('token')).to.be.null;
      });
  
      cy.get('[data-auth="login"]').should('be.visible');
    });
  });
  