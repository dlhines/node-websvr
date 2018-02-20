const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

// Starts Express System
var app = express();

// Grants the ability to use partial templates in Handlebars
hbs.registerPartials(__dirname + '/views/partials');

// Sets the view_engine to Handlebars
app.set('view_engine', 'hbs');

// Middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}  ${req.originalUrl} ${req.ip}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n', (err) => {
    if (err) {
      console.log("cant save file to log");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// Sets the working directory for everything like images, js code, and css
// In order for any maintenance page to work correctly this would need to be placed after it

app.use(express.static(__dirname + '/public_html'));

// Registers Handlebar helpers for functions and whatnots
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// Actual Routes
app.get('/', (req, res) => {
  res.render('default.hbs', {
    pageTitle: 'Index Page',
    pageBody: 'some body text',
  });
});

app.get('/about', (req, res) => {
  res.render('default.hbs', {
    pageTitle: 'About Page',
    pageBody: 'some body text concerning about this site',
  });
});

app.get('/contact', (req, res) => {
	 res.render('default.hbs', {
	 pageTitle: 'Contact Page',
	 pageBody: 'some body text',
  });
});

// Starts Engine and listens on assigned port
app.listen(port, () => {
  console.log(`Server Up - ${port}`);
});
