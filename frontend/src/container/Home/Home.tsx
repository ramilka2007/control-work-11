import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCategories } from '../../features/categories/categoriesThunk';
import SideBar from '../SideBar/SideBar';
import { getItems, getItemsByCategory } from '../../features/items/itemsThunk';
import AllItems from '../../components/AllItems/AllItems';
import { useLocation } from 'react-router-dom';
import {
  selectIsLoadingItems,
  selectItems,
} from '../../features/items/itemsSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const params = new URLSearchParams(document.location.search);
  const items = useAppSelector(selectItems);
  const itemsLoading = useAppSelector(selectIsLoadingItems);

  const queryString = useLocation().search;

  useEffect(() => {
    dispatch(getCategories());

    if (queryString !== '') {
      dispatch(getItemsByCategory(String(params.get('category'))));
    } else {
      dispatch(getItems());
    }
  }, [dispatch, queryString]);
  return (
    <div className="container">
      <div className="row justify-content-between">
        <SideBar />

        <div className="col col-md-9">
          <h1>All items</h1>
          <div className="row row-cols-1 row-cols-md-3 justify-content-between">
            <AllItems items={items} isLoadingItems={itemsLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
