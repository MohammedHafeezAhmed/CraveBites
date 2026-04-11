const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 YOUR DATABASE CONNECTION (paste your values here)
const db = mysql.createConnection({
    uri: "mysql://root:QnPxiHEhPCkABKtYCSZFSJmbvkgqLcri@metro.proxy.rlwy.net:47504/railway"
});
// Connect to DB
db.connect(err => {
    if (err) {
        console.error("DB Connection Failed:", err);
    } else {
        console.log("Connected to MySQL ✅");

        createTables();

        setTimeout(() => {
            insertMenuData();
        }, 2000); // wait 2 sec
    }
});

// 🔥 CREATE TABLES AUTOMATICALLY
function createTables() {
    const users = `
        CREATE TABLE IF NOT EXISTS Users (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            address TEXT
        )
    `;

    const menu = `
        CREATE TABLE IF NOT EXISTS Menu (
            item_id INT AUTO_INCREMENT PRIMARY KEY,
            restaurant VARCHAR(100),
            name VARCHAR(100),
            price INT,
            measure VARCHAR(50),
            image TEXT
        )
    `;

    const orders = `
        CREATE TABLE IF NOT EXISTS Orders (
            order_id INT AUTO_INCREMENT PRIMARY KEY,
            user_name VARCHAR(100),
            address TEXT,
            total_amount INT,
            payment_method VARCHAR(50)
        )
    `;

    db.query(users, (err) => {
        if (err) console.log(err);
        else console.log("Users table ready");
    });

    db.query(menu, (err) => {
        if (err) console.log(err);
        else console.log("Menu table ready");
    });

    db.query(orders, (err) => {
        if (err) console.log(err);
        else console.log("Orders table ready");
    });
}

function insertMenuData() {
    db.query("DELETE FROM Menu");

    const sql = `
        INSERT INTO Menu (restaurant, name, price, measure, image)
        VALUES ?
    `;

    const values = [
        ["Truffles", "Cheese Burger", 220, "1 pc", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"],
        ["Truffles", "Peri Peri Fries", 150, "200g", "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400"],
        ["Truffles", "Chicken Steak", 320, "1 plate", "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400"],

        ["KFC", "Zinger Burger", 190, "1 pc", "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=400"],
        ["KFC", "Hot Wings", 180, "6 pcs", "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400"],
        ["KFC", "Chicken Bucket", 450, "10 pcs", "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"],

        ["Dominos", "Margherita Pizza", 250, "Medium", "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"],
        ["Dominos", "Farmhouse Pizza", 350, "Medium", "https://www.shutterstock.com/image-photo/veg-extravaganza-loaded-flavorful-pizza-600nw-2700208497.jpg"],
        ["Dominos", "Pepperoni Pizza", 400, "Medium", "https://images.ctfassets.net/ttw7uwgviuml/3tlrBPPky3SNq7sxDowxOc/73958ae22c00682deb72f4ce5a68fde8/PLU_WF_LIFESTYLE_Pepperoni_Pizza_READYMEALS.jpg?fm=webp"],

        ["Pizza Hut", "Cheese Burst Pizza", 400, "Medium", "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400"],
        ["Pizza Hut", "Veggie Supreme", 380, "Medium", "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"],
        ["Pizza Hut", "Chicken Sausage Pizza", 420, "Medium", "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400"],

        ["Burger King", "Whopper", 220, "1 pc", "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400"],
        ["Burger King", "Veg Whopper", 200, "1 pc", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400"],
        ["Burger King", "French Fries", 120, "200g", "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400"],

        ["Subway", "Paneer Tikka Sub", 210, "6 inch", "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400"],
        ["Subway", "Veggie Delight", 190, "6 inch", "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400"],
        ["Subway", "Chicken Teriyaki", 260, "6 inch", "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400"],

        ["Meghana", "Chicken Biryani", 350, "1 kg", "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400"],
        ["Meghana", "Mutton Biryani", 420, "1 kg", "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400"],
        ["Meghana", "Paneer Biryani", 300, "1 kg", "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"],

        ["McDonalds", "McAloo Tikki", 120, "1 pc", "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400"],
        ["McDonalds", "McChicken", 180, "1 pc", "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400"],
        ["McDonalds", "Fries", 110, "200g", "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400"],

        ["Wow Momo", "Chicken Momos", 160, "8 pcs", "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"],
        ["Wow Momo", "Veg Momos", 140, "8 pcs", "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"],
        ["Wow Momo", "Fried Momos", 180, "8 pcs", "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400"],

        ["Starbucks", "Cold Coffee", 250, "300ml", "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"],
        ["Starbucks", "Cappuccino", 280, "250ml", "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400"],
        ["Starbucks", "Latte", 300, "250ml", "https://images.openfoodfacts.org/images/products/576/046/699/5931/front_fr.47.full.jpg"],

        ["CCD", "Cafe Latte", 220, "250ml", "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400"],
        ["CCD", "Cold Coffee", 200, "300ml", "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"],
        ["CCD", "Sandwich", 180, "1 pc", "https://images.unsplash.com/photo-1528731708534-816fe59f90cb?w=400"],

        ["Haldiram", "Chole Bhature", 180, "1 plate", "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400"],
        ["Haldiram", "Raj Kachori", 120, "1 pc", "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400"],
        ["Haldiram", "Samosa", 40, "1 pc", "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400"],

        ["Bikanervala", "Pav Bhaji", 150, "1 plate", "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400"],
        ["Bikanervala", "Dosa", 120, "1 plate", "https://images.unsplash.com/photo-1589308078054-8325d7f9f5d1?w=400"],
        ["Bikanervala", "Idli", 80, "2 pcs", "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400"]
    ];

    db.query(sql, [values], (err) => {
        if (err) console.log(err);
        else console.log("Menu Updated with Many Items ✅");
    });
}

// TEST API
app.get("/", (req, res) => {
    res.send("Backend Running 🚀");
});

// GET MENU
app.get("/menu", (req, res) => {
    db.query("SELECT * FROM Menu", (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
});

// ADD ORDER
app.post("/order", (req, res) => {
    const { name, address, total, payment } = req.body;

    const sql = `
        INSERT INTO Orders (user_name, address, total_amount, payment_method)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, address, total, payment], (err, result) => {
        if (err) return res.send(err);
        res.json({ message: "Order placed!" });
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000 🚀");
});

app.get("/orders", (req, res) => {
    db.query("SELECT * FROM Orders", (err, result) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        res.json(result);
    });
});