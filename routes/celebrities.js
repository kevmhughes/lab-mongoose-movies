const express = require('express');
const router = express.Router();
const Celebrity = require("../models/celebrity")

/* GET celebrities page */
router.get('/celebrities', async (req, res, next) => {

    try {
        // Fetch all celebrities from the database
        const allCelebrities = await Celebrity.find();

        // Render the 'celebrities/index' view and pass the data
        return res.status(200).render('celebrities/index', { allCelebrities });
    } catch (error) {
        console.error('Error fetching celebrities:', error);

        // Pass the error to the next middleware
        return next(error);
    }

});

/* GET add new celebrity form */
router.get('/celebrities/new', (req, res, next) => {
    //render the add new celebrity form
    return res.render('celebrities/new')
});

/* POST new celebrity */
router.post('/celebrities', async (req, res, next) => {

    try {
        const { name, occupation, catchPhrase } = req.body

        // Basic validation
        if (!name || !occupation || !catchPhrase) {
            // Render the form again with an error message
            return res.status(400).render('celebrities/new', {
                errorMessage: 'All fields are required.'
            });
        }

        // add new celebrity to the database
        await newCelebrity.save();

        return res.status(200).redirect("/celebrities")

    } catch (error) {
        console.error('Error adding celebrity to the database:', error);

        // Pass the error to the next middleware
        return res.render("celebrities/new")
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
        return res.status(200).render('celebrities/show', { oneCelebrity });
    } catch (error) {
        console.error('Error fetching celebrity:', error);

        // Pass the error to the next middleware
        return next(error);
    }

});

/* POST delete celebrity from database */
router.post('/celebrities/:id/delete', async (req, res, next) => {

    try {
        // retrieve id from params 
        const { id } = req.params

        // find the celebrity with the id
        const oneCelebrity = await Celebrity.findByIdAndRemove(id);
 
        if (!oneCelebrity) {
            // If no celebrity is found with that id, respond with 404 Not Found
            return res.status(404).send('Celebrity not found');
        }

        return res.status(200).redirect('/celebrities');
    } catch (error) {
        console.error('Error deleting celebrity:', error);

        // Pass the error to the next middleware
        return next(error);
    }


});


module.exports = router;
