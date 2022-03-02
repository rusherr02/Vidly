const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
    { id: 4, name: 'Spiritual' },  
  ];
  
router.get('/', (req, res) => {
    res.send('Hello Vidly :)');
});
router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send('The genre with the given id is not found'); //404 object not found
    
    res.send(genre);
})

router.get('/', (req, res) => {
    res.send(genres);
})
router.post('/', (req, res) => { 
    const { error } = validateGenre(req.body);
    if(error) { return res.status(400).send(error.details[0].message); }
    const genre = {
           id:genres.length+1, 
           name : req.body.name
       };
    
       genres.push(genre);
       res.send(genre);
    
    });

    router.put('/:id', (req, res)=>{
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

        router.delete('/:id', function(req, res) {
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


moduel.exports = router;