// Import packages
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

// Import functions/components from our application
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

// Set Port
const PORT = process.env.PORT || 3001;
// Set the server to reference to typeDefs and Resolvers for back end functionality
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

//added cors, stripe, and uuid package require
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51MGrrMGOjaM3BjiY3TFlFLvqHcI2IBrbL7dtQG54aGM25puLQemlsuHz1Fj6womNPQwkg76SC2V97xwvd92q6y4x00cpJ2aqI4"
);
const { v4: uuidv4 } = require("uuid");

// Use express
const app = express();

//add app.use for cors
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Get file built for deployment
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//begin stripe code for backend
app.get("/", (req, res, next) => {
  console.log("Get Response From Researcher");
  res.json({
    message: "It Works",
  });
});

// Accept dummy payments through Stripe, assigning route
app.post("/pay", (req, res, next) => {
  console.log(req.body.token);
  const { token, amount } = req.body;
  const idempotencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: amount * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
        },
        { idempotencyKey }
      );
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(error);
    });
});
//end stripe code for backend

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);