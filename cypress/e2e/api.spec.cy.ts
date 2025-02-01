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