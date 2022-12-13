# Ecommerce Platform

It’s a full-stack e-commerce platform which was designed for businesses that sell products in multiple quantities. Users can quickly scan through the list of products and add them to the cart without opening a specific’s product page each time. Some people say that it’s a must-have in a developer's portfolio. And I must say that I’ve learned a lot while building it.

For presentation purposes, I decided to fill the deployed version of the shop with vegetables and fruits as products. That is where the name Veggies & Fruits comes from.

## Features and elements

### Client-side

The products list is the main application view. Users can easily search for the desired product using a category filter and search bar. Filtering works very fast and without contacting the server.
Users can add and remove products directly from the list view or from each product subpage.

![list view](http://localhost:3000/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F9lwq5y1zam6x%2F68Ysrs2zCdpR9Oy0wZl0xz%2F7ba38721bf0ef10f1205d6ff6a865c01%2Fproduct_list.jpg&w=2048&q=75 "list view")

To make the order users have to open the cart view, where again, they can edit the amount of each product and confirm the order.

![confirm order](https://images.ctfassets.net/9lwq5y1zam6x/6ulecq7KUO5U0fen4u5R3g/1d2d89d1551396cf0728e029c58236a4/cart.jpg "confirm order")

The next step is to decide if users would like to create a new account in the shop or make an order without the account. Authentication is possible using Google Account. Then the user has to decide if the order should be shipped or if they would like to pick it up by themselves. All the options and steps are easy to understand as the interface guides through the process.

![checkout](https://images.ctfassets.net/9lwq5y1zam6x/6JAZRCsCegVUIkrrc5lLkh/ebda0be3a928f5b975fc77c1ca1437ef/checkout_delivery.jpg "checkout")

The final step is payment. Each transaction can be payed using Stripe payments. For demonstration purposes, it is set in test mode so you can easily pay using a test card (test card data is available at this step). After a successful payment the order’s status is changed.

If the user decided to log in, the order and its status are available on the user’s profile page.

### Admin side

Admin panel is available only for logged-in users who’s role in the database is set to “ADMIN”.

![admin edit product](https://images.ctfassets.net/9lwq5y1zam6x/1wFCdM3tx34a11o79VJ2bm/c9d01725f3e656591ba73eef679bdea1/admin_edit.jpg "admin edit product")

Admins can add, edit and remove products. There is also a list of all the orders where Admins can change each order’s status, for example from “paid” to “send”.

## Features

- Authentication is built using Next Auth. Users do not have to create and remember a new password as it is possible to login using Google Account. Credential login is possible for the admin account only. If a new user is logging in a new user is created in the database.
- Database - Prisma is used to handle everything related to the database. I’m using Supabase and Postgres in the deployed version. All needed API routes are implemented using Prisma Client. For routes that are available only for admin users, an additional check is performed using Next Auth.
- Image processing - I’m using Google Cloud Storage and Imgix to deliver all the product images. New images are saved using imgix API.
- The payment functionality is implemented using Stripe. Right now it is in test mode so you can “pay” for the order using a test card 4242 4242 4242 4242. It is also mentioned during the checkout process.
- Animations and micro-interactions are coded using Framer Motion.

## Design and interface

I designed the whole application by myself. I’ve created many UI components that are being reused throughout the project. Most of the elements were first designed in Figma and then coded.
The whole interface is meant to be mobile-first, thus I focused more on narrow screens.
I used Radix Color system to make the application’s interface easy to understand and also to limit the number of design decisions I had to make. I used https://fontjoy.com/ to choose fonts that are looking good together.

## How to test it?

Go ahead and open the deployed version at https://ecommerce.wiwoproduction.com/
Add some products to the cart, go through the checkout process and pay using the test card.
If you would like to get access to the admin account, reach out to me.

## Final thoughts

The goal of this project definitely wasn’t to compete with Shopify or any other established ecommerce platform but rather to help me understand the details of the online shopping process and its implementation. There is plenty of complex and much better solutions on the market.
Working on this project definitely let me learn plenty of new things and completing it brought a lot of satisfaction as it required a lot of time and commitment.
