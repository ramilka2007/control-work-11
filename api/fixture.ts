import mongoose from 'mongoose';
import config from './config';
import User from "./models/User";
import Post from "./models/Post";
import Comments from "./models/Comment";

const run = async () => {
    await mongoose.connect(config.database);
    const db = mongoose.connection;

    try {
    } catch (e) {
        console.log('Skipping drop...');
    }

    const [user1, user2] = await User.create({
            username: 'user1',
            password: '123',
            token: '1'
        },
        {
            username: 'user2',
            password: '123',
            token: '2'
        });
    await db.close();
};

run().catch(console.error);