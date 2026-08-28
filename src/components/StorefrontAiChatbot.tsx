'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Bot,
  Send,
  X,
  Sparkles,
  Loader2,
  Minimize2,
  RefreshCw,
  ShoppingBag,
  HelpCircle,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const DEFAULT_GEMINI_KEY = 'AQ.Ab8RN6IYh-WQBwLnUYZIiN-xWdaONnzX3tzEVR1V6Qd7Zle1oA';

export const StorefrontAiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { products } = useStore();

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'আসসালামু আলাইকুম! 👋 আমি ArdhiMart এর AI কাস্টমার সাপোর্ট এসিস্ট্যান্ট। আমাদের গ্যাজেট, দাম, স্টক, ডেলিভারি চার্জ বা আপনার অর্ডারের বর্তমান অবস্থা নিয়ে যেকোনো প্রশ্ন করতে পারেন। কীভাবে সাহায্য করতে পারি?',
      timestamp: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Quick Prompt Chips
  const quickPrompts = [
    '⚡ পাওয়া ব্যাংক বা গ্যাজেটের দাম কত?',
    '🚚 ডেলিভারি চার্জ এবং সময় কতদিন?',
    '📦 আমার অর্ডার ৯৮০ এর বর্তমান স্ট্যাটাস কি?',
    '🔄 প্রোডাক্ট রিটার্ন বা রিপ্লেসমেন্ট পলিসি কি?'
  ];

  // Gemini AI Service Handler with Catalog & Order Context
  const getAiResponse = async (userPrompt: string): Promise<string> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ardhimart-backend.onrender.com/api/v1';

    // Check if user is asking for order tracking (e.g. 980)
    const orderMatch = userPrompt.match(/\b\d{3,4}\b/);
    let orderContext = '';
    if (orderMatch) {
      const orderId = orderMatch[0];
      try {
        const orderRes = await fetch(`${baseUrl}/orders/${orderId}`);
        if (orderRes.ok) {
          const ord = await orderRes.json();
          orderContext = `Real Database Order Details for #${orderId}:
Status: ${ord.status}
Customer: ${ord.customerName} (${ord.customerPhone})
Total Amount: ৳${ord.totalAmount}
Items: ${(ord.order_items || ord.items || []).map((i: any) => i.productName || i.title).join(', ')}`;
        }
      } catch (e) {}
    }

    // Build Product Catalog Snippet
    const productCatalogSnippet = products
      .slice(0, 10)
      .map(
        (p) =>
          `• ${p.title} - ৳${p.price} (Category: ${p.category}, Status: In Stock, SKU: ${p.sku || 'N/A'})`
      )
      .join('\n');

    const systemPrompt = `You are the friendly, expert AI Customer Support Agent for "ArdhiMart", a premier luxury & tech e-commerce store in Bangladesh.
Your goal is to answer customer questions in polite, helpful, clear Bengali (বাংলা) language.

Store Policies & Knowledge Base:
- Store Name: ArdhiMart (আরধিমার্ট)
- Delivery Fee: Inside Dhaka = ৳80 (24-48 hours delivery), Outside Dhaka = ৳120 (2-3 days delivery).
- Payment Methods: Cash On Delivery (COD), bKash Merchant, Credit/Debit Card.
- Return Policy: 7-day replacement warranty for defective or wrong products.

Available Products in Store Catalog:
${productCatalogSnippet || 'Featured Tech Accessories, Power Banks, Smartwatches, Wireless Headphones'}

${orderContext ? `Order Info Requested:\n${orderContext}\n` : ''}

Customer Query:
"${userPrompt}"

Instructions:
1. Respond concisely and nicely in natural Bengali (বাংলা).
2. If asking about products or prices, reference product names and prices in Taka (৳).
3. If asking about an order, provide the exact order status found in order info.
4. Keep the tone warm, professional, and trustworthy!`;

    const apiKey = DEFAULT_GEMINI_KEY;
    const models = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-2.0-flash'];

    for (const model of models) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: systemPrompt }] }],
              generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
            }),
          }
        );

        const data = await res.json();
        if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          return data.candidates[0].content.parts[0].text;
        }
      } catch (e) {}
    }

    // Fallback response if API key limits reached
    if (userPrompt.includes('ডেলিভারি') || userPrompt.includes('চার্জ')) {
      return 'ঢাকার ভেতরে ডেলিভারি চার্জ ৳৮০ (২৪ ঘণ্টার মধ্যে ডেলিভারি) এবং ঢাকার বাইরে ৳১২০ (২-৩ দিনের মধ্যে)। ক্যাশ অন ডেলিভারি সুবিধা রয়েছে! 🚚';
    } else if (userPrompt.includes('রিটার্ন') || userPrompt.includes('ওয়ারেন্টি')) {
      return 'ArdhiMart এ প্রতিটি পণ্যে ৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি এবং ১ বছরের ওয়ারেন্টি রয়েছে। কোনো ত্রুটি থাকলে আমরা বিনামূল্যে পরিবর্তন করে দিই। 🛡️';
    } else if (orderMatch) {
      return `আপনার অর্ডার #${orderMatch[0]} ব্যাকএন্ডে প্রসেসিং এ আছে। ট্র্যাক করতে "Track Order" পেজে আইডি লিখুন! 📦`;
    }

    return 'ধন্যবাদ আপনার মেসেজের জন্য! ArdhiMart এ আপনার পছন্দের পণ্য কিনতে ওয়েবসাইট ব্রাউজ করুন অথবা সরাসরি ক্যাশ অন ডেলিভারিতে অর্ডার কনফার্ম করুন। ❤️';
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    try {
      const botText = await getAiResponse(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: 'দুঃখিত, কোনো টেকনিক্যাল সমস্যার কারণে উত্তর দিতে বিলম্ব হচ্ছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-4 z-50 select-none">
      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 px-4 py-3 bg-[#0F396F] hover:bg-[#164685] text-white rounded-full shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer border border-indigo-400/30"
          aria-label="Open AI Assistant"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-6 h-6 text-cyan-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900" />
          </div>

          <span className="font-extrabold text-xs tracking-wider text-white hidden sm:inline">
            ArdhiMart AI Support
          </span>

          <span className="px-1.5 py-0.5 text-[9px] font-black bg-cyan-400 text-slate-950 rounded-full uppercase">
            LIVE
          </span>
        </button>
      )}

      {/* CHATBOT WINDOW */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[85vh] bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-cyan-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-white flex items-center gap-1.5">
                  ArdhiMart AI Support
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                </h3>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Powered by Gemini AI
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3 space-y-3 overflow-y-auto no-scrollbar bg-slate-950/90 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 items-start ${
                  msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center shrink-0 text-cyan-300 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-xs shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-xs'
                  }`}
                >
                  {msg.text}
                  <span className="block text-[9px] opacity-60 text-right mt-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 text-xs p-2">
                <Bot className="w-4 h-4 animate-bounce text-cyan-400" />
                <span>ArdhiMart AI উত্তর তৈরি করছে...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestions */}
          <div className="px-3 py-1.5 bg-slate-900/60 border-t border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl whitespace-nowrap cursor-pointer transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-2.5 bg-slate-900 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="প্রশ্ন লিখুন (e.g. পাওয়ার ব্যাংক এর দাম কত?)..."
                className="flex-1 px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="p-2.5 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 rounded-xl transition-all font-bold cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorefrontAiChatbot;
