import React from 'react';
import { NavLink } from 'react-router-dom';
import { Category } from '../../types';

interface Props {
  category: Category;
}
const CategoryItem: React.FC<Props> = ({ category }) => {
  return (
    <li>
      <NavLink to={`?category=${category._id}`} className="text-black">
        {category.title}
      </NavLink>
    </li>
  );
};

export default CategoryItem;
