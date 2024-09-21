import mongoose from 'mongoose';
import config from './config';
import User from "./models/User";
import Category from "./models/Category";

const run = async () => {
    await mongoose.connect(config.database);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('categories');
    } catch (e) {
        console.log('Skipping drop...');
    }

    const [user1, user2] = await User.create({
            username: 'user1',
            displayName: 'User First',
            phone: '+996555243434',
            password: '123',
            token: '1'
        },
        {
            username: 'user2',
            displayName: 'User Second',
            phone: '+9965458888',
            password: '123',
            token: '2'
        });

    const [category1, category2, category3] = await Category.create(
        {
            title: "category1",
        },
        {
            title: "category2",
        },
        {
            title: "category3",
        },
    );
    await db.close();
};

run().catch(console.error);