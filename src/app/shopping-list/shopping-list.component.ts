import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient-model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit,OnDestroy{
  ingredients:Ingredient[];
  private igChanged:Subscription;
  constructor(private slservice:ShoppingListService){}
  
  ngOnInit(){
    this.ingredients=this.slservice.getingredients();
    this.igChanged=this.slservice.ingredientschanged.subscribe(
      (ingredient:Ingredient[])=>{
        this.ingredients=ingredient;
      }
    )
  }
  onEditItem(index:number){
    this.slservice.startedEdit.next(index);
  }

ngOnDestroy(): void {
  this.igChanged.unsubscribe();
}
}
