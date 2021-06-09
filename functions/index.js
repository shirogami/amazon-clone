const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')
    ('sk_test_51J05d0SIggL8bTZ2BmNP7G3oIvXsv7yuEVlReC77nkwCvH5H5bdGgbAmLtrv8W6eNtEb6FOEUiXDeoTLXL61yGP600zZIk4bTK');


// Following comment defines a setup for an API

// -- App config
const app = express();

//--  Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// -- API routes
app.get('/', (request, response) => response.status(200).send('hello world'));
// app.get('/ashish', (request, response) => response.status(200).send('ashish'));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('payment request recieved >>>', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency
        currency: "inr"
    })

    // OK -Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    });
});


// -- Listen command

exports.api = functions.https.onRequest(app);

// example end point
// http://localhost:5001/clone-55044/us-central1/api




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
