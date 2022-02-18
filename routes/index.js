//Much like the API folder's index.js file that collects the endpoints and prefixes them, here we are collecting the packaged group of API endpoints and prefixing them with the path /api. 

const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// if we make a request to any endpoint that doesn't exist, we'll receive a 404 error
router.use((req, res) => { 
    res.status(404).end();
});

module.exports = router;

// When the routes are imported to server.js they will already be packaged and ready to go with this one file.