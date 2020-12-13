### Test tasks

1. How would you test an ATM? What functions of the ATM would you check, and from what perspectives?

2. How would you test inputs containing:

   a. Strings

   b. Paths/Files

   c. Time and Date

### Answers

1. I only have a user experience with using ATMs, but I think there are a few important targets for testing an ATM quality:

- user experience - especialy intuitiveness, but also performance

- security in all transaction - double validation of possible mistakes.

  Here is a [resource](http://www.math-cs.gordon.edu/courses/cs211/ATMExample/InitialFunctionalTests.html) which I consider good for ATM testcases.

2. Risks for all kind of inputs are in relation with

- the domain logic

- targeted users

- defined constraints

- the language/libraries used to process the input

  - i.e. vulnerabilities for HTML string inputs
  
    - [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)
    
    - [SQL injection](https://owasp.org/www-community/attacks/SQL_Injection)
    
- what validation is performed in front-end, back-end and/or persistance layer.

  `a. String inputs testcases:`

  - normal string (which makes sense from domain logic)

  - empty input

  - one ASCII character input

  - spaces only

  - escape character/s

  - whitespace character/s only

  - multiline strings

  - very long strings (according to constraints)

  - [extended ASCII](https://www.ascii-code.com/) chars (8 bits)

  - [unicode](https://unicode-table.com/en/blocks/) characters (UTF-8 / UTF-16 / UTF-32) - multi-byte

  `b. Paths/Files testcases`

  - validate multisystem pathes - different separators

  - path contains spaces or other special characters

  - very long/nested paths

  - duplicate path input

  - symbolic link in path

  - files with unallowed extension

  - files with unallowed type, but with correct extension

  - files with no extension

  - files bigger than maximum allowed size

  `c. Time and Date testcases`

  - valid date formats supported by the calendar i.e. – dd/mm/yyyy, yyyy-mm-dd etc

  - valid format + blank spaces within

  - blank input

  - blank input for any of year, month, day

  - user can enter date manually corresponding to the supported date formats

  - other special chars then '/', '-' (try decimal point)

  - invalid month (>12), day (>31)

  - invalid day (30,31 for February)

  - year is accepted in 3 digits or 2 digits

  - oldest date possible to use

  - datepicker calendar shows the locale date, as per the your local system

  - check if you can scroll the calendat for year / month / day selection
