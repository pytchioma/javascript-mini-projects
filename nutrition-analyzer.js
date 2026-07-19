const food = [
    {
        name: "Rice",
        calories: 250,
        protein: 5

    },

    {
        name: "Chicken Breast",
        calories: 165,
        protein: 31
    },

    {
        name: "Apple",
        calories: 80,
        protein: 0

    }
]


// Use of rest operator to extract the name property from the first object in the food array and store the rest of the properties in a new object called others.
const {name, ...others} = food[2];

console.log(name)
console.log(others)

const newFood = [
    {
        name: "Tomato",
        calories: 20,
        protein: 0
    },
   
    {
        name: "Fish",
        calories: 200,
        protein: 22 
    },

    {
        name: "Broccoli",
        calories: 55,
        protein: 3
    }
]

// Use of spread operator to combine two arrays into one.
const combinedFood = [...food, ...newFood];

console.log(combinedFood)

// Now i will use error handling to check that every food item has the required properties..

function checkFoodArray(arr) {
    arr.forEach((item, index) => {
        const { name, calories, protein } = item;

        if (!name) {
            throw new Error(`Item at index ${index} is missing a name`);
        }
        if (calories === undefined) {
            throw new Error(`"${name}" is missing calories`);
        }
        if (protein === undefined) {
            throw new Error(`"${name}" is missing protein`);
        }
    });

    console.log('All items are valid');
}

try {
    checkFoodArray(combinedFood);
} catch (error) {
    console.log('Error:', error.message);
}

// Use of reduce here to sum all things summable sha and destructuring
const totalCalories = combinedFood.reduce((sum, {calories}) => sum + calories, 0);
console.log (totalCalories);

const totalProtein = combinedFood.reduce((sum, {protein}) => sum + protein, 0)
console.log (totalProtein)

const highestCalories = combinedFood.reduce((highest, food) => {
     return food.calories > highest.calories ? food : highest;
});

console.log(`${highestCalories.name}: ${highestCalories.calories} calories`);

const lowestCalories = combinedFood.reduce((lowest, food) => {
    return food.calories < lowest.calories ? food : lowest;
});

console.log(`${lowestCalories.name}: ${lowestCalories.calories} calories`);
