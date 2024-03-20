import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient,private recipeser:RecipeService) { }

  storedata(){
    const recipes=this.recipeser.getrecipes();
    this.http.put('https://ng-recipe-book-4aa95-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response=>{
      console.log(response);
    });
  }
  fetchdata(){
    return this.http.get<Recipe[]>('https://ng-recipe-book-4aa95-default-rtdb.firebaseio.com/recipes.json').pipe
    (map(recipes=>{
      return recipes.map(recipe=>{
        return {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[]}
      })
    }),
    tap(response=>{
      this.recipeser.setrecipe(response)

    }))
  }
}
