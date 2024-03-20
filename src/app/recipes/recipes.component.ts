import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit{
  
selectedrecipe:Recipe;
ngOnInit(){

}
}
