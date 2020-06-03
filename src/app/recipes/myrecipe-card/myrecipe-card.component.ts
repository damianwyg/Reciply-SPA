import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/_models/recipe';

@Component({
  selector: 'app-myrecipe-card',
  templateUrl: './myrecipe-card.component.html',
  styleUrls: ['./myrecipe-card.component.css']
})
export class MyrecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
