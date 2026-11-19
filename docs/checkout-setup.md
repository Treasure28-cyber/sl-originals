# Checkout setup

## WhatsApp

Checkout defaults to the confirmed store number, `+234 904 611 6130`. To override it, set `NEXT_PUBLIC_WHATSAPP_NUMBER` in the hosting environment with country code, digits only (for example, `234` followed by the number without its leading local zero). Rebuild/redeploy after changing it. An invalid override disables submission and displays an availability message.

Customers complete contact and delivery details, then open WhatsApp with their items, sizes, colours, quantities, subtotal and delivery address prefilled. They must send the message themselves. Opening WhatsApp does not confirm payment or clear the bag. Confirm stock, delivery fees and payment instructions in the conversation.

## Paystack

1. Create a business at https://paystack.com/signup and complete the Nigerian compliance requirements in the dashboard. Choose Starter or Registered to match the business. Submit identity/BVN and bank details directly to Paystack; registered businesses also need the documents requested for their registration type.
2. Confirm final product prices, stock and delivery policy. The current payment initializer charges the product subtotal only: it does not calculate or collect shipping. Keep online payment disabled until delivery charging is settled. WhatsApp supports manual delivery quotes in the meantime.
3. Publish approved products and prices in Sanity. Configure `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
4. Add the test secret key as the server-only `PAYSTACK_SECRET_KEY` in the hosting environment, and set `NEXT_PUBLIC_SITE_URL` to the actual site's origin. Never expose the secret through a `NEXT_PUBLIC_` variable or commit it. This hosted redirect integration does not require a public key.
5. Enable `CHECKOUT_ENABLED=true` only in the environment ready for testing. Test successful, cancelled and failed payments and verification on return to `/checkout`.
6. After Paystack activates the business and testing is complete, configure the live secret key in the production host and redeploy. Confirm a real order and settlement before announcing online payment availability.

The checkout displays Paystack as “Coming soon” until its required configuration is present. Configuration readiness alone does not confirm business activation or shipping readiness.

The existing verification endpoint checks Paystack's successful NGN transaction status. Automated fulfilment requires a durable order record, expected amount/reference matching, and authenticated webhook processing; those are not part of this UI update. Verify orders in the Paystack dashboard before manual fulfilment.

Official guidance:
- https://support.paystack.com/en/articles/2123970
- https://support.paystack.com/en/articles/2125506
- https://support.paystack.com/en/articles/2123458
