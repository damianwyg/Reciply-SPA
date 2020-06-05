import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeForDetails } from 'src/app/_models/RecipeForDetails';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { Comment } from 'src/app/_models/comment';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: RecipeForDetails;
  user: User;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.recipe = data['recipe'];
      this.user = data['user'];
    });
  }
}
