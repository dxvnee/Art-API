const express = require('express');
const mongoose = require('mongoose');
const artRoute = require('./routes/art.route.js');
// const ngrok = require('ngrok');



const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/art', artRoute);

app.get('/', (req, res) => {
    res.send('Art API running...');
});


mongoose.connect("mongodb+srv://dxvnee:DTuzSPD1ip0vDr1C@artpediadb.cdylyrm.mongodb.net/Art?retryWrites=true&w=majority&appName=CreopediaDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database!');
        const PORT = process.env.PORT || 3800;
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

