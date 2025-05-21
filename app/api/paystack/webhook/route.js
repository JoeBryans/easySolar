// import { buffer } from "micro"; // Helps read raw body for webhook verification
// import crypto from "crypto";
// import Paystack from "paystack";

// // Initialize Paystack with your secret key
// const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

// // Disable default bodyParser to access the raw request body for signature verification
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// async function webhookHandler(req, res) {
//   if (req.method === "POST") {
//     const secret = process.env.PAYSTACK_SECRET_KEY;
//     const signature = req.headers["x-paystack-signature"];

//     // Get the raw body buffer
//     const rawBody = await buffer(req);
//     const body = rawBody.toString();

//     // Verify the signature
//     const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");

//     if (hash === signature) {
//       const event = JSON.parse(body);

//       console.log(`Received Paystack Webhook Event: ${event.event}`);

//       switch (event.event) {
//         case "charge.success":
//           // Payment was successful!
//           console.log("Webhook: Charge successful", event.data);
//           // THIS IS WHERE YOU SHOULD FULFILL THE ORDER, UPDATE YOUR DATABASE, ETC.
//           // Use event.data.reference to identify the transaction.
//           // Make sure to handle idempotency (don't process the same event twice).
//           break;
//         case "charge.failed":
//           // Payment failed
//           console.log("Webhook: Charge failed", event.data);
//           // Update payment status in your DB, notify user, etc.
//           break;
//         case "transfer.success":
//           // A transfer to a bank account was successful
//           console.log("Webhook: Transfer successful", event.data);
//           break;
//         case "transfer.failed":
//           // A transfer to a bank account failed
//           console.log("Webhook: Transfer failed", event.data);
//           break;
//         // Add other event types you want to handle (e.g., 'refund.success', 'subscription.create')
//         default:
//           console.log("Webhook: Unhandled event", event.event);
//           break;
//       }

//       res.status(200).send("Webhook received successfully");
//     } else {
//       console.error(
//         "Webhook signature mismatch. Request likely not from Paystack."
//       );
//       res.status(400).send("Invalid signature");
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// export default webhookHandler;
