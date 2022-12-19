import React from 'react';

import axios from 'axios';
import Stripe from "react-stripe-checkout";


function StripeApp() {
    handleToken = (totalAmount, token) => {
        try {
            axios.post("http://localhost:5000/api/stripe/pay", {
              token: token.id,
              amount: totalAmount
            }),
        //why is curly bracket underlined?    
        } catch (error) {
            console.log(error);
        };     
    }
  
    const tokenHandler = (token) => {
        handleToken(100, token);
    }
        return (
          <div>
              <Stripe
                  stripeKey="pk_test_51MGrrMGOjaM3BjiY3O8ovI4OBkD0Ro0OuBQ9zAOj8mtE16fTwrEc0HPeL8c7cmFiIc6PAlZ9VbLkj4E1GIwBreDc00ZDLzmw94"
                  token={tokenHandler}
              />
          </div>
        );
  }