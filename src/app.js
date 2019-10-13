const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forCast = require('./utils/forecast');

const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
   res.render('index', {
      title: 'weather',
      name: 'Akshay Patil'
   });

})

app.get('/help', (req, res) => {
   res.render('help', {
      title: 'this is help from express js'
   });
})

app.get('/weather', (req, res) => {
   if(!req.query.address) {
      return res.send({
         error: 'you need to provide the address'
      });
   }
   
   geoCode.geoCode(req.query.address, (data) => {
      forCast.getForecast(data, (forCastData) => {
         res.send({
            Details: forCastData
         })
      })
   }); 
})

app.get('/help/*', (req, res) => {
   res.render('error', {
      title: 'the article for help does not found'
   });
})

app.get('*', (req, res) => {
   res.render('error', {
      title: '404 page not found'
   });
})

// app.get('', (req, res) => {
//    res.send('Hello Express !!!');
// });

// app.get('/help', (req, res) => {
//    res.send('help for express');
// });

// app.get('/about', (req, res) => {
//    res.send('<h1>About Express</h1>');
// });

// app.get('/weather', (req, res) => {
//    res.send({
//        location: 'India'
//        ,
//        Temperature: 26.8
//    });
// });


app.listen(3000, () => {
    console.log('server is running on port 3000');
});

