Feature: Login Functionality

  
  Scenario Outline: Verify login with multiple credentials
    Given the user is on the login page
    When the user enters "<username>" and "<password>"
    And clicks the login button
    Then the user should be redirected to the dashboard page

    Examples:
      | username                     | password   |
      | vaibhav.esprit@gmail.com     | Vibhu@990  |
      | vaibhav.esprit+11@gmail.com  | Vibhu@990  |
      | vaibhav.esprit@gmail.com     | Vibhu@991  |