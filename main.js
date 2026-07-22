import { people, checkAge, checkPassport, checkVisa, checkFunds } from './validator.js';
import { verify } from './checker.js';

async function checkPerson(person) {
    try {
        await verify("Age", checkAge(person));
        await verify("Passport", checkPassport(person));
        await verify("Visa", checkVisa(person));
        await verify("Funds", checkFunds(person));
        console.log(`${person.name} can travel ✈️`);
    } catch (error) {
        console.log(`${person.name}: ${error}`);
    }
}

async function checkEveryone() {
    for (const person of people) {
        await checkPerson(person);
    }
}

checkEveryone();