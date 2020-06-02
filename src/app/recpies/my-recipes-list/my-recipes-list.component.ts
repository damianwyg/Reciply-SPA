import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/_models/recipe';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-my-recipes-list',
  templateUrl: './my-recipes-list.component.html',
  styleUrls: ['./my-recipes-list.component.css'],
})
export class MyRecipesListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.recipes = data['recipes'];
      this.recipes = this.recipes.filter(r => r.userId === +this.authService.decodedToken.nameid);
    });
  }
}
