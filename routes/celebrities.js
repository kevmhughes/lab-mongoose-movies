const express = require('express');
const router = express.Router();
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

        // Pass the error to the next middleware
        next(error); 
    }

});

/* GET celebrity details page */
router.get('/celebrities/:id', async (req, res, next) => {

    try {
        // retrieve id from params 
        const { id } = req.params
        // find the celebrity with the id
        const oneCelebrity = await Celebrity.findById(id);

        // Render the 'celebrities/show' view and pass the data
        res.render('celebrities/show', { oneCelebrity });
    } catch (error) {
        console.error('Error fetching celebrity:', error);

        // Pass the error to the next middleware
        next(error); 
    }

});

module.exports = router;
