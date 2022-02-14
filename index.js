const express = require('express');
const Joi= require('joi');


const app=express();
app.use(express.json());


const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
    { id: 4, name: 'Spiritual' },  
  ];
  
app.get('/', (req, res) => {
    res.send('Hello Vidly :)');
});
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('The genre with the given id is not found'); //404 object not found
    
    res.send(genre);
})

app.get('/api/genres', (req, res) => {
    res.send(genres);
})
app.post('/api/genres', (req, res) => { 
    const { error } = validateGenre(req.body);
    if(error) { return res.status(400).send(error.details[0].message); }
    const genre = {
           id:genres.length+1, 
           name : req.body.name
       };
    
       genres.push(genre);
       res.send(genre);
    
    });

    app.put('/api/genres/:id', (req, res)=>{
        const genre = genres.find(c => c.id === parseInt(req.params.id))
            if(!genre) return res.status(404).send('The genre with the given id is not found'); //404 object not found
        const { error } = validateGenre(req.body);
        if(error) {
          
            return res.status(400).send(error.details[0].message);
        }
        
        // Update genre 
        genre.name = req.body.name;
        // Return the updated genre
        res.send(genre);
        
        
        });

        app.delete('/api/genres/:id', function(req, res) {
            // Look up the genre 
            // Not exisitng , return 404
            const genre = genres.find(g => g.id === parseInt(req.params.id))
            if(!genre) return res.status(404).send('The genre with the given id is not found'); //404 object not found
        
            // Delete
            const index=genres.indexOf(genre);
            genres.splice(index, 1);
            // Return the same genre
            res.send(genre);
        });
        

function validateGenre(genre){
    const schema =Joi.object({
    
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
})


