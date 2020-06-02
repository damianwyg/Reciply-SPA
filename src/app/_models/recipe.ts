import { Ingredient } from './ingredient';

export interface Recipe {
    id: number;
    name: string;
    photoUrl: string;
    preparation?: string;
    isVegetarian: boolean;
    isVegan: boolean;
    ingredients?: Ingredient[];
}
