import { Recipe } from './recipe';

export interface User {
  id: number;
  userName: string;
  displayName: string;
  email: string;
  created: Date;
  lastActive: Date;
  avatarUrl: string;
  city: string;
  country: string;
  aboutMe?: string;
  recipes?: Recipe[];
}
