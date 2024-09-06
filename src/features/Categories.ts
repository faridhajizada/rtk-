import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

export interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategoriesState {
  entities: Category[];
  liked: Category[];
  basket: Category[];
  entity: Category | null;
  status: {
    fetch: 'idle' | 'pending' | 'succeeded' | 'failed';
    delete: 'idle' | 'pending' | 'succeeded' | 'failed';
    edit: 'idle' | 'pending' | 'succeeded' | 'failed';
  };
}

const initialState: CategoriesState = {
  entities: [],
  liked: [],
  basket: [],
  entity: null,
  status: {
    fetch: 'idle',
    delete: 'idle',
    edit: 'idle',
  },
};

export const getAllCategories = createAsyncThunk(
  'categories/getAllCategories',
  async () => {
    const response = await fetch('https://northwind.vercel.app/api/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data;
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: number) => {
    const response = await fetch(`https://northwind.vercel.app/api/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
    return id;
  }
);

export const changeCategory = createAsyncThunk(
  'categories/changeCategory',
  async (category: Category) => {
    const response = await fetch(`https://northwind.vercel.app/api/categories/${category.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: category.name, description: category.description }),
    });

    if (!response.ok) {
      throw new Error('Failed to change category');
    }
    const data = await response.json();
    return data;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addlike: (state, action: PayloadAction<Category>) => {
      state.liked = [...state.liked, action.payload];
    },
    removelike: (state, action: PayloadAction<number>) => {
      state.liked = state.liked.filter(item => item.id !== action.payload);
    },
    toggleBasket: (state, action: PayloadAction<Category>) => {
      if (state.basket.some(item => item.id === action.payload.id)) {
        state.basket = state.basket.filter(item => item.id !== action.payload.id);
      } else {
        state.basket = [...state.basket, action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.status.fetch = 'pending';
      })
      .addCase(getAllCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.status.fetch = 'succeeded';
        state.entities = action.payload;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.status.fetch = 'failed';
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status.delete = 'pending';
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
        state.status.delete = 'succeeded';
        state.entities = state.entities.filter(category => category.id !== action.payload);
        state.basket = state.basket.filter(category => category.id !== action.payload);
        state.liked = state.liked.filter(category => category.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.status.delete = 'failed';
      })
      .addCase(changeCategory.pending, (state) => {
        state.status.edit = 'pending';
      })
      .addCase(changeCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.status.edit = 'succeeded';
        state.entities = state.entities.map(category =>
          category.id === action.payload.id ? action.payload : category
        );
      })
      .addCase(changeCategory.rejected, (state) => {
        state.status.edit = 'failed';
      });
  },
});

export const selectCategories = (state: RootState) => state.categories.entities;
export const selectLikedCategories = (state: RootState) => state.categories.liked;

export const { addlike, removelike, toggleBasket } = categoriesSlice.actions;

export default categoriesSlice.reducer;
