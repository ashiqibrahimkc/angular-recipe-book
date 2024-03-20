import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css'
})
export class RecipesListComponent implements OnInit ,OnDestroy{
  
  recipes : Recipe[];
  subscription:Subscription

  constructor( private recipeservice:RecipeService,
    private router:Router,
    private route:ActivatedRoute){}
ngOnInit(){
  this.subscription=this.recipeservice.recpiechanged.subscribe(
    (recipes:Recipe[])=>{
      this.recipes = recipes
    }
  );
  this.recipes=this.recipeservice.getrecipes();
}
ngOnDestroy(){
  this.subscription.unsubscribe();
}
onNewRecipe(){
this.router.navigate(['new'],{relativeTo:this.route});
}
 
}
