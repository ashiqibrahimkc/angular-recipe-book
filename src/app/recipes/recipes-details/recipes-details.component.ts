import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.css'
})
export class RecipesDetailsComponent implements OnInit{
  constructor(private recipeservice:RecipeService,
    private route:ActivatedRoute,
    private router:Router){}
recipe:Recipe;
id:number;

ngOnInit(): void {
  this.route.params.subscribe(
    (params:Params)=>{
      this.id= +params['id'];
      this.recipe=this.recipeservice.getrecipe(this.id);
    }
  );
}
moveonshoppinglist(){
this.recipeservice.addingredientstoshoppinglist(this.recipe.ingredients)
}
onEditRecipe(){
  this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  // this.router.navigate(['edit'],{relativeTo:this.route})
}
ondeleterecipe(){
  this.recipeservice.deleterecipe(this.id);
  this.router.navigate(['/recipes']);
}
}
