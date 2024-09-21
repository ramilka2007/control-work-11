import mongoose from 'mongoose';
import config from './config';
import User from "./models/User";
import Category from "./models/Category";
import Item from "./models/Item";

const run = async () => {
    await mongoose.connect(config.database);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('categories');
        await db.dropCollection('items');
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
            title: "Computers",
        },
        {
            title: "Telephones",
        },
        {
            title: "Headphones",
        },
    );

    await Item.create(
        {
            user: user1._id,
            category: category1._id,
            title: 'Computer for sale',
            description: "used computers fos sale",
            image: 'fixtures/computer1.jpg',
            price: 17000,
        },

        {
            user: user1._id,
            category: category1._id,
            title: 'Computer for sale, only today',
            description: "Black Friday sale",
            image: 'fixtures/computer2.webp',
            price: 15000,
        },
        {
            user: user1._id,
            category: category2._id,
            title: 'Sale comfortable phone',
            description: "lallala",
            image: 'fixtures/phone1.jpeg',
            price: 80000,
        },

        {
            user: user1._id,
            category: category2._id,
            title: 'super good',
            description: "still alive",
            image: 'fixtures/phone2.jpg',
            price: 120000,
        },
        {
            user: user2._id,
            category: category3._id,
            title: 'headphones for sale',
            description: "low price",
            image: 'fixtures/headphones1.jpg',
            price: 2500,
        }, {
            user: user2._id,
            category: category3._id,
            title: 'headphones for sale',
            description: "low price",
            image: 'fixtures/headphones2.jpeg',
            price: 1500,
        },
    );
    await db.close();
};

run().catch(console.error);