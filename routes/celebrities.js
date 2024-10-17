const express = require('express');
const router = express.Router();
const Celebrity = require("../models/celebrity")

/* GET celebrities page */
router.get('/celebrities', async (req, res, next) => {
    try {
        // Fetch all celebrities from the database
        const allCelebrities = await Celebrity.find();
        // Render the 'celebrities/index' view and pass the data
        return res.status(200).render('celebrities/index.ejs', { allCelebrities });
    } catch (error) {
        console.error('Error fetching celebrities:', error);
        // Pass the error to the next middleware
        return next(error);
    }
});

/* GET add new celebrity form */
router.get('/celebrities/new', (req, res, next) => {
    //render the add new celebrity form
    return res.status(200).render('celebrities/new.ejs', {
        errorMessage: ''
    })
});

/* POST new celebrity */
router.post('/celebrities', async (req, res, next) => {
    try {
        const { name, occupation, catchPhrase } = req.body;

        // Basic validation
        if (!name || !occupation || !catchPhrase) {
            // Render the form again with an error message
            return res.status(400).render('celebrities/new.ejs', {
                errorMessage: 'All fields are required.'
            });
        }

        // Create new celebrity instance and save it
        const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
        await newCelebrity.save();

        return res.status(201).redirect("/celebrities");
    } catch (error) {
        console.error('Error adding celebrity to the database:', error);
        // Pass the error to the template
        return res.status(500).render("celebrities/new.ejs", {
            errorMessage: 'An error occurred while adding the celebrity. Please try again.'
        });
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
        return res.status(200).render('celebrities/show.ejs', { oneCelebrity });
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

/* GET delete celebrity form from database */
router.get('/celebrities/:id/edit', async (req, res, next) => {
    try {
        // retrieve id from params 
        const { id } = req.params
        // find the celebrity with the id
        const oneCelebrityToEdit = await Celebrity.findById(id);

        // Check if celebrity was found
        if (!oneCelebrityToEdit) {
            return res.status(404).send('Celebrity not found');
        }

        return res.status(200).render("celebrities/edit.ejs", {
            oneCelebrityToEdit
        })
    } catch (error) {
        console.error('Error getting deletion form:', error);
        // Pass the error to the next middleware
        return next(error);
    }
});

/* POST edit and update celebrity details */
router.post('/celebrities/:id', async (req, res, next) => {

    try {
        // retrieve id from params 
        const { id } = req.params

        // Create update object
        const update = {
            name: req.body.name,
            occupation: req.body.occupation,
            catchPhrase: req.body.catchPhrase // fixed spelling here
        };

        // Update the celebrity details
        const updatedCelebrity = await Celebrity.findByIdAndUpdate(id, update, { new: true });

        if (!updatedCelebrity) {
            return res.status(404).send('Celebrity not found');
        }

        return res.status(200).redirect("/celebrities")
    } catch (error) {
        console.error('Error updating celebrity details:', error);

        // Pass the error to the next middleware
        return next(error);
    }

});


module.exports = router;
