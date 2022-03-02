const express = require('express');
const Joi= require('joi');
const genres = require('./routes/genres.js');
const app=express();

app.use(express.json());
app.use('/api/genres',genres);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
})


