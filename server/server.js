const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');

const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

//added cors, stripe, and uuid package require
const cors = require('cors');
const stripe = require("stripe")("sk_test_51MGrrMGOjaM3BjiY3TFlFLvqHcI2IBrbL7dtQG54aGM25puLQemlsuHz1Fj6womNPQwkg76SC2V97xwvd92q6y4x00cpJ2aqI4");
const { v4: uuidv4 } = require('uuid');


const app = express();

//add app.use for cors
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//begin stripe code for backend
router.get('/', (req, res, next) => {
  console.log("Get Response From Researcher");
  res.json({
    message: 'It Works'
  });
});

router.post("/pay", (req, res, next) => {
  console.log(req.body.token);
  const {token, amount} =req.body;
  const idempotencyKey = uuidv4();

  return stripe.customers.create({
    email: token.email,
    source: token
  }).then(customer=>{
      stripe.charges.create({
          amount: amount * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email
      }, {idempotencyKey})
    }).then(result => {
      res.status(200).json(result)
    }).catch(err => {
      console.log(error);
    });
});
//end stripe code for backend
   
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };

  //not sure if this conflicts with 40-45 above but sets up backend to listed at port 5000
// app.listen(5000, () => {
//   console.log("Back End listening on port 5000...");
// })

  // Call the async function to start the server


startApolloServer(typeDefs, resolvers);

