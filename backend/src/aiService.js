import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export const getAiRecommendation = async (userMessage, vehicleContext, partsInventory) => {
  const systemPrompt = `Ti si ekspert avto-mehanik s 20 godini opit. Pomagash na hora, koito ne razbirat ot koli, da izberат pravilnite chasti.

  PRAVILA:
  1. Govor prosto i dostapno.
  2. Predlagay 2-3 alternatiви ОТ СПИСЪКА с части.
  3. Vinagi vrashchay otgovora v STRIKTEN JSON sus slednitе poleta:
     - diagnosis (tekst)
     - recommendations (masiv ot obekti: { partId, brand, price, reason })
     - diy_difficulty (tekst)
     - estimated_labor_cost (tekst)
  
  Vehicle context: ${JSON.stringify(vehicleContext)}
  Available parts: ${JSON.stringify(partsInventory?.slice(0, 10))}`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });

    const text = response.content[0].text;
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);

  } catch (error) {
    console.error('AI error:', error.message);
    // Mock fallback
    return {
      diagnosis: 'Въз основа на симптомите — вероятно изкривени спирачни дискове.',
      recommendations: [
        { partId: 'BRK-123', brand: 'Brembo', price: 185, reason: 'Най-добро качество' },
        { partId: 'BRK-456', brand: 'Zimmermann', price: 142, reason: 'Отлично немско качество' },
      ],
      diy_difficulty: 'Висока — изисква специализиран инструмент',
      estimated_labor_cost: '60-90 лв.',
    };
  }
};
