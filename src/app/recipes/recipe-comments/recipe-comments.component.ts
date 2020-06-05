import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Comment } from 'src/app/_models/comment';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/_services/recipe.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-recipe-comments',
  templateUrl: './recipe-comments.component.html',
  styleUrls: ['./recipe-comments.component.css'],
})
export class RecipeCommentsComponent implements OnInit {
  @Input() user: User;
  @Input() recipeId: number;
  newComment: any = {};
  comments: Comment[];

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadComments();
  }

  addComment() {
    this.newComment.userId = this.authService.decodedToken.nameid;
    this.newComment.avatarUrl = this.user.avatarUrl;
    this.newComment.username = this.user.displayName;

    this.recipeService.addComment(this.recipeId, this.newComment).subscribe(
      (comment: Comment) => {
        this.comments.unshift(comment);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadComments() {
    this.recipeService.getCommentsForRecipe(this.recipeId).subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
        console.log(this.comments);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // isUndefined() {
  //   return this.comments === undefined;
  // }
}
