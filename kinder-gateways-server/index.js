// installed packages
const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const bcrypt = require('bcrypt')
const PORT = 3001

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// connecting to database
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kinder_gateway'
})

let profileData = '';
let userID = '';

// account registration
app.post('/registration', async (request, response) => {


  try {
    const encryptPass = await bcrypt.hash(request.body.password, 10)

    // data stored in array
    const values = [
      request.body.email,
      encryptPass,
      request.body.firstname,
      request.body.lastname,
      request.body.address,
      request.body.mobile,
      request.body.gender,
      request.body.login
    ]
    const sqlEmailValidation = 'SELECT * FROM user_account WHERE email_address = ?';
    const sqlInsert = 'INSERT INTO user_account (email_address, password, first_name, last_name, address, phone_number, gender, logged_in) VALUES (?)';

    db.query(sqlEmailValidation, [request.body.email], (error, result) => {
      if(error){
        console.log(error)
      } else{
        if (result.length > 0) {
          response.status(409).json({error: 'This email address has already been registered.'})
        } else {
          db.query(sqlInsert, [values], (error, result) => {
            if(error) {
              console.log(error)
            } else {
              console.log(result)
              response.send('Successfully registered.')
            }
          })
        }
      }
    })
  } catch(error) {
    console.log(error)
  }
})

// login auth
app.post('/verify/login', async (request, response) => {
  try {
    const values = [
      request.body.email,
      request.body.password,
    ]
    const sqlAuth = 'SELECT * FROM user_account WHERE email_address = ?';
    const sqlUpdate = 'UPDATE user_account SET logged_in = ? WHERE email_address = ?';
  
    db.query(sqlAuth, values[0], async (error, result) => {
      if(error) {
        console.log(error);
      } else {
        if (result.length > 0) {
          const dbPassword = result[0].password
          const passwordAuth = await bcrypt.compare(request.body.password, dbPassword)
          profileData = result[0].email_address;
          userID = result[0].user_id;
          console.log(profileData);
          if (passwordAuth) {
            response.json(result);
            // get user data
            app.get('/profile', (request, response) => {
              const sqlSelect = 'SELECT * FROM user_account WHERE email_address = ?';
              db.query(sqlSelect, profileData, (error, result) => {
                if(error) {
                  console.log(error)
                } else {
                  response.json(result);
                  console.log('profile auto-fill sent')
                }
              })
            })

            // get the logged in user account
            app.put('/login', (request, response) => {
              db.query(sqlUpdate, [true, profileData], (error, result) => {
                if(error) {
                  console.log(error)
                } else {
                  values[0]
                  response.json(result)
                }
              })
            })
          } else {
            response.status(401).json({error : 'Incorrect username or password'})
            console.log('error')
          }
        } else {
          response.status(500).json({ error : 'Incorrect username or password'});
        }
      }
      response.end()
    })
  } catch(error) {
    console.log(error);
  }
})

// logout
app.put('/logout', (request, response) => {
  const sqlUpdate = 'UPDATE user_account SET logged_in = ? WHERE email_address = ?';
  db.query(sqlUpdate, [false, request.body.email], (error, result) => {
    if(error) {
      console.log(error)
    } else {
      response.json(result)
      console.log('logged out')
    }
  })
})

// update information
app.put('/profile/update', (request, response) => {
  const values = [
    request.body.firstname,
    request.body.lastname,
    request.body.mobile,
    request.body.address,
    request.body.id
  ]
  const sqlUpdate = 'UPDATE user_account SET first_name = ?, last_name = ?, phone_number = ?, address = ? WHERE user_id = ?'
  db.query(sqlUpdate,values, (error, result) => {
    if(error){
      console.log(error)
    } else {
      response.json(result)
    }
  })
})

// update contact information
app.put('/profile/contact/update', (request, response) => {
  const values = [
    request.body.firstname,
    request.body.lastname,
    request.body.mobile,
    request.body.gender,
    request.body.address,
    request.body.email,
    request.body.status,
    request.body.id
  ]
  const sqlUpdate = 'UPDATE student SET parent_first_name = ?, parent_last_name = ?, parent_number = ?, parent_gender = ?, parent_address = ?, parent_email = ?, enrollment_status = ? WHERE student_id = ?'
  db.query(sqlUpdate,values, (error, result) => {
    if(error){
      console.log(error)
    } else {
      response.json(result)
    }
  })
})

// change email or password
app.put('/profile/update/security', async (request, response) => {
  try{
    const encryptPass = await bcrypt.hash(request.body.password, 10)
    const values = [
      request.body.email,
      encryptPass,
      request.body.id
    ]
  
    sqlCheck = 'SELECT * from user_account WHERE email_address = ?';
    sqlUpdate = 'UPDATE user_account SET email_address = ?, password = ? WHERE user_id = ? '
    db.query(sqlCheck, request.body.email, (error, result) => {
      if(error){
        console.log(error)
      } else if (result.length > 0){
        if(result[0].user_id == request.body.id){
          db.query(sqlUpdate, values, (error, result) => {
            if (error) console.log(error)
            else console.log('update success'); response.json('update success')
          })
        } else {
          response.status(409).json({message: 'This email address has already been registered.'})
        }
      } else {
        db.query(sqlUpdate, values, (error, result) => {
          if (error) console.log(error)
          else console.log('update success'); response.json('success')
        })
      }
    })
  } catch(error){
  }
})

// enrollment
app.post('/enrollment', (request, response) => {
  const values = [
    request.body.firstname,
    request.body.lastname,
    request.body.gender,
    request.body.birthdate,
    request.body.religion,
    request.body.sy,
    request.body.parent_firstname,
    request.body.parent_lastname,
    request.body.parent_gender,
    request.body.parent_number,
    request.body.parent_address,
    request.body.parent_email,
    request.body.id
  ]
  const sqlInsert = 'INSERT INTO student (student_first_name, student_last_name, gender, birthdate, religion, school_year, parent_first_name, parent_last_name, parent_gender, parent_number, parent_address, parent_email, user_id) VALUES (?)'
  
  db.query(sqlInsert,[values], (error, result) => {
    if(error) {
      console.log(error)
    } else{
      response.json('Submitted');
    }
  })
})

// get student data
app.get('/profile/student', (request, response) => {
  const sqlSelect = 'SELECT * from student WHERE user_id = ?';

  db.query(sqlSelect, userID, (error, result) => {
    if(error) {
      console.log(error)
    } else {
      response.json(result)
    }
  })
})


// email inquiry
app.post('/contact/inquiry', (request, response) => {
  const { name, number, email, subject, message } = request.body;
  console.log(name, number, email, subject, message)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'geferdgonzales1@gmail.com',
      pass: 'iljgdvylzfytwsbc'
    }
  });
  

  // Prepare email message
  const mailOptions = {
    from: email,
    to: 'geferdgonzales1@gmail.com',
    subject: subject,
    text: `Name: ${name}\nPhone Number:${number}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      response.status(500).json({ error: 'An error occurred while sending the email.'});
    } else {
      console.log('Email sent:', info.response);
      response.status(200).json({ message: 'Email sent successfully.' });
    }
  });
});


app.listen(PORT, () =>{
  console.log(`running on port ${PORT}`)
})

