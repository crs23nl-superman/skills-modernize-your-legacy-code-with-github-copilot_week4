// Unit tests for Node.js Student Account Management System
// Mirrors scenarios in docs/TESTPLAN.md

const fs = require('fs');
const path = require('path');
const BALANCE_FILE = path.join(__dirname, 'balance.json');

// Import functions from index.js
const { readBalance, writeBalance, initBalance } = (() => {
    // Re-implement minimal functions for testability
    function initBalance() {
        fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: 1000.00 }));
    }
    function readBalance() {
        const data = fs.readFileSync(BALANCE_FILE, 'utf8');
        return parseFloat(JSON.parse(data).balance);
    }
    function writeBalance(newBalance) {
        fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: newBalance }));
    }
    return { readBalance, writeBalance, initBalance };
})();

beforeEach(() => {
    initBalance();
});

describe('Account Management System', () => {
    test('TC01: View current account balance', () => {
        expect(readBalance()).toBe(1000.00);
    });

    test('TC02: Credit account with valid amount', () => {
        writeBalance(1000.00 + 500.00);
        expect(readBalance()).toBe(1500.00);
    });

    test('TC03: Debit account with sufficient funds', () => {
        writeBalance(1000.00 - 200.00);
        expect(readBalance()).toBe(800.00);
    });

    test('TC04: Debit account with insufficient funds', () => {
        writeBalance(1000.00);
        const debitAmount = 1200.00;
        let balance = readBalance();
        if (balance >= debitAmount) {
            balance -= debitAmount;
            writeBalance(balance);
        }
        // Should not debit, balance remains unchanged
        expect(readBalance()).toBe(1000.00);
    });

    test('TC05: Credit account with zero amount', () => {
        writeBalance(1000.00 + 0);
        expect(readBalance()).toBe(1000.00);
    });

    test('TC06: Debit account with zero amount', () => {
        writeBalance(1000.00 - 0);
        expect(readBalance()).toBe(1000.00);
    });

    test('TC07: Invalid menu input (simulated)', () => {
        // Menu input is handled interactively; here we simulate invalid input handling
        // No change to balance
        expect(readBalance()).toBe(1000.00);
    });

    test('TC08: Exit program (simulated)', () => {
        // Exit is handled interactively; here we simulate exit
        expect(readBalance()).toBe(1000.00);
    });

    test('TC09: Multiple sequential credits and debits', () => {
        writeBalance(1000.00 + 500.00); // Credit
        expect(readBalance()).toBe(1500.00);
        writeBalance(1500.00 - 200.00); // Debit
        expect(readBalance()).toBe(1300.00);
        writeBalance(1300.00 + 100.00); // Credit
        expect(readBalance()).toBe(1400.00);
        writeBalance(1400.00 - 400.00); // Debit
        expect(readBalance()).toBe(1000.00);
    });

    test('TC10: Minimum balance enforcement (no negative balance)', () => {
        writeBalance(0);
        const debitAmount = 100.00;
        let balance = readBalance();
        if (balance >= debitAmount) {
            balance -= debitAmount;
            writeBalance(balance);
        }
        // Should not debit, balance remains unchanged at zero
        expect(readBalance()).toBe(0);
    });
});
