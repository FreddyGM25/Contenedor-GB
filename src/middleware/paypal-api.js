const fetch = require('node-fetch')
require("dotenv").config()

const CLIENT_ID = process.env.CLIENT_ID
const APP_SECRET = process.env.APP_SECRET

const base = "https://api-m.sandbox.paypal.com";

async function createOrder(monto) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: monto,
          },
        },
      ],
    }),
  });

  return handleResponse(response);
}

async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
}

async function detailsSubs(billing_plan_id) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v1/billing/plans/${billing_plan_id}`;
  const response = await fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
  })
  return handleResponse(response);
}

async function suspendSubs(id) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v1/billing/subscriptions/${id}/cancel`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      'reason': 'No quiero seguir con la suscripcion'
    })
  })

  return response.status
}


async function generateAccessToken() {
  const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201 || response.status === 204) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}

module.exports = { createOrder, capturePayment, detailsSubs, suspendSubs }
