const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'mystyle' folder
app.use(express.static(path.join(__dirname, 'mystyle')));

// Middleware to check working hours 
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  // Condition: Monday to Friday, 9 AM - 5 PM
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('Our services are available only during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
};

// Routes to render EJS templates
app.get('/home', checkWorkingHours, (req, res) => {
  res.render('home');
});

app.get('/services', checkWorkingHours, (req, res) => {
  res.render('services');
});

app.get('/contact', checkWorkingHours, (req, res) => {
  res.render('contact');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
