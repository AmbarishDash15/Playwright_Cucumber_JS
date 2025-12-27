Feature: Complete Product Purchase Flow

  Scenario: User places an order and verifies order details
    Given I open the application at URL 'https://rahulshettyacademy.com/client/#/auth/login'
    And I log in with username 'dash.ambarish15+sixth@gmail.com' and password 'Password@123'
    When I search for the product 'ZARA COAT 3' and add to Cart
    Then I verify message for successful addition
    When I go to the Cart page
    Then I verify presence of product 'ZARA COAT 3' in Cart
    When I click on the Checkout button
    And I enter card details: card number '4242424242424242', expiry month '12', expiry year '30', CVV '123', Name on Card 'Tester'
    And I verify that the username 'dash.ambarish15+sixth@gmail.com' is already published
    And I select the country 'India' from the dropdown
    And I enter the coupon code 'rahulshettyacademy' and verify it is successfully applied
    And I click on Place order
    Then I am shown the Order confirmation page and verify product 'ZARA COAT 3'
    And I capture the order number
    When I click on the Orders button to go to the Orders page
    Then I verify that the order number is present in the list
    When I click on the View button for order number
    Then I am on the Order Details page and I verify the order number, product 'ZARA COAT 3', username 'dash.ambarish15+sixth@gmail.com', and country 'India'