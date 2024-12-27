import { Transaction } from "../Models/transaction.model.js";

function generateTransactions() {
    const transactions = [];
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - 30);

    const upiApps = ["Paytm", "Google Pay", "PhonePe", "Amazon Pay"];
    const statuses = ["Success", "Pending", "Failed"];

    for (let i = 0; i < 50; i++) {
        const randomDate = new Date(startDate.getTime() + Math.random() * (currentDate.getTime() - startDate.getTime()));
        const amount = (Math.random() * (5000 - 100) + 100).toFixed(2);
        const appUsed = upiApps[Math.floor(Math.random() * upiApps.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        transactions.push({
            transaction_id: `TXN${Math.floor(100000 + Math.random() * 900000)}`,
            amount: parseFloat(amount),
            date: randomDate,
            app: appUsed,
            status: status
        });
    }
    return transactions;
}

export const storeTransaction = async (req, res) => {
    try {
        const transactions = generateTransactions();
        const uniqueTransactions = [...new Map(transactions.map(t => [t.transaction_id, t])).values()];
        await Transaction.insertMany(uniqueTransactions);

        res.json({
            transactions: uniqueTransactions.map(t => ({
                ...t,
                date: t.date.toISOString()
            })),
            message: "Transaction details for the past month have been stored in MongoDB."
        });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Failed to store transaction details." });
    }
};
