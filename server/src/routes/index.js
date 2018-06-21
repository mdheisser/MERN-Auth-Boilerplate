import express from 'express';

const router = express.Router();

// Base Route
router.get('/', (req, res) => {
    res.json({ success: 'API Connection Successful' });
});

export default router;
