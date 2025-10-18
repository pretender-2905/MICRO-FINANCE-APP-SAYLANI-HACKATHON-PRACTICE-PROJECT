import axios from "axios";

export const analyzeReport = async (fileUrl) => {
  const prompt = `
  You are a medical report assistant.
  Read this report: ${fileUrl}
  Return a JSON like this:
  {
    "summary_en": "Simple English summary",
    "summary_roman_urdu": "Roman Urdu summary",
    "highlights": ["key points"],
    "abnormalities": [{"name":"WBC","value":"15","severity":"High"}],
    "suggestions": {
      "questionsForDoctor":["Question 1"],
      "diet": {"avoid":["Sugar"], "recommend":["Fruits"]},
      "homeRemedies":["Drink water"]
    }
  }`;

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
    {
      contents: [{ parts: [{ text: prompt }] }]
    }
  );

  const text = response.data.candidates[0].content.parts[0].text;
  return JSON.parse(text);
};
