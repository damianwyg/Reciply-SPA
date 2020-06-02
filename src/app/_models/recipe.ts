import { Ingredient } from './ingredient';

export interface Recipe {
    recipeId: number;
    userId: number;
    name: string;
    photoUrl: string;
    preparation?: string;
    isVegetarian: boolean;
    isVegan: boolean;
    ingredients?: Ingredient[];
}
