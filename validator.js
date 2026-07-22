export const people = [ {
    name: "Chioma",
    age: 19,
    passport: true,
    visa: true,
    funds: 2500
},

 {
    name: "Anna",
    age: 20,
    passport: false,
    visa: true,
    funds: 1000
},
 
{
    name: "Nelly",
    age: 17,
    passport: true,
    visa: true,
    funds: 1000
}]

export function checkAge (people) {
    return people.age >= 18;
}

export function checkPassport(people) {
    return people.passport === true;
}

export function checkVisa(people) {
    return people.visa === true;
}

export function checkFunds(people) {
    return people.funds >= 2000; // let's say 2000 is the minimum required
}

export function isEligibleToTravel(people) {
    if (!checkAge(people)) {
        throw new Error(`${people.name} is not old enough to travel`);
    }
    if (!checkPassport(people)) {
        throw new Error(`${people.name} does not have a valid passport`);
    }
    if (!checkVisa(people)) {
        throw new Error(`${people.name} does not have a visa`);
    }
    if (!checkFunds(people)) {
        throw new Error(`${people.name} does not have enough funds`);
    }
    return true;
}

// Loop through everyone and check eligibility
people.forEach(p => {
    try {
        isEligibleToTravel(p);
        console.log(`${p.name} is eligible to travel`);
    } catch (error) {
        console.log(`${p.name} is NOT eligible: ${error.message}`);
    }
});