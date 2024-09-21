import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { API_URL } from '../../costants';
import { Card, CardContent, Typography } from '@mui/material';
import { selectUser } from '../../features/users/usersSlice';
import {
  deleteItemById,
  getOneItemById,
} from '../../features/items/itemsThunk';
import {
  selectDeleteLoadingItem,
  selectIsLoadingItems,
  selectItem,
} from '../../features/items/itemsSlice';
import Spinner from '../../UI/Spinner/Spinner';
import DeleteItemBtn from './DeleteItemBtn';

const FullItemView = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const params = useParams();
  const navigation = useNavigate();
  const user = useAppSelector(selectUser);
  const item = useAppSelector(selectItem);
  const itemsLoading = useAppSelector(selectIsLoadingItems);
  const deleteLoading = useAppSelector(selectDeleteLoadingItem);

  useEffect(() => {
    if (params.id) {
      dispatch(getOneItemById(params.id));
    }
  }, [dispatch, params.id]);

  const deleteItem = async (id: string) => {
    try {
      await dispatch(deleteItemById(id));
      navigation('/');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="container">
      {itemsLoading?.get ? (
        <Spinner />
      ) : (
        <>
          {item !== null ? (
            <Card key={item._id} className="mb-4 border text-start p-3">
              <img
                className="mx-auto d-block"
                width="200"
                src={item.image ? API_URL + '/' + item.image : null}
                alt={item._id}
              />
              <hr />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="fs-3"
                  component="div"
                >
                  {item.price} SOM
                  <hr />
                  <h6 className="mt-1 text-black">
                    Salesman: {item.user.displayName} - {item?.user.phone}
                  </h6>
                  <DeleteItemBtn
                    item={item}
                    deleteItem={deleteItem}
                    user={user?._id}
                    loading={deleteLoading}
                  />
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <p>Not found</p>
          )}
        </>
      )}
    </div>
  );
};

export default FullItemView;
