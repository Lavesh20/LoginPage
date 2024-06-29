const express = require("express")
const cors = require("cors");
const { collection } = require("./db");
 
const app  = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', // specify your frontend's URL
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));




app.get('/', cors(), (req, res) => {
    res.send("Welcome to the API");
});

// Route to handle login check
app.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await collection.findOne({ email });

        if (user) {
            if (user.password === password) {
                res.json("exists");
            } else {
                res.status(401).json({ message: "Invalid password" });
            }
        } else {
            res.status(404).json("not exists");
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred. Please try again." });
        console.log(error);
    }
});

// Route to handle signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    const data = {
        email: email,
        password: password
    };

    try {
        const check = await collection.findOne({ email: email });

        if (check) {
            res.json({ message: "User already exists" });
        } else {
            await collection.insertMany([data]);
            res.json({ success: true, message: "User created successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred. Please try again." });
        console.log(error);
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});