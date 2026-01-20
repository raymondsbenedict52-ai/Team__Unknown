import Water from "../models/Water.js";

export const addWater = async (req, res) => {
    const { amount } = req.body;

    const entry = await Water.create({
        user: req.user.id,
        amount,
    });

    res.status(201).json(entry);
};

export const getTodayWater = async (req, res) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const total = await Water.aggregate([
        {
            $match: {
                user: req.user._id,
                date: { $gte: start },
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" },
            },
        },
    ]);

    res.json({ total: total[0]?.total || 0 });
};
