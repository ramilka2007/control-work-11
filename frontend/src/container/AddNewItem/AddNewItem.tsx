import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ItemForm } from '../../types';
import { getCategories } from '../../features/categories/categoriesThunk';
import Spinner from '../../UI/Spinner/Spinner';
import FileInput from '../../UI/FileInput/FileInput';
import {
  selectCategories,
  selectIsLoadingCategories,
} from '../../features/categories/categoriesSlice';
import { addItem, getItems } from '../../features/items/itemsThunk';
import { LoadingButton } from '@mui/lab';
import { selectAddLoadingItems } from '../../features/items/itemsSlice';

const AddNewItem = () => {
  const dispatch = useAppDispatch();
  const Navigation = useNavigate();
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectIsLoadingCategories);
  const addLoading = useAppSelector(selectAddLoadingItems);
  const [error, setError] = useState(false);
  const [newItem, setNewItem] = useState<ItemForm>({
    title: '',
    description: '',
    image: null,
    price: 0,
    category: '',
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', newItem.title);
    formData.append('description', newItem.description);
    formData.append('category', newItem.category);
    formData.append('price', String(newItem.price));

    if (newItem.image) {
      formData.append('image', newItem.image);
    }

    if (
      newItem.description !== '' &&
      newItem.title !== '' &&
      newItem.price > 0 &&
      newItem.category !== ''
    ) {
      try {
        await dispatch(addItem(formData));
        await dispatch(getItems());
        Navigation('/');
      } catch (e) {
        console.error(e);
      }
      setError(false);
    } else {
      setError(true);
    }
  };

  const changeForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setNewItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setNewItem((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <div className="container">
      {categoriesLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={onFormSubmit} className="w-50 mx-auto">
          <h2 className="text-center my-4">Create new item card</h2>
          {error ? (
            <Alert severity="error">Title and description must be field</Alert>
          ) : null}

          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="name" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="form-control"
              value={newItem.title}
              onChange={changeForm}
            />
          </div>

          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="name" className="form-label">
              Text
            </label>
            <textarea
              name="description"
              id="description"
              required
              className="form-control"
              value={newItem.description}
              onChange={changeForm}
            ></textarea>
          </div>

          <div className="mb-3 w-75 mx-auto">
            <label htmlFor="name" className="form-label">
              Price
            </label>
            <input
              type="number"
              min={0}
              name="price"
              id="price"
              required
              className="form-control"
              value={newItem.price}
              onChange={changeForm}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category">
              <span>Category:</span>
              <select
                className="form-control"
                name="category"
                onChange={changeForm}
                value={newItem.category}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mb-3 w-75 mx-auto">
            <FileInput
              onChange={fileInputChangeHandler}
              name="image"
              label="Image"
            />
          </div>

          <LoadingButton
            loading={addLoading}
            type="submit"
            className="btn btn-primary"
          >
            Create
          </LoadingButton>
        </form>
      )}
    </div>
  );
};

export default AddNewItem;
