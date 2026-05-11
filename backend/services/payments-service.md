# Payments Service

## Провайдери
- **Stripe** — карти, международно
- **ePay.bg** (опционално) — за български клиенти, които предпочитат банков трансфер
- **COD (наложен платеж)** — през Еконт/Спиди

## Stripe flow

```ts
// 1. Frontend → POST /api/checkout { items, shippingAddress, provider }
// 2. Backend:
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: items.map(toStripeLineItem),
  success_url: `${APP_URL}/orders/{CHECKOUT_SESSION_ID}/success`,
  cancel_url: `${APP_URL}/cart`,
  metadata: { orderId, userId },
  shipping_options: [...],
});
// → return session.url
// 3. Frontend redirect към Stripe
// 4. След плащане → webhook
```

## Webhook handler

```ts
@Post('/api/webhooks/stripe')
async stripeWebhook(req) {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(
    req.rawBody, sig, STRIPE_WEBHOOK_SECRET  // CRITICAL: verify
  );

  switch (event.type) {
    case 'checkout.session.completed':
      await orders.markPaid(event.data.object.metadata.orderId);
      await shipping.createShipment(orderId);  // авто-генерира товарителница
      break;
    case 'charge.refunded':
      await orders.markRefunded(...);
      break;
  }
}
```

## Сигурност
- Винаги verify webhook signature
- Никога не доверявай suma/items от frontend — преизчислявай on backend
- Idempotency — webhook може да дойде повече от веднъж
