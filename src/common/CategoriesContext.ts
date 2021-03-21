import { createContext } from 'react';
import { CategoryModel } from './Models';

export const CategoriesContext = createContext<CategoryModel[]>([]);
