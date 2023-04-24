const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('./config.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Define the endpoint to receive customer review data
app.post('/api/customer-review', (req, res) => {
  const data = req.body;

  // Save the data to a Firebase database collection
  const db = admin.firestore();
  db.collection('customer-reviews').add(data)
    .then((docRef) => {
      console.log(`Document written with ID: ${docRef.id}`);
      res.status(200).send('Review submitted successfully!');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      res.status(500).send('Error adding document!');
    });
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
