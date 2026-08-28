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

  // Smart Local Keyword Fallback
  const getLocalFallbackResponse = async (userPrompt: string): Promise<string> => {
    const q = userPrompt.toLowerCase();
    const isEnglish = /[a-z]/i.test(q) && !/[\u0980-\u09FF]/.test(q);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ardhimart-backend.onrender.com/api/v1';

    // Order Intent without full details
    if (q.includes('অর্ডার') || q.includes('order') || q.includes('buy')) {
      if (isEnglish) {
        return 'To place your order directly in chat, please provide: 1. Product Name 2. Full Name 3. Mobile Number 4. Delivery Address.';
      } else {
        return 'চ্যাটে সরাসরি অর্ডার কনফার্ম করতে প্রদান করুন: ১. পণ্যের নাম ২. আপনার নাম ৩. মোবাইল নম্বর ৪. ফুল ডেলিভারি ঠিকানা।';
      }
    }

    // Order Tracking Query (e.g. 980)
    const orderMatch = userPrompt.match(/\b\d{3,4}\b/);
    if (orderMatch) {
      const orderId = orderMatch[0];
      try {
        const orderRes = await fetch(`${baseUrl}/orders/${orderId}`);
        if (orderRes.ok) {
          const ord = await orderRes.json();
          if (isEnglish) {
            return `Order #${orderId} Status: ${ord.status?.toUpperCase()} (${ord.customerName}, Total Payable ৳${ord.totalAmount}).`;
          } else {
            return `অর্ডার #${orderId} এর বর্তমান অবস্থা: ${ord.status?.toUpperCase()} (গ্রাহক: ${ord.customerName}, মোট দেয় ৳${ord.totalAmount})।`;
          }
        }
      } catch (e) {}

      if (isEnglish) {
        return `Order #${orderId} is currently being processed. You can check live tracking on Track Order page.`;
      } else {
        return `অর্ডার #${orderMatch[0]} লজিস্টিক টিমের মাধ্যমে প্রসেসিং এ আছে। বিস্তারিত জানতে ট্র্যাকিং পেজে অনুসন্ধান করুন।`;
      }
    }

    // Product Search Query
    const matchedProducts = products.filter(
      (p) => q.includes(p.title.toLowerCase()) || (p.category && q.includes(p.category.toLowerCase()))
    );

    if (matchedProducts.length > 0) {
      const p = matchedProducts[0];
      if (isEnglish) {
        return `"${p.title}" is available for ৳${p.price}. In stock with Cash on Delivery across Bangladesh!`;
      } else {
        return `"${p.title}" এর বর্তমান অফার প্রাইজ ৳${p.price}। সম্পূর্ণ বাংলাদেশে ক্যাশ অন ডেলিভারিতে পাওয়া যাচ্ছে!`;
      }
    }

    // Delivery / Shipping Query
    if (q.includes('delivery') || q.includes('shipping') || q.includes('ডেলিভারি') || q.includes('চার্জ')) {
      if (isEnglish) {
        return 'Delivery Fee: Inside Dhaka ৳80 (24-48h), Outside Dhaka ৳120 (2-3 days). Cash on Delivery available!';
      } else {
        return 'ডেলিভারি চার্জ: ঢাকার ভেতরে ৳৮০ (২৪-৪৮ ঘণ্টা), ঢাকার বাইরে ৳১২০ (২-৩ দিন)। ক্যাশ অন ডেলিভারি প্রযোজ্য!';
      }
    }

    // General Response
    if (isEnglish) {
      return 'Welcome to ArdhiMart! Feel free to ask about any product or send your address & phone to place an order instantly.';
    } else {
      return 'ArdhiMart এ আপনাকে স্বাগতম! যেকোনো পণ্য সম্পর্কে জানতে অথবা সরাসরি অর্ডার করতে আপনার ঠিকানা ও মোবাইল নম্বর লিখুন।';
    }
  };

  // Gemini AI Handler with Full Un-truncated 1024 Token Capacity
  const getAiResponse = async (userPrompt: string): Promise<string> => {
    // 1. Try In-Chat Direct Order Placement
    const orderPlacementResult = await attemptPlaceOrderInChat(userPrompt);
    if (orderPlacementResult) {
      return orderPlacementResult;
    }

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
          orderContext = `Order #${orderId} DB Info: Status: ${ord.status}, Customer: ${ord.customerName}, Amount: ৳${ord.totalAmount}`;
        }
      } catch (e) {}
    }

    const productCatalogSnippet = products
      .slice(0, 10)
      .map((p) => `• ${p.title}: ৳${p.price} (${p.category || 'General'})`)
      .join('\n');

    const systemPrompt = `You are the expert AI Live Support & Sales Agent for "ArdhiMart" e-commerce store in Bangladesh.

RESPONSE GUIDELINES:
1. Provide complete, natural, polite, and well-structured answers based on the customer's context. Always complete your thoughts fully.
2. DO NOT greet or salute with "Assalamu Alaikum" or "Hello" if the conversation is ongoing. Answer the user's query directly.
3. DETECT LANGUAGE AUTOMATICALLY:
   - If user asks in English -> reply in clean, professional English.
   - If user asks in Bengali/Banglish -> reply in natural, polite Bengali.
4. IN-CHAT DIRECT ORDER GUIDELINE:
   - If user wants to place an order, ask for their Product Name, Full Name, Mobile Number, and Delivery Address to confirm instantly in chat!

Store Knowledge Base:
- Store Name: ArdhiMart
- Delivery: Inside Dhaka ৳80 (24-48h), Outside Dhaka ৳120 (2-3 days). Cash on Delivery available.
- Return: 7-day replacement warranty.
Products:
${productCatalogSnippet || 'Featured Tech Accessories, Power Banks, Smartwatches'}
${orderContext ? `\nFound Info: ${orderContext}` : ''}

Customer Query: "${userPrompt}"`;

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
              generationConfig: { temperature: 0.6, maxOutputTokens: 1024 },
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

    // Fallback if AI Rate limits hit
    return getLocalFallbackResponse(userPrompt);
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
      const fallbackText = await getLocalFallbackResponse(query);
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
      {/* FLOATING TRIGGER BUTTON (ROUNDED SHAPE & LIVE CHAT BADGE, RAISED HIGHER) */}
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
                  Full Response AI Assistant Active
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
