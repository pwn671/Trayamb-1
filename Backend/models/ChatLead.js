import mongoose from 'mongoose';
const ChatLeadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  phone: { type: String, required: true, trim: true, match: /^[6-9]\d{9}$/ },
  consent: { type: Boolean, required: true, validate: v => v === true },
  source: { type: String, default: 'website-chatbot' },
  createdAt: { type: Date, default: Date.now },
  lastChatAt: { type: Date, default: Date.now }
});
ChatLeadSchema.index({ phone: 1 });
export default mongoose.model('ChatLead', ChatLeadSchema);
