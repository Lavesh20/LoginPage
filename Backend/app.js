const express = require("express")
const cors = require("cors");
const { collection } = require("./db");
const jwt = require("jsonwebtoken") 
const  jwtPasssword = "123456"
const bcrypt = require('bcrypt')
const app  = express();
app.use(express.json());
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))

const corsOptions = {
    origin: 'http://localhost:5173', // specify your frontend's URL
    credentials: true,
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


app.post("/forgot-password",async(req,res)=>{
    const {email} = req.body;
    try{
        const oldUser = await collection.findOne({email})
        if(!oldUser){
          return  res.send("User doesn't exist")
        }
        const secret = jwtPasssword + oldUser.password
        const token  = jwt.sign({email:oldUser.email,id:oldUser._id},secret,{expiresIn:'5m'})
        const link = `http://localhost:5173/reset-password/${oldUser._id}/${token}`
        console.log(link)
    }catch(e){console.log(e)}
    

})


app.get("/reset-password/:id/:token",async(req,res)=>{
    const {id,token} = req.params
    console.log(req.params)
   
    const oldUser = await collection.findOne({_id:id})
    if(!oldUser){
      return  res.json({status:"User doesn't exist"})
    }
    const secret = jwtPasssword + oldUser.password
    try {
        const verify  = jwt.verify(token,secret)
        //res.render("index",{email:verify.email})
    } catch (error) {
        res.json({status:"not verified"})
    }
})

app.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

     try {
        const oldUser = await collection.findOne({ _id: id });

        if (!oldUser) {
            return res.status(404).json({ status: "User doesn't exist" });
        }

        const secret = jwtPasssword + oldUser.password;
        const verify = jwt.verify(token, secret);

        //const encryptedPassword = await bcrypt.hash(password, 10);

        await collection.updateOne(
            { _id: id },
            { $set: { password: password } }
        );

        return res.status(200).json({ status: "Password updated" });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ status: "Token not verified" });
    }
});






app.listen(3000, () => {
    console.log("Server running on port 3000");
});