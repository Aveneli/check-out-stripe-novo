const express = require("express");
const Stripe = require("stripe");

const app = express();
app.use(express.json());

// 🔐 pega a chave da variável de ambiente
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ ROTA DE TESTE (abre no navegador)
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// 💳 ROTA QUE CRIA O CHECKOUT
app.post("/create-checkout-session", async (req, res) => {
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
            unit_amount: 1999, // €19.99
          },
          quantity: 1,
        },
      ],

      success_url: "https://seusite.com/sucesso",
      cancel_url: "https://seusite.com/cancelado",
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// 🚀 porta correta pro Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
