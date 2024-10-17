const express = require('express');
const router  = express.Router();
const Celebrity = require("../models/celebrity")

/* GET celebrities page */
router.get('/celebrities', async (req, res, next) => {

    try {
        // Fetch all celebrities from the database
        const allCelebrities = await Celebrity.find();    

        // Render the 'celebrities/index' view and pass the data
        res.render('celebrities/index', { allCelebrities }); 
    } catch (error) {
        console.error('Error fetching celebrities:', error);

        // Pass the error to the next middleware (could be an error handler)
        next(error); // You can also render a custom error page if preferred
    }

});

module.exports = router;
