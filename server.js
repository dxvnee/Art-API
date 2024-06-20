const express = require('express');
const mongoose = require('mongoose');
const creoRoute = require('./routes/creo.route.js');
// const ngrok = require('ngrok');



const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/creo', creoRoute);


mongoose.connect("mongodb+srv://dxvnee:DTuzSPD1ip0vDr1C@creopediadb.cdylyrm.mongodb.net/Creo-API?retryWrites=true&w=majority&appName=CreopediaDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database!');
        const PORT = 3600
        app.listen(PORT, () => {
            console.log('Server started on port 3000');

            // ngrok.connect(PORT).then(ngrokUrl => {
            //     console.log(`Ngrok tunnel in: ${ngrokUrl}`)
            // }).catch(error => {
            //     console.log(`Couldn't tunnel ngrok: ${error}`)
// }
        });
})
    .catch((error) => {
        console.error('Connection failed!', error);
    }
);

module.exports = app;

