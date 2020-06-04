import { Ingredient } from './ingredient';
import { Comment } from './comment';

export interface Recipe {
    recipeId: number;
    userId: number;
    name: string;
    photoUrl: string;
    preparation?: string;
    isVegetarian: boolean;
    isVegan: boolean;
    ingredients?: Ingredient[];
    comments?: Comment[];
}
