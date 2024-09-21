import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCategories} from "../../features/categories/categoriesSlice";
import {getCategories} from "../../features/categories/categoriesThunk";
import SideBar from "../SideBar/SideBar";
import {getItems, getItemsByCategory} from "../../features/items/itemsThunk";
import AllItems from "../../components/AllItems/AllItems";
import {useLocation} from "react-router-dom";

const Home = () => {
    const dispatch = useAppDispatch();
    const params = new URLSearchParams(document.location.search);
    const categories = useAppSelector(selectCategories);

    const queryString = useLocation().search;


    useEffect(() => {
        if (categories?.length === 0) {
            dispatch(getCategories());
        } else if (queryString !== '') {
            dispatch(getItemsByCategory(String(params.get('category'))));
        } else {
            dispatch(getItems());
        }
    }, [dispatch, queryString]);
    return (
        <div className="container">
            <div className="row justify-content-between">
                <SideBar/>

                <div className="col col-md-9">
                    <h1>All items</h1>
                    <div className="row row-cols-1 row-cols-md-3 justify-content-between">
                        <AllItems />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;