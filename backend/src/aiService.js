import 'dotenv/config'; 
import Anthropic from '@anthropic-ai/sdk';

console.log("--------------------------------");
console.log("Проверка на конфигурацията:");
console.log("Ключ от .env:", process.env.ANTHROPIC_API_KEY ? "✅ Намерен" : "❌ ЛИПСВА (undefined)");
console.log("--------------------------------");

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Функция за получаване на препоръка от AI механика
 */
export const getAiRecommendation = async (userMessage, vehicleContext, partsInventory) => {
  const systemPrompt = `Ти си експерт авто-механик с 20 г. опит. Помагаш на хора, които не разбират от коли, да изберат правилните части.
  
  КОНТЕКСТ НА АВТОМОБИЛА: ${JSON.stringify(vehicleContext)}
  НАЛИЧНИ ЧАСТИ В ИНВЕНТАРА: ${JSON.stringify(partsInventory)}
  
  ИНСТРУКЦИИ:
  1. Обяснявай на прост, достъпен език.
  2. Предлагай 2-3 алтернативи САМО от НАЛИЧНИТЕ ЧАСТИ горе.
  3. Винаги връщай отговора в СТРИКТЕН JSON формат със следните полета:
     - diagnosis (текст)
     - recommendations (масив от обекти: { partId, brand, price, reason })
     - diy_difficulty (текст)
     - estimated_labor_cost (текст)`;

  try {
    // Опит за реално извикване на Claude
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const content = response.content[0].text;
    return JSON.parse(content);

  } catch (error) {
    // АКО ИМА ГРЕШКА (напр. няма кредити), ВРЪЩАМЕ ТЕСТОВИ ДАННИ:
    console.error("AI Service Error (Claude):", error.message);

    if (error.message.includes("credit balance") || error.status === 400) {
      console.log("⚠️ Връщам MOCK данни за тест на фронтенда...");
      return {
        diagnosis: "Въз основа на симптомите (тресене при спиране), вероятно имате изкривени предни спирачни дискове. Това е често срещан проблем при BMW F30 след продължителна употреба.",
        recommendations: [
          { 
            partId: "BRK-123", 
            brand: "Brembo High-Performance", 
            price: 185.20, 
            reason: "Най-високо качество и устойчивост на кривене." 
          },
          { 
            partId: "BRK-456", 
            brand: "Zimmermann Coat Z", 
            price: 142.00, 
            reason: "Отлична антикорозионна защита и немско качество." 
          }
        ],
        diy_difficulty: "Висока - изисква специализиран динамометричен ключ и опит.",
        estimated_labor_cost: "60 - 90 лв. за двата диска"
      };
    }

    // Ако грешката е друга, връщаме стандартното съобщение
    return { 
      error: "В момента имам проблем с анализа. Моля, опитай пак след малко.",
      details: error.message 
    };
  }
};