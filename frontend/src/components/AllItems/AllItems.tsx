import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {useAppSelector} from '../../app/hooks';
import {API_URL} from '../../costants';
import Spinner from "../../UI/Spinner/Spinner";
import {selectIsLoadingItems, selectItems} from "../../features/items/itemsSlice";

const AllItems = () => {
    const items = useAppSelector(selectItems);
    const itemsLoading = useAppSelector(selectIsLoadingItems);

    return (
        <>
            {itemsLoading.get ? <Spinner/> :
                <>
                    {items.length === 0 ? <p>No items yet</p> :
                        <>
                            {items.map(item => (
                                <NavLink  key={item._id} className="col text-decoration-none text-black" to={`/items/${item._id}`}>
                                    <Card className="mb-4 border">
                                        <CardMedia
                                            sx={{height: 140}}
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
                    }
                </>
            }
        </>
    );
};

export default AllItems;