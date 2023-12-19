
const pool = require("./database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { hash } = require("bcrypt");
const util = require("util");
const poolQuery = util.promisify(pool.query).bind(pool);

 pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    process.exit(1); // Terminate the application
  } else {
    console.log("Connected to MySQL database");
    connection.release(); // Release the connection back to the pool
  }
});

// GET endpoint to retrieve product data

// ...

const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;
  // const {authToken} = req.cookies;

  console.log(authToken);

  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(authToken, "Maneesh", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  products: async (req, res) => {
    try {
      // verifyToken(req, res, async () => { 
        pool.query(`SELECT * FROM product`, (error, results, fields) => {
          if (error) throw error;
          // console.log(results);
          res.send(results);
        });
        // });
        // res.cookie('test',verifyToken)

    } catch (error) {
      console.error("Error executing query:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  },

  getInfo: async (req, res) => {
    try {
      const ID = req.params.ID;
      // console.log("id", ID);
      pool.query(
        "SELECT * FROM singleproduct WHERE id = ?",
        [ID],
        (error, results, fields) => {
          if (error) {
            console.error("Error executing query:", error);
            res
              .status(500)
              .json({ error: "Internal Server Error", details: error.message });
            return;
          }
          // console.log(results);
          res.send(results);
        }
      );
    } catch (error) {
      console.error("Error executing query:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  },
  ////////////////////////////////
  
  Getcart: async (req,res)=>{
    try {
      // Assuming you want to retrieve all items from the cart
      pool.query('SELECT * FROM cart', (error, results, fields) => {
        if (error) {
          console.error('Error executing query:', error);
          return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
        res.json(results);
      });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  },

  //////////////////////////////
  Delete: async (req, res) => {
    try {
      // Assuming you want to clear all items from the cart
      pool.query('DELETE FROM cart WHERE id > 0', (error, results, fields) => {
        if (error) {
          console.error('Error executing query:', error);
          return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
        res.json({ message: 'Cart cleared successfully' });
      });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  },
  //////////////////////////
   DeleteCartItemByName: async (req, res) => {
    try {
      const itemName = req.params.name;
  
      // Perform the deletion in the database
      pool.query(
        'DELETE FROM cart WHERE name = ?',
        [itemName],
        (error, results, fields) => {
          if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
          }
  
          console.log(results);
          res.json({ message: 'Item deleted successfully' });
        }
      );
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  },
  
  // POST endpoint to insert data into the 'cart' table
  Cart: async (req, res) => {
    try {
      // verifyToken(req, res, async () => {
      const { name, price, color, amount } = req.body;
  
      // Ensure that the values are defined before constructing the SQL query
      if (name !== undefined && price !== undefined && color !== undefined && amount !== undefined) {
        // Proceed with the database insertion
        pool.query(
          `INSERT INTO cart(name, price, color, amount) VALUES (?, ?, ?, ?)`,
          [name, price, color, amount],
          (error, results, fields) => {
            if (error) {
              console.error('Error executing query:', error);
              return res.status(500).json({ error: "Internal Server Error", details: error.message });
            }
            console.log(results);
            res.json({ message: "Item inserted successfully" });
          }
        );
      } else {
        // Handle the case where one or more values are undefined
        res.status(400).json({ error: "Invalid request payload" });
      }
    } catch (error) {
      console.error("Error executing query:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  },
  
  // POST endpoint to insert data into the 'product' table
  productsI: async (req, res) => {
    try {
      const { id, name, price } = req.body;
      console.log(id, name, price);

      pool.query(
        `INSERT INTO product(id, name, price) VALUES (${id},'${name}','${price},')`,
        (error, results, fields) => {
          if (error) throw error;
          console.log(results);
        }
      );

      res.json({ message: "Item inserted successfully" });
    } catch (error) {
      console.error("Error executing query:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  },

  Login: async (req, res) => {
    try {
      const { Email, password } = req.body;
      console.log(Email, password);

      const results = await poolQuery(
        `SELECT * FROM users WHERE email = '${Email}'`
      );
      console.log(results[0].password);

      if (results.length > 0) {
        const user = results[0];
        const hash = user.password;

        // Compare the provided password with the hashed password
        if (hash) {
          const passwordMatch = await bcrypt.compare(password, hash);

          if (passwordMatch) {
            // If passwords match, generate a JWT token
            const token = jwt.sign(
              { userId: results.insertId, username: results.username },
              "Maneesh",
              { expiresIn: "1h" }
            );

            // Set the token in the cookie
            res.cookie("authToken", token, { httpOnly: true,sameSite: 'None',secure: true,});

            // Send the response
            return res.json({ message: "Login successful", token: token });
          } else {
            return res.status(401).json({ message: "Invalid password" });
          }
        }
      } else {
        // User with the provided email doesn't exist
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error executing query:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  },

  User: async (req, res) => {
    try {
      const { username, Email, password } = req.body;
      console.log(username, Email, password);

      if (!(username && Email && password)) {
        return res.status(400).send("All fields should be filled");
      }

      pool.query(
        `SELECT * FROM users WHERE email ='${Email}'`,
        function (error, results, fields) {
          if (error) throw error;
          // console.log('The solution is: ', results[0].solution);

          if (results.length > 0) {
            console.log("User already exists");
            return res.json({ message: "User already exists" });
          }
        }
      );

      const encrypt = await bcrypt.hash(password, 10);

      const results = pool.query(
        `INSERT INTO users(username, Email, password) VALUES ('${username}','${Email}','${encrypt}')`
      );

      const token = jwt.sign(
        { userId: results.insertId, username: username },
        "Maneesh",
        { expiresIn: "1h" }
      );

      return res.json({
        message: "User registered successfully",
        token: token,
      });
    } catch (error) {
      console.error("Error executing query:", error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  },
};
