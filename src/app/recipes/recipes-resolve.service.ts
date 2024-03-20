import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipes.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolveService implements Resolve<Recipe[]>{

  constructor(private dataser:DataStorageService,private recipeser:RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes=this.recipeser.getrecipes();
    if(recipes.length===0){
      return this.dataser.fetchdata();
    }else{
      return recipes;
    }
    
  }
}
