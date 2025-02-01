describe('API E2E Test', () => {
    it('should return correct output based on the input', () => {
      cy.request({
        method: 'POST', // Change to GET, PUT, DELETE as needed
        url: 'https://your-api-endpoint.com/resource', // Replace with your API URL
        body: {
          key1: 'value1',
          key2: 'value2'
        }
      }).then((response) => {
        // Check HTTP status
        expect(response.status).to.eq(200);
  
        // Validate response structure
        expect(response.body).to.have.property('result');
  
        // Validate response data
        expect(response.body.result).to.deep.equal({
          expectedKey1: 'expectedValue1',
          expectedKey2: 'expectedValue2'
        });
      });
    });
  });
  