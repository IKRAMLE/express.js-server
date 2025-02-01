const express = require('express');
const app = express();
const path = require('path');

//This tells Express to serve static files (HTML, CSS, images, etc.)
app.use(express.static(__dirname));

// Middleware to check working hours 
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

// condition  1<=day<= 5  9<=hour<17
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('Our services are available only during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
};

// Routes to serve HTML files

app.get('/home', checkWorkingHours, (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/services', checkWorkingHours, (req, res) => {
  res.sendFile(path.join(__dirname, 'services.html'));
});

app.get('/contact', checkWorkingHours, (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
