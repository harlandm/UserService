Feature: Test the User Service
    In order to administrate user records
    As a user of the User Service API
    I want to be able to create, read, update and delete user records

    Scenario: Get the version of the service
        When I get the "/about" document
        Then I should get a JSON object with "success" set to "true"

#    Scenario Outline: Play with the service
#        When I "<crud>" a user on the User Service with "<params>"
#        Then I should get a JSON object with "success" set to "<success>"
#        And "user" should contain "<user>"

#    Examples:
#        | crud      | params                                                    | success   | user                              |
#        | read      | userid=1                                                  | false     | user with id 1 could not be found |
#        | create    | email=one@somewhere.com&forename=one&surname=smith        | true      | smith                             |
#        | read      | userid=0                                                  | true      | somewhere                         |
#        | create    | email=two@somewhere.com&forename=two&surname=jones        | true      | two                               |
#        | delete    | userid=0                                                  | true      |                                   |
#        | read      | userid=0                                                  | false     | user with id 0 could not be found |
#        | update    | userid=1&email=one@anywhere.com                           | true      | one@anywhere.com                  |
#        | delete    | userid=0                                                  | false     | user with id 0 could not be found |
#        | create    | email=three@somewhere.com&forename=three&surname=north    | true      | three@somewhere.com               |
#        | create    | email=four@anywhere.com&forename=four&surname=pink        | true      | pink                              |
#        | update    | userid=1&surname=smithe                                   | true      | smithe                            |
#        | delete    | userid=2                                                  | true      |                                   |
#        | update    | userid=2&surname=smith                                    | false     | user with id 2 could not be found |
#        | create    | email=five@anywhere.com&forename=five&surname=browne      | true      | five@anywhere.com                 |
#        | delete    | userid=4                                                  | true      |                                   |
#        | read      | userid=1                                                  | true      | smithe                            |
#        | read      | userid=4                                                  | false     | user with id 4 could not be found |
#        | delete    | userid=0                                                  | false     | user with id 0 could not be found |
#        | read      | userid=2                                                  | false     | user with id 2 could not be found |
#        | update    | userid=3&email=two@anywhere.com&forename=two              | true      | two                               |
#        | delete    | userid=1                                                  | true      |                                   |
#        | delete    | userid=3                                                  | true      |                                   |
#        | update    | userid=1&forename=deleted                                 | false     | user with id 1 could not be found |
#        | read      | userid=1                                                  | false     | user with id 1 could not be found |
#        | create    | email=six@anywhere.com&forename=last&surname=user         | true      | six@anywhere.com                  |
#        | update    | userid=5                                                  | false     | nothing to update                 |
