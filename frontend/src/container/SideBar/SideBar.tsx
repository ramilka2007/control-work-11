import {useAppSelector} from '../../app/hooks';

import {selectCategories, selectIsLoadingCategories,} from '../../features/categories/categoriesSlice';
import Spinner from "../../UI/Spinner/Spinner";
import {NavLink} from "react-router-dom";
import CategoryItem from "../../components/CategoryItem/CategoryItem";

const SideBar = () => {
    const categories = useAppSelector(selectCategories);
    const categoriesLoading = useAppSelector(selectIsLoadingCategories);
    console.log(categories)

    return (
        <aside className="col col-md-2">
            {categoriesLoading
                ? <Spinner/>
                : <>
                    {categories?.length > 0 ?
                        <ul className="text-start">
                            <li><NavLink to="/">All</NavLink></li>
                            {categories?.map(category => (
                                <CategoryItem key={category._id} category={category}/>
                            ))}
                        </ul>
                        :
                        <p>No one category</p>
                    }
                </>
            }
        </aside>
    );
};

export default SideBar;