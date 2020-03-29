import $ from 'jquery'
import * as recipeService from './recipeChecker'

export function trackTopShelf () {
    return new Promise((resolve) => {
        $('#topShelf').change(function () {
            recipeService.clearShelfInformation('topShelf')
            for (const ingredient of $(this).val().split(',')) {
                recipeService.storeIngredient('topShelf', ingredient.trim())
            }
            recipeService.checkRecipesResolve()
            resolve()
        })
    }).then(trackTopShelf)
}

export function trackWineRack () {
    return new Promise((resolve) => {
        $('#wineRack').change(function () {
            recipeService.clearShelfInformation('wineRack')
            for (const ingredient of $(this).val().split(',')) {
                recipeService.storeIngredient('wineRack', ingredient.trim())
            }
            recipeService.checkRecipesResolve()
            resolve()
        })
    }).then(trackWineRack)
}

export function trackVegDrawer () {
    return new Promise((resolve) => {
        $('#vegDrawer').change(function () {
            recipeService.clearShelfInformation('vegDrawer')
            for (const ingredient of $(this).val().split(',')) {
                recipeService.storeIngredient('vegDrawer', ingredient.trim())
            }
            recipeService.checkRecipesResolve()
            resolve()
        })
    }).then(trackVegDrawer)
}

export default {
    trackTopShelf,
    trackWineRack,
    trackVegDrawer
}
