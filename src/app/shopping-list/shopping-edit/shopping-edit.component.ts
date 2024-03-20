import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient-model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
  @ViewChild('f') slForm:NgForm;
subscription:Subscription;
editMode=false;
editItemIndex:number;
editItem:Ingredient;
constructor(private slservice:ShoppingListService){}
ngOnInit(): void {
  this.subscription=this.slservice.startedEdit.subscribe((index:number)=>{
    this.editMode=true;
    this.editItemIndex=index;
    this.editItem=this.slservice.getingredient(index);
    this.slForm.setValue({
      name:this.editItem.name,
      amount:this.editItem.amount
    })
  });
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
onsubmit(form:NgForm){
  const value =form.value
const newIngredient = new Ingredient(value.name,value.amount);
if(this.editMode){
  this.slservice.updateingredient(this.editItemIndex,newIngredient)
}else{
  this.slservice.addingredients(newIngredient);
}
this.editMode=false;
form.reset();
}
onclear(){
  this.editMode=false;
  this.slForm.reset();
}
ondelete(){
  this.slservice.deleteingredeient(this.editItemIndex)
  this.onclear();
}
}
