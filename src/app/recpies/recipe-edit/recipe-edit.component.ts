import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Recipe } from 'src/app/_models/recipe';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  // @ViewChild('editForm', { static: true }) editForm: NgForm;
  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any) {
  //   if (this.editForm.dirty) {
  //     $event.returnValue = true;
  //   }
  // }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.recipe = data['recipe'];
    });
  }

}
