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
        ["Truffles", "Peri Fries", 150, "200g", "https://cdn.uengage.io/uploads/64261/image-591513-1754044989.jpeg"],
        ["Meghana", "Chicken Biryani", 350, "1 kg", "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400"],
        ["Dominos", "Margherita Pizza", 250, "Medium", "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"],
        ["KFC", "Zinger Burger", 190, "1 pc", "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=400"],
        ["Subway", "Paneer Tikka Sub", 210, "6 inch", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Yugtr0lbUPugLBukHXDzBuROm9Vf_qwbcQ&s"]
    ];

    db.query(sql, [values], (err) => {
        if (err) console.log(err);
        else console.log("Menu Updated ✅");
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