import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient-model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit{
  id:number;
editmode=false;
recipeform:FormGroup;
constructor(private route:ActivatedRoute,
  private recipeser:RecipeService,
  private router:Router){}

ngOnInit(): void {
  this.route.params.subscribe(
  (params:Params)=>{
    this.id=+params['id'];
    this.editmode = params['id'] != null;
    this.initForm();
  }
  )
}
onSubmit(){
if(this.editmode){
  this.recipeser.updaterecipe(this.id,this.recipeform.value);

}  else{
  this.recipeser.addrecipe(this.recipeform.value);
}
this.oncancel();
}
private initForm(){
  let recipeName="";
  let recipeimg="";
  let recipedescription="";
  let recipeingredients =new FormArray([]);
  if(this.editmode){
    const recipe = this.recipeser.getrecipe(this.id);
    recipeName= recipe.name;
   
    recipedescription =recipe.desc;
    recipeimg= recipe.imagePath;
    if(recipe['ingredients']){
      for(let ingredient of recipe.ingredients){
        recipeingredients.push(
          new FormGroup({
            'name':new FormControl(ingredient.name,Validators.required),
            'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
        )
      }
    }
  }
  
  this.recipeform = new FormGroup({
    'name':new FormControl(recipeName,Validators.required),
    
    'desc': new FormControl(recipedescription,Validators.required),
    'imagePath':new FormControl(recipeimg,Validators.required),
    'ingredients':recipeingredients
  })
}
onaddingredient(){
  (<FormArray>this.recipeform.get('ingredients')).push(
    new FormGroup({
      'name': new FormControl(null,Validators.required),
      'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
  )
}
ondeleteingredient(index:number){
  (<FormArray>this.recipeform.get('ingredients')).removeAt(index);
}
oncancel(){
  this.router.navigate(['../'],{relativeTo:this.route})
}
get(){
  return (<FormArray>this.recipeform.get('ingredients')).controls
}

}
