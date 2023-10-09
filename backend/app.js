const express = require('express');
const mysql= require('mysql');
const cors=require('cors');
const nodemailer = require('nodemailer');


const app=express();
app.use(cors());
app.use(express.json());

const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database:"authentication"
    
    
})

function sendEmail(email , userId) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "nitinkumarsuresh04@gmail.com",
        pass: "pqpkzwhayfmogndm",
      },
    });
    console.log(email);
  
    const mailOptions = {
      from: "nitinkumarsuresh04@gmail.com",
      to: email,
      subject: 'Password Reset Link',
      text: `Use the following link to reset your password: http://localhost:3000/reset-password/${userId}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });
  }

  app.post("/mailprocess", (req, res) => {
    const { email , userId} = req.body;
    console.log(userId);
    sendEmail(email , userId)
      .then((response) => {
        res.status(200).send(response.message);
        console.log('Email sent successfully');
      })
      .catch((error) => {
        res.status(500).send(error.message);
        console.error('Error occurred:', error.message);
      });
  });



app.post('/add', (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    db.query("SELECT * FROM users WHERE user_email = ?", [email], (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ error: "An error occurred" });
        }
        if (results.length >= 1) {
          return res.status(400).json({ error: "Email already exists" });
        }
    const insertQuery = 'INSERT INTO Users (user_name, user_email, user_password) VALUES (?, ?, ?)';
    db.query(insertQuery, [name, email, password], (err, result) => {
      if (err) {
        console.error('Error inserting user data:', err);
        return res.status(500).json({ error: 'An error occurred' });
      }
      if (result.affectedRows === 1) {
        return res.status(200).json({ message: 'Registration successful' });
      } else {
        return res.status(500).json({ message: 'Registration failed' });
      }
    });
   });
  });

  app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE user_email = ?", [email], async (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: "An error occurred" });
        return;
      }
      if (results.length === 0) {
        res.status(400).json({ error: "Invalid email or password" });
        return;
      }
      const user = results[0];
    //   console.log(user);
    //   console.log(password+" "+user.user_password);
      const passwordMatch =password===user.user_password;
      if (!passwordMatch) {
        res.status(400).json({ error: "Wrong password" });
        return;
      }
      
      res.json({ user });
    });
  });

  app.get("/details", (req, res) => {
    const { email } = req.query;
    const q = "SELECT id, user_name FROM Users WHERE user_email = ?";
    db.query(q, [email], (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });

  app.post("/update-password" , (req , res)=>{
    const {password , id} = req.body;
    console.log(password +" "+id);
    const q = "UPDATE users set user_password = ? where id = ?";
    db.query(q , [password , id] , (err, data)=>{
      if(err){
        console.log(err);
      }
      return res.json("ok");
    })
  });
  
  app.listen(9000, () => {
    console.log('Server started on port 9000');
  });