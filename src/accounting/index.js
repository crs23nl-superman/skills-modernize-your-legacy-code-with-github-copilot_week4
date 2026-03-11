// Node.js implementation of the COBOL Student Account Management System
// Preserves original business logic, data integrity, and menu options

const readline = require('readline');
const fs = require('fs');
const BALANCE_FILE = './balance.json';

// Initialize balance file if not present
function initBalance() {
    if (!fs.existsSync(BALANCE_FILE)) {
        fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: 1000.00 }));
    }
}

function readBalance() {
    const data = fs.readFileSync(BALANCE_FILE, 'utf8');
    return parseFloat(JSON.parse(data).balance);
}

function writeBalance(newBalance) {
    fs.writeFileSync(BALANCE_FILE, JSON.stringify({ balance: newBalance }));
}

function creditAccount(amount) {
    if (isNaN(amount) || amount < 0) {
        return false; // Invalid amount
    }
    let balance = readBalance();
    balance += amount;
    writeBalance(balance);
    return balance;
}

function debitAccount(amount) {
    if (isNaN(amount) || amount < 0) {
        return false; // Invalid amount
    }
    let balance = readBalance();
    if (balance >= amount) {
        balance -= amount;
        writeBalance(balance);
        return balance;
    } else {
        return null; // Insufficient funds
    }
}

function showMenu() {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
}

function main() {
    initBalance();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let continueFlag = true;

    function promptMenu() {
        showMenu();
        rl.question('Enter your choice (1-4): ', (choice) => {
            switch (choice.trim()) {
                case '1':
                    const balance = readBalance();
                    console.log(`Current balance: ${balance.toFixed(2)}`);
                    promptMenu();
                    break;
                case '2':
                    rl.question('Enter credit amount: ', (amountStr) => {
                        const amount = parseFloat(amountStr);
                        const newBalance = creditAccount(amount);
                        if (newBalance === false) {
                            console.log('Invalid amount.');
                        } else {
                            console.log(`Amount credited. New balance: ${newBalance.toFixed(2)}`);
                        }
                        promptMenu();
                    });
                    break;
                case '3':
                    rl.question('Enter debit amount: ', (amountStr) => {
                        const amount = parseFloat(amountStr);
                        const newBalance = debitAccount(amount);
                        if (newBalance === false) {
                            console.log('Invalid amount.');
                        } else if (newBalance === null) {
                            console.log('Insufficient funds for this debit.');
                        } else {
                            console.log(`Amount debited. New balance: ${newBalance.toFixed(2)}`);
                        }
                        promptMenu();
                    });
                    break;
                case '4':
                    console.log('Exiting the program. Goodbye!');
                    rl.close();
                    break;
                default:
                    console.log('Invalid choice, please select 1-4.');
                    promptMenu();
            }
        });
    }

    promptMenu();
}

// Export functions for testing
module.exports = {
    initBalance,
    readBalance,
    writeBalance,
    creditAccount,
    debitAccount
};

if (require.main === module) {
    main();
}
