import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { toast } from 'react-hot-toast';
import AuthContext from '../../../../Context/AuthContext';
import { PricePlanCard } from './PricePlanCard';

export const TalentRequestPlanCards = ({ setOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const [isBuying, setIsBuying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('payment Pending');
  const {
    refreshPlan,
    setRefreshPlan,
    refresh,
    setRefresh,
    handleStartupRequests,
    startupDetails,
    startupRequests,
  } = useContext(AuthContext);
  const [price, setPrice] = useState(0);
  const [type, setType] = useState('');

  const handlePaymentSuccess = async (details, data) => {
    let searchLimit;

    if (type === 'STARTER') {
      searchLimit = 7;
    } else if (type === 'TEAM') {
      searchLimit = 50;
    } else if (type === 'BUSINESS') {
      searchLimit = 100;
    } else {
      searchLimit = 0;
    }

    const requestBody = {
      startupEmail: user.user.email,
      payer: {
        address: { country: details.payer.address.country_code },
        email: details.payer.email_address,
        name: `${details.payer.name.given_name} ${details.payer.name.surname}`,
        id: details.payer.payer_id,
      },
      amount: {
        currency: details.purchase_units[0].amount.currency_code,
        value: details.purchase_units[0].amount.value,
      },
      paymentSource: data.payment_source,
      tier: `tier${type}`,
      transactionId: data.orderID,
      searchLimit,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/payment-details`,
        requestBody
      );
      if (response.data.modifiedCount) {
        // Swal.fire(`Payment Successful for ${type} plan `, ` Thanks for being with us.
        // Your Order id is ${data.orderID}.
        // Please check your payment dashboard for details.
        // `, 'success');
        Swal.fire({
          title: `Payment Successful for ${type} plan`,
          html: `Thanks for being with us.<br>Your Order ID is <strong>${data.orderID}</strong>.<br>Please check your <strong>payment dashboard </strong> for details.`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK',
        });
        setOpen(false);
        handleStartupRequests();
        setRefreshPlan(!refreshPlan);
        setRefresh(!refresh);
      }

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    //
    // console.log(`Payment for successful!`);
    // setPaymentStatus(`Payment Successful for ${type} plan. Your OrderId ${data.orderID}`);
    // console.log(details);
    // console.log(data);
  };

  const handlePaypalButton = (value, planType) => {
    setPrice(value);
    if (
      startupDetails?.talentRequestPaymentDetails.tier === 'tierFREE' ||
      startupRequests?.requestsInCurrentTier?.length ===
        startupDetails?.talentRequestPaymentDetails?.searchLimit
    ) {
      setIsBuying(true);
    } else {
      toast.error('You already have a plan. Please upgrade your plan (coming soon...).');
      setIsBuying(false);
      return;
    }
  
    setType(planType);
    setIsBuying(true);
  };
  const handleCreateOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price,
          },
        },
      ],
    });

  const handleApprove = (data, actions) =>
    actions.order.capture().then((details) => {
      handlePaymentSuccess(details, data);
    });

  const handleError = (error) => {
    console.error(error);
    setPaymentStatus('Payment failed.');
  };

  const PlanCardsData = [
    {
      itemType: 'STARTER',
      price: 10,
      itemColor: '#19a5ff',
      borderColor: 'border-[#30d7ff]',
      description: {
        searches: '7 Searches',
        fullDescription: `is counted as number
            of independent search you can make`,
      },
      featuresLists: [
        {
          availability: true,
          name: 'Basic filtering options based on location, skill set, and experience level',
        },
        {
          availability: true,
          name: 'Access to all your search histories and results',
        },
        {
          availability: true,
          name: 'Send interview requests to matched talents, manage interviews in one place',
        },
        {
          availability: false,
          name: 'Access to only  a pool of pre-vetted and highly skilled talents',
        },
        {
          availability: false,
          name: 'Customized matching algorithms that take into account company culture and preferences',
        },
      ],
    },
    {
      itemType: 'TEAM',
      price: 29,
      itemColor: '#ff9900',
      borderColor: 'border-[#fcbc5c]',
      description: {
        searches: '50 Searches',
        fullDescription: `is counted as number
            of independent search you can make`,
      },
      featuresLists: [
        {
          availability: true,
          name: 'Basic filtering options based on location, skill set, and experience level',
        },
        {
          availability: true,
          name: 'Access to all your search histories and results',
        },
        {
          availability: true,
          name: 'Send interview requests to matched talents, manage interviews in one place',
        },
        {
          availability: true,
          name: 'Access to only  a pool of pre-vetted and highly skilled talents',
        },
        {
          availability: false,
          name: 'Customized matching algorithms that take into account company culture and preferences',
        },
      ],
    },
    {
      itemType: 'BUSINESS',
      itemColor: '#ff1830',
      borderColor: 'border-[#ff1830]',
      price: 39,
      description: {
        searches: '100 Searches',
        fullDescription: `is counted as number
            of independent search you can make`,
      },
      featuresLists: [
        {
          availability: true,
          name: 'Basic filtering options based on location, skill set, and experience level',
        },
        {
          availability: true,
          name: 'Access to all your search histories and results',
        },
        {
          availability: true,
          name: 'Send interview requests to matched talents, manage interviews in one place',
        },
        {
          availability: true,
          name: 'Access to only  a pool of pre-vetted and highly skilled talents',
        },
        {
          availability: true,
          name: 'Customized matching algorithms that take into account company culture and preferences',
        },
      ],
    },
  ];

  return (
    <div>
      {!isBuying ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-10">
          {PlanCardsData?.map((item) => (
            <PricePlanCard
              key={item.itemType}
              itemType={item.itemType}
              price={item.price}
              itemColor={item.itemColor}
              borderColor={item.borderColor}
              description={item.description}
              handlePaypalButton={handlePaypalButton}
              featuresLists={item.featuresLists}
            />
          ))}
        </div>
      ) : (
        <div className="lg:w-[750px] md:w-[550px]  400:w-[350px] 300:w-[250px] w-full   pt-24">
          <PayPalButtons
            createOrder={handleCreateOrder}
            onApprove={handleApprove}
            onError={handleError}
            style={{
              color: 'gold',
              shape: 'rect',
              label: 'paypal',
              height: 55,

              disableMaxWidth: true,
              layout: 'vertical',
            }}
            options={{
              clientId: 'YOUR_PAYPAL_CLIENT_ID',
              currency: 'USD',
            }}
          />
          <div className="text-center mt-10"> {paymentStatus}</div>
        </div>
      )}
    </div>
  );
};
