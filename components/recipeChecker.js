import $ from 'jquery'

let mockDb

export let checkRecipesResolve

// TODO extract db operations into a recipe service layer and data access layer
export function storeIngredient (locationInFridge, ingredient) {
    console.log(`Storing ${ingredient} on ${locationInFridge}`)
    if (Object.keys(mockDb.locationsWithIngredients)
        .indexOf(locationInFridge) === -1) {
        mockDb.locationsWithIngredients[locationInFridge] = []
    }
    mockDb.locationsWithIngredients[locationInFridge].push(ingredient)
}

export function clearShelfInformation (locationInFridge) {
    mockDb.locationsWithIngredients[locationInFridge] = []
}

export function checkRecipesCouldBeDone () {
    return new Promise((resolve) => {
        checkRecipesResolve = resolve
    }).then(() => {
        const recipesThatCouldBeDone = []
        for (const recipe of Object.keys(mockDb.recipes)) {
            console.log('Checking', recipe)
            let couldBeDone = true
            for (const ingredient of mockDb.recipes[recipe].ingredients) {
                const ingredientsInTheFridge = []
                for (const locationInFridge of Object.keys(mockDb.locationsWithIngredients)) {
                    ingredientsInTheFridge
                        .push.apply(
                            ingredientsInTheFridge,
                            mockDb.locationsWithIngredients[locationInFridge]
                        )
                }
                console.log(`Checking if ${ingredient} is in ${ingredientsInTheFridge}`)
                if (!ingredientsInTheFridge.includes(ingredient)) {
                    couldBeDone = false
                    break
                }
            }
            console.log('Could be done', couldBeDone)
            if (couldBeDone) {
                recipesThatCouldBeDone.push(recipe)
            }
        }
        console.log('Recipes that could be done', recipesThatCouldBeDone)
        if (!recipesThatCouldBeDone.length) {
            $('#recipesThatCouldBeDone').text('No recipes could be done :(')
        } else {
            const recipesThatCouldBeDonePrompt = recipesThatCouldBeDone.join(', ')
            $('#recipesThatCouldBeDone').text(`You could make ${recipesThatCouldBeDonePrompt}`)
        }
    }).then(checkRecipesCouldBeDone)
}

// get the recipes from some server
export function storeRecipes () {
    return new Promise((resolve) => {
        mockDb = {
            'recipes': {
                'peanut butter cookies': {
                    'ingredients': ['peanut butter', 'sugar', 'eggs']
                },
                'mug cake': {
                    'ingredients': ['chocolate', 'eggs', 'flour']
                },
                'teriyaki chicken': {
                    'ingredients': ['soy sauce', 'chicken', 'sugar']
                },
                'tomato and anchovy pasta': {
                    'ingredients': [
                        'anchovies',
                        'white wine',
                        'spaghetti',
                        'cherry tomatoes'
                    ]
                }
            },
            'locationsWithIngredients': {}
        }
        resolve(mockDb)
    })
}

export default {
    storeRecipes,
    checkRecipesCouldBeDone,
    checkRecipesResolve
}
