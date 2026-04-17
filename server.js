const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Rota principal (teste)
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Rota que cria o checkout
app.get("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
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

    return res.redirect(303, session.url);

  } catch (error) {
    console.error("Erro Stripe:", error);
    return res.status(500).send("Erro ao criar checkout");
  }
});

// Porta correta do Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
