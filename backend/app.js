const express = require('express');
const app = express();
const admin = require('./node_modules/firebase-admin');


app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'js');


app.get('/', (req, res) => {
  res.send('Hello World!');
});
// Define the endpoint to receive customer review data
app.post('/api/customer-review', (req, res) => {
  const data = req.body;

  // Save the data to a Firebase database collection
  const reviewsRef = admin.firestore().collection('customer-reviews');
  reviewsRef.add(data)
    .then((docRef) => {
      console.log(`Document written with ID: ${docRef.id}`);
      res.status(200).send('Review submitted successfully!');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      res.status(500).send('Error adding document!');
    });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:4000/api/customer-review');
});
