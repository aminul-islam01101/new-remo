import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import React from 'react';

const PaypalPaymentConfigs = ({ price }) => {
  const handlePaymentSuccess = async (details, data) => {
    try {
      const response = await axios.post('/api/payments/success', {
        details,
        data,
        price,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <PayPalButtons
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price,
                },
              },
            ],
          })
        }
        onApprove={(data, actions) =>
          actions.order.capture().then((details) => {
            handlePaymentSuccess(details, data);
          })
        }
        options={{
          clientId: 'YOUR_PAYPAL_CLIENT_ID',
          currency: 'USD',
        }}
      />
    </div>
  );
};

export default PaypalPaymentConfigs;
