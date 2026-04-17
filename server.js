const express = require("express");
const Stripe = require("stripe");

const app = express();
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: {
            name: "Produto Teste",
          },
          unit_amount: 1999,
        },
        quantity: 1,
      }],
      success_url: "https://seusite.com/sucesso",
      cancel_url: "https://seusite.com/cancelado",
    });

    res.json({ url: session.url });

  } catch (error) {
    res.status(500).json({ error: error.message });
    app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});
  }
});

app.listen(3000, () => console.log("Servidor rodando"));
