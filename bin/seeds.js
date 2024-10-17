const Celebrity = require("../models/celebrity")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

const celebrities = [
    {
        name: "Dwayne Johnson",
        occupation: "Actor",
        catchPhrase: "Can you smell what The Rock is cooking?"
    },
    {
        name: "Adele",
        occupation: "Singer",
        catchPhrase: "Hello from the other side."
    },
    {
        name: "Elon Musk",
        occupation: "Entrepreneur",
        catchPhrase: "When something is important enough, you do it even if the odds are not in your favor."
    }
];

// Async function to insert celebrities
async function insertCelebrities() {
    try {
        await Celebrity.create(celebrities); // Use await for insertion
        console.log("Celebrities inserted successfully!");
    } catch (err) {
        console.error("Error inserting celebrities:", err);
    } 
}

insertCelebrities()