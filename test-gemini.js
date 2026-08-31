const fs = require('fs');
const apiKey = process.env.GEMINI_API_KEY;
fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{ role: "user", parts: [{ text: "Hello" }] }],
    systemInstruction: { role: "user", parts: [{ text: "Be nice" }] }
  })
}).then(res => res.text()).then(console.log).catch(console.error);
