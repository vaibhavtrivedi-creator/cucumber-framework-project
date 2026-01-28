Feature: Registration
    As a new user
    I want to register an account
    So that I can access member-only features



    Scenario: Registration with blank fields
        Given I am on the registration page
        When I submit the form with blank fields
        Then error messages should be displayed for all required fields

    Scenario Outline: Registration with invalid fields data
        Given I am on the registration page
        When I fill in the registration form with an invalid First Name "<firstname>",  Email "<email>", PhoneNumber "<phoneNumber>", Password "<password>" and Confirm Password "<confirmPassword>"
        And I click on submit button
        Then I should see appropriate error messages for each invalid field

        Examples:
            | firstname | email   | phoneNumber | password  | confirmPassword |
            | Bb        | vaibhav | 90169       | Vibhu@990 | Vibhu@991       |

    Scenario Outline: Registration with valid details
        Given I am on the registration page
        When I fill in the registration form with valid First Name "<firstname>",Last Name "<lastname>"  Email "<email>", PhoneNumber "<phoneNumber>", Password "<password>" , Confirm Password "<confirmPassword>" and Occupation "<dropdownOption>"
        And I submit the form
        Then I should see success message indicating successful registration
        Examples:
            | firstname | lastname | email                    | phoneNumber | password  | confirmPassword | dropdownOption |
            | Vaibhav   | Trivedi  | vaibhav.esprit@gmail.com | 9016730299  | Vibhu@990 | Vibhu@990       | Engineer       |

# Scenario: Successful registration with valid details
#     Given I am on the registration page
#     When I fill in the registration form with valid details
#     And I submit the form
#     Then I should see a confirmation message
#     And I should receive a welcome email