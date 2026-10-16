import express from 'express';
import ChatLead from '../models/ChatLead.js';
const router = express.Router();

router.post('/lead', async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const phone = String(req.body.phone || '').replace(/\D/g, '');
    const consent = req.body.consent === true;
    if (name.length < 2 || name.length > 100) return res.status(400).json({ message: 'कृपया सही नाम लिखें।' });
    if (!/^[6-9]\d{9}$/.test(phone)) return res.status(400).json({ message: 'कृपया 10 अंकों का सही भारतीय मोबाइल नंबर लिखें।' });
    if (!consent) return res.status(400).json({ message: 'आगे बढ़ने के लिए डेटा उपयोग की सहमति आवश्यक है।' });
    let lead = await ChatLead.findOne({ phone });
    if (lead) { lead.name = name; lead.lastChatAt = new Date(); lead.consent = true; await lead.save(); }
    else lead = await ChatLead.create({ name, phone, consent });
    return res.status(201).json({ leadId: lead._id, name: lead.name, message: 'Lead saved. Chat unlocked.' });
  } catch (e) { console.error('chat lead error', e); return res.status(500).json({ message: 'जानकारी सेव नहीं हो सकी। कृपया थोड़ी देर बाद प्रयास करें।' }); }
});

router.post('/message', async (req, res) => {
  try {
    const leadId = String(req.body.leadId || '');
    const message = String(req.body.message || '').trim().slice(0, 2000);
    const lead = await ChatLead.findById(leadId);
    if (!lead) return res.status(401).json({ message: 'पहले नाम और मोबाइल नंबर देकर चैट शुरू करें।' });
    if (!message) return res.status(400).json({ message: 'कृपया सवाल लिखें।' });
    lead.lastChatAt = new Date(); await lead.save();
    if (process.env.OPENAI_API_KEY) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', { method:'POST', headers:{'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'}, body:JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4o-mini', messages:[{role:'system',content:'You are Trayamb Associates website assistant. Help users with house construction planning, interior design, renovation, floor plans, materials and rough budgeting. Reply in the user\'s language, ask clarifying questions, and state that structural designs, permissions and final estimates require qualified local professionals. Never claim an estimate is a final quote.'},{role:'user',content:message}], temperature:0.5 }) });
      const data = await response.json();
      if (!response.ok) { console.error('AI provider error', data); return res.status(502).json({ message: 'AI अभी उपलब्ध नहीं है। कृपया बाद में कोशिश करें।' }); }
      return res.json({ reply: data.choices?.[0]?.message?.content || 'कृपया अपना सवाल थोड़ा विस्तार से लिखें।' });
    }
    return res.json({ reply: 'नमस्ते ' + lead.name + '! मैं मकान निर्माण, इंटीरियर, रिनोवेशन और बजट की योजना में मदद कर सकता हूँ। कृपया अपना प्लॉट साइज, शहर और अनुमानित बजट बताइए। अधिक सटीक AI जवाब चालू करने के लिए backend में OPENAI_API_KEY सेट करना होगा।' });
  } catch (e) { console.error('chat message error', e); return res.status(500).json({ message: 'जवाब तैयार नहीं हो पाया। कृपया फिर कोशिश करें।' }); }
});
export default router;
