import Url from '../models/url.js';
import { customAlphabet } from 'nanoid';
import validUrl from 'valid-url';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 7);

export async function createShortUrl(req, res) {
    try {
        const { longUrl } = req.body;
        const baseUrl = process.env.BASE_URL;

        if (!longUrl) return res.status(400).json({ message: 'longUrl is required' });
        if (!validUrl.isWebUri(longUrl)) return res.status(400).json({ message: 'Invalid URL' });

        const existing = await Url.findOne({ longUrl });
        if (existing) return res.json(existing);

        let code = nanoid();
        while (await Url.exists({ code })) code = nanoid();

        const shortUrl = `${baseUrl.replace(/\/$/, '')}/${code}`;
        const doc = await Url.create({ code, longUrl, shortUrl });
        return res.status(201).json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function redirectByCode(req, res) {
    try {
        const { shortcode } = req.params;
        const entry = await Url.findOne({ code: shortcode });
        if (!entry) return res.status(404).send('Not found');

        entry.clicks += 1;
        await entry.save();

        // 302 redirect
        return res.redirect(entry.longUrl);
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error');
    }
}

export async function listAll(req, res) {
    try {
        const docs = await Url.find().sort({ createdAt: -1 });
        res.json(docs);
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
}

export async function deleteUrl(req, res) {
    try {
        const { id } = req.params;
        const deleted = await Url.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'URL not found' });
        res.json({ message: 'URL deleted successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server error' });
    }
}