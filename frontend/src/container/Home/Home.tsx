import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCategories} from "../../features/categories/categoriesSlice";
import {getCategories} from "../../features/categories/categoriesThunk";
import SideBar from "../SideBar/SideBar";

const Home = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);


    useEffect(() => {
        if (categories?.length === 0) {
            dispatch(getCategories());
        }
    }, [dispatch]);
    return (
        <div className="container">
            <div className="row justify-content-between">
                <SideBar/>

                <div className="col col-md-9">
                    <h1>All items</h1>
                </div>
            </div>
        </div>
    );
};

export default Home;