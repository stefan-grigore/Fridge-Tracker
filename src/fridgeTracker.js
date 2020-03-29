import 'babel-polyfill'
import './style.css'
import * as shelfTracker from '../components/shelfTracker'
import * as recipeChecker from '../components/recipeChecker'

recipeChecker.storeRecipes()
recipeChecker.checkRecipesCouldBeDone()
shelfTracker.trackTopShelf()
shelfTracker.trackWineRack()
shelfTracker.trackVegDrawer()
