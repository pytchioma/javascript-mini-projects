

import { checkPassport } from './validator.js';

export function verify(label, isValid) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isValid) {
                resolve(`${label} check passed ✅`);
            } else {
                reject(`${label} check failed ❌`);
            }
        }, 1000);
    });
}