# Fast React Pizza Co.

A Simple Pizza Ordering App

# Description

A user-friendly application designed to make pizza ordering experience as simple as possible.

# How it works

Orders are made by sending a POST request with the order data (user data + selected pizzas) to the API. The API responds with a unique order ID which is then display to the user.

# Features

-No Account Required: Just input your name and you’re ready to order.
-Dynamic Menu: Our pizza menu is loaded from an API.
-Easy Ordering: Add multiple pizzas to your cart and place your order with just your name, phone number, and address. If possible, provide your GPS location for easier delivery.
-Priority Orders: Mark your order as “priority” for an additional 20% of the cart price and we’ll get your pizza to you as fast as possible.
-Post-Order Modifications: Changed your mind? You can mark your order as “priority” even after it has been placed.
-Payment on Delivery: No need to enter credit card information. Just pay when your pizza arrives.
-Unique Order ID: Every order gets a unique ID, so you can easily look up your order later.

# Pages

Homepage: `/`
Menu:`/menu`
Cart: `/cart`
Placing a new order: `/order/new`
Looking up an order: `/order/:orderID`

# State Management

1.User: Global UI state (No accounts)
2.Menu: Global remote state (Menu fetched from API)
3.Cart: Global UI state
4.Order: Global remote state (Fetched and submitted to API)

# Technologies used

1.Routing: [React Router](https://reactrouter.com/en/main)
2.Styling: [TailwindCSS](https://tailwindcss.com/)
3.Remote State Management: [React Router](https://reactrouter.com/en/main/start/overview)
4.UI State Management: [Redux Toolkit](https://redux-toolkit.js.org/)

# Live Preview

You can preview the live application [here](https://fastreactpizzadelivery.netlify.app)
