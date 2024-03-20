import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
ingredientschanged =new Subject<Ingredient[]>();
startedEdit = new Subject<number>();
  private ingredients:Ingredient[]= [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 5,)
  ];
  constructor() { }
  getingredients(){
    return this.ingredients.slice();
  }
  getingredient(index:number){
    return this.ingredients[index]
  }
  addingredients(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientschanged.next(this.ingredients.slice());
  }
  addingredient(ingredient:Ingredient[]){
    this.ingredients.push(...ingredient);
    this.ingredientschanged.next(this.ingredients.slice());
  }
  updateingredient(index:number,newingredient:Ingredient){
    this.ingredients[index]=newingredient;
    this.ingredientschanged.next(this.ingredients.slice());
  }
  deleteingredeient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientschanged.next(this.ingredients.slice());
  }
}
