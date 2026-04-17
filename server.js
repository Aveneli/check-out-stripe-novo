const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

app.get("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Produto Teste",
            },
            unit_amount: 1999,
          },
          quantity: 1,
        },
      ],
      success_url: "https://google.com",
      cancel_url: "https://google.com",
    });

    res.redirect(session.url);

  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar sessão");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
