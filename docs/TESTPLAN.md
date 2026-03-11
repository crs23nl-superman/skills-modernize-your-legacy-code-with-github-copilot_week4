# Student Account Management System - Test Plan

This test plan covers all business logic implemented in the COBOL application. It is designed for validation with business stakeholders and will be used as a basis for future unit and integration tests in the Node.js transformation.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|----------------------|----------------|------------|-----------------|--------------|--------------------|----------|
| TC01 | View current account balance | Initial balance set (e.g., $1000.00) | 1. Start app<br>2. Select option 1 (View Balance) | Current balance is displayed correctly | | | |
| TC02 | Credit account with valid amount | Initial balance set | 1. Start app<br>2. Select option 2 (Credit Account)<br>3. Enter valid credit amount (e.g., $500.00) | Balance increases by credit amount; new balance displayed | | | |
| TC03 | Debit account with sufficient funds | Balance >= debit amount | 1. Start app<br>2. Select option 3 (Debit Account)<br>3. Enter valid debit amount (e.g., $200.00) | Balance decreases by debit amount; new balance displayed | | | |
| TC04 | Debit account with insufficient funds | Balance < debit amount | 1. Start app<br>2. Select option 3 (Debit Account)<br>3. Enter debit amount greater than balance | Error message: "Insufficient funds for this debit."<br>Balance remains unchanged | | | |
| TC05 | Credit account with zero amount | Any balance | 1. Start app<br>2. Select option 2 (Credit Account)<br>3. Enter 0 as credit amount | Balance remains unchanged; new balance displayed | | | |
| TC06 | Debit account with zero amount | Any balance | 1. Start app<br>2. Select option 3 (Debit Account)<br>3. Enter 0 as debit amount | Balance remains unchanged; new balance displayed | | | |
| TC07 | Invalid menu input | Any balance | 1. Start app<br>2. Enter invalid menu option (e.g., 5 or letter) | Error message: "Invalid choice, please select 1-4."<br>Menu re-displayed | | | |
| TC08 | Exit program | Any balance | 1. Start app<br>2. Select option 4 (Exit) | Program displays exit message and terminates | | | |
| TC09 | Multiple sequential credits and debits | Any balance | 1. Start app<br>2. Perform multiple credits and debits in sequence<br>3. View balance after each operation | Balance updates correctly after each operation; all business rules enforced | | | |
| TC10 | Minimum balance enforcement (no negative balance) | Balance = 0 | 1. Start app<br>2. Select option 3 (Debit Account)<br>3. Enter any positive amount | Error message: "Insufficient funds for this debit."<br>Balance remains unchanged at zero | | | |

> **Note:** Fill in Actual Result, Status, and Comments during test execution.
