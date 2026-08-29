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
      text: 'আসসালামু আলাইকুম! 👋 আমি ArdhiMart এর Live Chat AI এসিস্ট্যান্ট। পণ্য, দাম, ডেলিভারি বা অর্ডারের বিষয়ে প্রশ্ন করুন অথবা চ্যাটের ভেতরেই সহজে অর্ডার কনফার্ম করুন।\nHello! Ask about products or place an order directly here.',
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

  // Quick Prompts Chips
  const quickPrompts = [
    '💬 চ্যাটে অর্ডার করতে চাই',
    '⚡ পাওয়ার ব্যাংক বা গ্যাজেটের দাম কত?',
    '🚚 Delivery fee and shipping time?',
    '📦 আমার অর্ডার ৯৮০ এর স্ট্যাটাস কি?'
  ];

  // Automatic Backend Order Creator
  const attemptPlaceOrderInChat = async (userPrompt: string): Promise<string | null> => {
    const phoneMatch = userPrompt.match(/(?:01|8801|\+8801)\d{8,9}/);
    const orderKeywords = ['order', 'buy', 'অর্ডার', 'কিনব', 'বুক', 'নিতে চাই'];
    const hasOrderIntent = orderKeywords.some((k) => userPrompt.toLowerCase().includes(k));

    if (phoneMatch && hasOrderIntent) {
      const phone = phoneMatch[0];
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ardhimart-backend.onrender.com/api/v1';

      // Parse name and address roughly from text
      const cleanText = userPrompt.replace(phone, '').trim();
      const parts = cleanText.split(/[,|\n-]/).map((s) => s.trim()).filter(Boolean);
      const name = parts[0] || 'Customer';
      const address = parts.slice(1).join(', ') || 'Dhaka, Bangladesh';

      const selectedProduct = products[0] || {
        id: 'prod-1',
        title: 'Wireless Power Bank 10000mAh',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      };

      try {
        const res = await fetch(`${baseUrl}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: name,
            customerPhone: phone,
            shippingAddress: address,
            city: 'Dhaka',
            items: [
              {
                productId: selectedProduct.id,
                productName: selectedProduct.title,
                quantity: 1,
                price: selectedProduct.price,
                image: selectedProduct.image,
              },
            ],
            subtotal: selectedProduct.price,
            shippingFee: 80,
            totalAmount: selectedProduct.price + 80,
            paymentMethod: 'COD',
          }),
        });

        if (res.ok) {
          const ord = await res.json();
          const orderNum = ord.orderNumber || ord.id || '981';
          return `🎉 অভিনন্দন! আপনার অর্ডারটি সফলভাবে কনফার্ম করা হয়েছে।\n📦 অর্ডার নম্বর: #${orderNum}\n👤 কাস্টমার: ${name} (${phone})\n📍 ঠিকানা: ${address}\n💵 পেমেন্ট: ক্যাশ অন ডেলিভারি (৳${selectedProduct.price + 80})\n\nআমাদের কুরিয়ার প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন। ❤️`;
        }
      } catch (e) {}
    }

    return null;
  };

  // Smart Intelligent Context Engine
  const getSmartContextResponse = async (userPrompt: string, currentMessages: ChatMessage[]): Promise<string> => {
    const q = userPrompt.trim().toLowerCase();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ardhimart-backend.onrender.com/api/v1';

    // Get previous bot & user messages for context awareness
    const lastUserMsg = currentMessages.filter((m) => m.sender === 'user').slice(-2)[0]?.text || '';
    const lastBotMsg = currentMessages.filter((m) => m.sender === 'bot').slice(-1)[0]?.text || '';

    // Check for short queries like "kn", "kno", "keno", "why"
    const isWhyQuery = ['kn', 'kno', 'keno', 'kene', 'why', 'কেন'].includes(q);
    if (isWhyQuery) {
      if (lastBotMsg.includes('অর্ডার') || lastBotMsg.includes('order')) {
        return 'আমাদের শপে ক্যাশ অন ডেলিভারিতে নিরাপদ কেনাকাটা ও দ্রুত ডেলিভারির সুবিধা নিশ্চিত করতেই অর্ডার করার সময় নাম, মোবাইল নম্বর ও সঠিক ঠিকানা প্রয়োজন হয়।';
      }
      return 'অনুগ্রহ করে কোন বিষয়টি সম্পর্কে বিস্তারিত জানতে চান একটু খুলে বলুন, আমি আপনাকে প্রয়োজনীয় তথ্য দিয়ে সাহায্য করব।';
    }

    // Order intent without complete info
    if (q.includes('অর্ডার') || q.includes('order') || q.includes('buy') || q.includes('কিনব') || q.includes('নিতে চাই')) {
      return 'চ্যাটে সরাসরি অর্ডার কনফার্ম করতে অনুগ্রহ করে প্রদান করুন:\n১. পণ্যের নাম\n২. আপনার পূর্ণ নাম\n৩. মোবাইল নম্বর\n৪. ফুল ডেলিভারি ঠিকানা\n\nতথ্যগুলো একবারে লিখে পাঠালেই আপনার অর্ডার বুকিং হয়ে যাবে!';
    }

    // Order Tracking Query (e.g. 980)
    const orderMatch = userPrompt.match(/\b\d{3,4}\b/);
    if (orderMatch) {
      const orderId = orderMatch[0];
      try {
        const orderRes = await fetch(`${baseUrl}/orders/${orderId}`);
        if (orderRes.ok) {
          const ord = await orderRes.json();
          return `অর্ডার #${orderId} এর বর্তমান অবস্থা: ${ord.status?.toUpperCase()} (গ্রাহক: ${ord.customerName}, মোট দেয়: ৳${ord.totalAmount})। আপনার পার্সেল লজিস্টিক টিমের প্রক্রিয়াধীন আছে।`;
        }
      } catch (e) {}

      return `অর্ডার #${orderMatch[0]} এর প্রসেসিং চলছে। আমাদের ডেলিভারি টিম দ্রুত পার্সেল হ্যান্ডওভার করবে।`;
    }

    // Matching product from store database
    const matched = products.filter(
      (p) => q.includes(p.title.toLowerCase()) || (p.category && q.includes(p.category.toLowerCase()))
    );

    if (matched.length > 0) {
      const p = matched[0];
      return `"${p.title}" আমাদের স্টকে এভেইলএবল রয়েছে! স্পেশাল প্রাইস ৳${p.price}। ঢাকার ভেতরে ৳৮০ এবং ঢাকার বাইরে ৳১২০ ডেলিভারি চার্জে সম্পূর্ণ ক্যাশ অন ডেলিভারিতে অর্ডার করতে পারেন।`;
    }

    // Delivery & Shipping query
    if (q.includes('delivery') || q.includes('shipping') || q.includes('ডেলিভারি') || q.includes('চার্জ') || q.includes('কবে')) {
      return 'ডেলিভারি চার্জ: ঢাকার ভেতরে ৳৮০ (২৪-৪৮ ঘণ্টা), ঢাকার বাইরে ৳১২০ (২-৩ দিন)। সম্পূর্ণ পণ্য হাতে পেয়ে মূল্য পরিশোধ (Cash on Delivery) করতে পারবেন!';
    }

    // Return policy query
    if (q.includes('return') || q.includes('replacement') || q.includes('রিটার্ন') || q.includes('ওয়ারেন্টি')) {
      return 'ArdhiMart এর প্রতিটি পণ্যে রয়েছে ৭ দিনের ক্যাশলেস রিপ্লেসমেন্ট গ্যারান্টি। কোনো সমস্যা থাকলে তাৎক্ষণিক ডেলিভারিম্যানকে অথবা আমাদের সাথে চ্যাটে যোগাযোগ করুন।';
    }

    // Natural conversation fallback
    return 'ArdhiMart এর কাস্টমার কেয়ার এ আপনাকে স্বাগতম! পণ্য, ক্যাশ অন ডেলিভারি অথবা সরাসরি অর্ডার সংক্রান্ত যেকোনো তথ্য জানতে লিখে পাঠান।';
  };

  // Gemini AI Handler
  const getAiResponse = async (userPrompt: string, currentMessages: ChatMessage[]): Promise<string> => {
    // 1. Try In-Chat Direct Order Placement
    const orderPlacementResult = await attemptPlaceOrderInChat(userPrompt);
    if (orderPlacementResult) {
      return orderPlacementResult;
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (apiKey && apiKey.startsWith('AIzaSy')) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ardhimart-backend.onrender.com/api/v1';

      // Order Lookup
      const orderMatch = userPrompt.match(/\b\d{3,4}\b/);
      let orderContext = '';
      if (orderMatch) {
        const orderId = orderMatch[0];
        try {
          const orderRes = await fetch(`${baseUrl}/orders/${orderId}`);
          if (orderRes.ok) {
            const ord = await orderRes.json();
            orderContext = `Order #${orderId} Info: Status: ${ord.status}, Customer: ${ord.customerName}, Amount: ৳${ord.totalAmount}`;
          }
        } catch (e) {}
      }

      const productCatalogSnippet = products
        .slice(0, 10)
        .map((p) => `• ${p.title}: ৳${p.price} (${p.category || 'General'})`)
        .join('\n');

      const systemPrompt = `You are the helpful AI Live Chat Agent for "ArdhiMart" e-commerce store in Bangladesh.

RULES:
1. Provide accurate, natural, context-aware responses based on customer's queries.
2. If customer asks short questions like "kn", "why", "kno", answer according to previous messages.
3. Automatically match user's language (Bengali/English).
4. Store Info: Delivery inside Dhaka ৳80, Outside Dhaka ৳120. COD available.

Products available:
${productCatalogSnippet}
${orderContext ? `\nContext: ${orderContext}` : ''}`;

      const recentHistory = currentMessages
        .filter((m) => m.id !== 'welcome-1')
        .slice(-6)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        }));

      const contentsPayload = [
        { role: 'user', parts: [{ text: systemPrompt }] },
        ...recentHistory,
        { role: 'user', parts: [{ text: userPrompt }] },
      ];

      const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];

      for (const model of models) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: contentsPayload,
                generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
              }),
            }
          );

          const data = await res.json();
          if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
            const text = data.candidates[0].content.parts[0].text.trim();
            return text
              .replace(/^আসসালামু আলাইকুম!/gi, '')
              .replace(/^আসসালামু আলাইকুম/gi, '')
              .replace(/^hello!/gi, '')
              .trim();
          }
        } catch (e) {}
      }
    }

    // Smart context response engine fallback
    return getSmartContextResponse(userPrompt, currentMessages);
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

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    try {
      const botText = await getAiResponse(query.trim(), updatedMessages);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallbackText = await getSmartContextResponse(query.trim(), updatedMessages);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-fallback-${Date.now()}`,
          sender: 'bot',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-20 sm:right-6 z-50 select-none">
      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3.5 bg-[#0F396F] hover:bg-[#164685] text-white rounded-full shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer border border-cyan-400/40 glow-indigo"
          aria-label="Open Live Chat"
        >
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-cyan-300 fill-cyan-400/20" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-900" />
          </div>

          <span className="font-extrabold text-xs tracking-wider text-white">
            Live Chat
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
                  ArdhiMart Live Chat AI
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                </h3>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Full Context AI Assistant Active
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
                <span>AI Live Chat typing...</span>
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
                placeholder="Ask or send name, phone & address to order..."
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
