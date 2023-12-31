const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ljsyrma.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const UsersData = client.db("mPair").collection("user");
    // registration function
    app.post("/users/:email", async (req, res) => {
      const email = req.params.email;
      const { name, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const updateUser = {
        email,
        password: hashedPassword,
      };
      const query = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: updateUser,
      };
      const result = await UsersData.updateOne(query, updateDoc, options);
      res.json(result);
    });
    // Login function
    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await UsersData.findOne({ email });
        if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          res.status(401).json({ message: "Invalid credentials" });
          return;
        }
        const token = jwt.sign(
          {
            UserID: user._id,
            userEmail: user.email,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        console.log(token);
        // res.status(200).json({ message: "Login successful" });
        // return res.status(200).json(user);
        return res.status(200).json({ user, token });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    // console.log(process.env.SECRET_KEY);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(`mPair server is running on port: ${port}`);
});

app.listen(port, () => {
  console.log("mPair server is running");
});
