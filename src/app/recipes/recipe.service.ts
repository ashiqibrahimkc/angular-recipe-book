import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredient-model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recpiechanged = new Subject<Recipe[]>();
 
  constructor(private slservice:ShoppingListService) { }
  // recipes: Recipe[] = [
  //   new Recipe('Paneer buttor masala','This is simply a test','https://www.netmeds.com/images/cms/wysiwyg/blog/2019/07/Healthy_recipes_big_898.jpg',[
  //     new Ingredient ('paneer',1),
  //     new Ingredient ('butter',2),
  //     new Ingredient ('masalas',3)
  //   ]),
  //   new Recipe('Egg Curry','Its good','https://c.ndtvimg.com/2023-03/8md0fv9o_egg-curry_625x300_15_March_23.jpg',[
  //     new Ingredient('eggs',2),
  //     new Ingredient('onion',2),
  //     new Ingredient('tomato',2)
  //   ])
  // ];
  private recipes:Recipe[]=[];

  getrecipes(){
    return this.recipes.slice();
  }
  getrecipe(index:number){
    return this.recipes[index];
  }
  setrecipe(recipes:Recipe[]){
    this.recipes=recipes;
    this.recpiechanged.next(this.recipes.slice());
  }
  addrecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recpiechanged.next(this.recipes.slice());
  }
  updaterecipe(index:number,newrecipe:Recipe){
    this.recipes[index]=newrecipe;
    this.recpiechanged.next(this.recipes.slice());
  }
  addingredientstoshoppinglist(ingredient:Ingredient[]){
 this.slservice.addingredient(ingredient);
  }
  deleterecipe(index:number){
    this.recipes.splice(index,1);
    this.recpiechanged.next(this.recipes.slice());
  }
}
