import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../costants';
import Spinner from '../../UI/Spinner/Spinner';
import { AllItems } from '../../types';

interface Props {
  items: AllItems[];
  isLoadingItems: boolean;
}

const AllItems: React.FC<Props> = ({ items, isLoadingItems }) => {
  return (
    <>
      {isLoadingItems ? (
        <Spinner />
      ) : (
        <>
          {items.length === 0 ? (
            <p>No items yet</p>
          ) : (
            <>
              {items.map((item) => (
                <NavLink
                  key={item._id}
                  className="d-flex flex-column mb-3 text-decoration-none text-black"
                  to={`/items/${item._id}`}
                >
                  <Card className="border h-100">
                    <CardMedia
                      sx={{ height: 140 }}
                      image={item.image ? API_URL + '/' + item.image : null}
                      title={item._id}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.price} SOM
                      </Typography>
                    </CardContent>
                  </Card>
                </NavLink>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default AllItems;
