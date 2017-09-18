import * as CategoriesAPI from '../utils/CategoriesAPI';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch => (
  CategoriesAPI
      .fetchCategories()
      .then(result => dispatch(receiveCategories(result.categories)))
);
