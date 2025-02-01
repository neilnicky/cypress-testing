describe('User Registration and Login Flow', () => {
    it('should complete registration and login process', () => {
      // Visit registration page
      cy.visit('http://localhost:3000/register')
      
      // Fill registration form
      cy.get('[data-testid="register-username"]').type('testuser')
      cy.get('[data-testid="register-email"]').type('test@example.com')
      cy.get('[data-testid="register-password"]').type('password123')
      
      // Submit registration
      cy.get('[data-testid="register-submit"]').click()
      
      // Verify redirect to login
      cy.url().should('include', '/login')
      
      // Fill login form
      cy.get('[data-testid="login-email"]').type('test@example.com')
      cy.get('[data-testid="login-password"]').type('password123')
      
      // Submit login
      cy.get('[data-testid="login-submit"]').click()
      
      // Verify redirect to dashboard
      cy.url().should('include', '/dashboard')
    })
  })


  describe('Dashboard API Integration', () => {
    it('should refresh product data', () => {
      cy.visit('http://localhost:3000/dashboard')
      
      // Store initial products
      cy.get('[data-testid^="product-card-"]').then($initial => {
        // Click refresh
        cy.get('[data-testid="refresh-products"]').click()
        
        // Verify products changed
        cy.get('[data-testid^="product-card-"]').should($new => {
          expect($new).to.not.deep.equal($initial)
        })
      })
    })
  })