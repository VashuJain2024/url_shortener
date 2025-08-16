export function adminAuth(req, res, next) {
    const key = req.header('x-admin-key');
    if (!key || key !== process.env.ADMIN_KEY) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}
