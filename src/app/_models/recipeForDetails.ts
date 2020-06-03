import { Ingredient } from './ingredient';

export interface RecipeForDetails {
    recipeId: number;
    name: string;
    photoUrl: string;
    preparation?: string;
    isVegetarian: boolean;
    isVegan: boolean;
    ingredients?: Ingredient[];

    // user part
    userId: number;
    displayName: string;
    avatarUrl: string;
}
