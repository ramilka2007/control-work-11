import mongoose, {Schema, Types} from 'mongoose';
import Category from './Category';
import User from './User';

const ItemSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User does not exist!',
        },
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const category = await Category.findById(value);
                return Boolean(category);
            },
            message: 'Category does not exist!',
        },
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;