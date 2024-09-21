import {Router} from 'express';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer';
import Item from "../models/Item";

const itemsRouter = Router();

itemsRouter.get('/', async (req, res, next) => {
    try {
        let items;

        if (req.query.category) {
            items = await Item.find({category: req.query.category});
        } else {
            items = await Item.find();
        }

        return res.send(items);
    } catch (e) {
        next(e);
    }
});

itemsRouter.get('/:id', async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400).send({"error": "Id items params must be in url"});
        }

        const item = await Item.findById(req.params.id).populate('user', 'displayName phone');
        return res.send(item);
    } catch (e) {
        next(e);
    }
});

itemsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {

    try {
        const itemData = new Item({
            user: req.user?._id,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            image: req.file ? req.file.filename : null,
        });

        const item = new Item(itemData);
        await item.save();

        return res.send(item);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        return next(e);
    }
});

itemsRouter.delete('/:id', auth ,async (req: RequestWithUser, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400).send({"error": "Id items params must be in url"});
        }

        const user = req.user?._id;
        const item = await Item.findById(req.params.id);

        if (user && item) {
            if (String(item.user._id) === String(user._id)) {
                await Item.findByIdAndDelete(req.params.id);
                return res.send('Item was success deleted');
            } else {
                return res.status(403).send('You are not the author of this items');
            }
        }

        return res.send('Item was success deleted');
    } catch (e) {
        next(e);
    }
});

export default itemsRouter;