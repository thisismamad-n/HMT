'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { useRouter } from 'next/navigation';

// Define interfaces for the different question types
interface BaseQuestion {
  id: number;
  text: string;
  type: string;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: { id: string; text: string }[];
}

interface TextInputQuestion extends BaseQuestion {
  type: 'text-input';
  placeholder: string;
}

interface ContactInfoQuestion extends BaseQuestion {
  type: 'contact-info';
  fields: { id: string; label: string; placeholder: string; type: string }[];
}

type Question = MultipleChoiceQuestion | TextInputQuestion | ContactInfoQuestion;

// Define the questions and their possible answers
const questions: Question[] = [
  {
    id: 1,
    text: 'حوزه فعالیت کسب و کار شما چیست؟',
    type: 'multiple-choice',
    options: [
      { id: 'tech', text: 'فناوری و آی‌تی' },
      { id: 'services', text: 'خدمات' },
      { id: 'manufacturing', text: 'تولید' },
      { id: 'retail', text: 'خرده‌فروشی' },
      { id: 'other', text: 'سایر' }
    ]
  },
  {
    id: 2,
    text: 'تعداد کارمندان شما چند نفر است؟',
    type: 'multiple-choice',
    options: [
      { id: 'solo', text: 'فقط خودم' },
      { id: 'small', text: '۱ تا ۱۰ نفر' },
      { id: 'medium', text: '۱۱ تا ۵۰ نفر' },
      { id: 'large', text: 'بیش از ۵۰ نفر' }
    ]
  },
  {
    id: 3,
    text: 'چه چالش‌هایی در کسب و کار خود دارید؟',
    type: 'multiple-choice',
    options: [
      { id: 'growth', text: 'رشد و توسعه' },
      { id: 'marketing', text: 'بازاریابی و فروش' },
      { id: 'operations', text: 'عملیات و فرآیندها' },
      { id: 'finance', text: 'مالی و سرمایه‌گذاری' },
      { id: 'talent', text: 'استخدام و مدیریت استعدادها' }
    ]
  },
  {
    id: 4,
    text: 'چه نوع کمکی نیاز دارید؟',
    type: 'text-input',
    placeholder: 'توضیح دهید...'
  },
  {
    id: 5,
    text: 'اطلاعات تماس خود را وارد کنید:',
    type: 'contact-info',
    fields: [
      { id: 'name', label: 'نام و نام خانوادگی', placeholder: 'نام و نام خانوادگی خود را وارد کنید', type: 'text' },
      { id: 'email', label: 'ایمیل', placeholder: 'ایمیل خود را وارد کنید', type: 'email' },
      { id: 'phone', label: 'شماره تماس', placeholder: 'شماره تماس خود را وارد کنید', type: 'tel' },
      { id: 'company', label: 'نام شرکت', placeholder: 'نام شرکت خود را وارد کنید', type: 'text' }
    ]
  }
];

export default function Home() {
  const router = useRouter();
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const [blurAmount, setBlurAmount] = useState(20);
  
  const totalQuestions = questions.length;
  
  // Update the useEffect to only handle scroll-based blur for the landing page
  useEffect(() => {
    if (!showQuestions) {
      // When in landing page mode, blur based on scroll
      const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
        
        // Calculate blur based on scroll position (reduce blur as user scrolls)
        const maxBlur = 20;
        const scrollThreshold = 300; // When to reach full clarity
        const newBlurAmount = Math.max(0, maxBlur - (position / scrollThreshold) * maxBlur);
        setBlurAmount(newBlurAmount);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // When showing questions, initialize blur based on current question
      const initialBlur = 20;
      const progressPercentage = currentQuestionIndex / questions.length;
      const newBlurAmount = Math.max(0, initialBlur * (1 - progressPercentage));
      setBlurAmount(newBlurAmount);
    }
  }, [showQuestions, currentQuestionIndex, questions.length]);

  const handleOptionSelect = (questionId: number, optionId: string) => {
    setAnswers({ ...answers, [questionId]: optionId });
    
    // Move to next question and update blur
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      // Update blur based on new question index
      const initialBlur = 20;
      const progressPercentage = (nextIndex) / questions.length;
      const newBlurAmount = Math.max(0, initialBlur * (1 - progressPercentage));
      setBlurAmount(newBlurAmount);
    } else {
      // This is the last question, set blur to 0 and redirect to dashboard
      setBlurAmount(0);
      router.push('/dashboard');
    }
  };

  const handleTextSubmit = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
    
    // Move to next question and update blur
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      // Update blur based on new question index
      const initialBlur = 20;
      const progressPercentage = (nextIndex) / questions.length;
      const newBlurAmount = Math.max(0, initialBlur * (1 - progressPercentage));
      setBlurAmount(newBlurAmount);
    } else {
      // This is the last question, set blur to 0 and redirect to dashboard
      setBlurAmount(0);
      router.push('/dashboard');
    }
  };

  const handleContactSubmit = (questionId: number, formData: Record<string, string>) => {
    setAnswers({ ...answers, [questionId]: formData });
    
    // Set blur to 0 before redirecting to dashboard
    setBlurAmount(0);
    router.push('/dashboard');
  };

  const handleProgressClick = (index: number) => {
    setCurrentQuestionIndex(index);
    
    // Update blur based on selected question index
    const initialBlur = 20;
    const progressPercentage = index / questions.length;
    const newBlurAmount = Math.max(0, initialBlur * (1 - progressPercentage));
    setBlurAmount(newBlurAmount);
  };

  const startQuestions = () => {
    // Set initial blur for first question (full blur)
    setBlurAmount(20);
    setShowQuestions(true);
  };

  // Render the landing page
  if (!showQuestions) {
    return (
      <div className="relative min-h-screen flex flex-col">
        {/* Background Dashboard Image with Blur that decreases on scroll */}
        <div 
          className="fixed inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: `url('/images/custom/background.png')`, 
            filter: `blur(${blurAmount}px)`,
            opacity: 0.85,
            transition: 'filter 0.5s ease-in-out',
            transform: 'scale(1.1)', // Prevent edge artifacts during blur
          }}
        />

        {/* Single uniform overlay for the entire page */}
        <div className="fixed inset-0 bg-white/40 dark:bg-gray-900/40 z-5"></div>

        {/* Hero Section */}
        <header className="relative z-20 w-full bg-transparent py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="h-10">
              <Image src="/images/custom/logo-black.svg" alt="HMT Logo" width={100} height={40} />
            </div>
            <button 
              onClick={startQuestions}
              className="bg-primary hover:bg-primary-600 text-white px-6 py-2 rounded-md shadow-md transition-all"
            >
              شروع
            </button>
          </div>
        </header>

        {/* Hero Content */}
        <section className="relative min-h-screen flex flex-col justify-center items-center px-4 z-10">
          <div className="w-full max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block mb-6"
                >
                  <div className="mb-4 flex justify-center items-center">
                    <Image src="/images/custom/logo-black.svg" alt="HMT Logo" width={200} height={80} />
                  </div>
                </motion.div>
              </div>
              
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: [20, -5, 0],
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
                className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-black max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
              >
                جایی که نوآوری با ارتباط تلاقی می‌کند، هر ایده به{" "}
                <Highlight className="text-white">
                  فرصت تبدیل می‌شود.
                </Highlight>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-8"
              >
                <button
                  onClick={startQuestions}
                  className="bg-primary hover:bg-primary-600 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  شروع مسیر
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Additional Sections with Dashboard Previews - REMOVED the separate backdrop styling */}
        <section className="relative min-h-screen flex flex-col justify-center items-center px-4 z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">مدیریت هوشمند کسب و کار</h2>
              <p className="text-lg text-black max-w-2xl mx-auto">
                با ابزارهای پیشرفته، عملکرد کسب و کار خود را تحلیل کنید و تصمیمات آگاهانه بگیرید.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/70 rounded-xl shadow-lg p-6"
              >
                <div className="mb-4 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">تحلیل داده‌ها</h3>
                <p className="text-black">گزارش‌های جامع و نمودارهای تعاملی برای درک بهتر روندهای کسب و کار</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/70 rounded-xl shadow-lg p-6"
              >
                <div className="mb-4 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">مدیریت زمان</h3>
                <p className="text-black">برنامه‌ریزی هوشمند و یادآوری‌های خودکار برای افزایش بهره‌وری</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/70 rounded-xl shadow-lg p-6"
              >
                <div className="mb-4 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-black">مدیریت ارتباطات</h3>
                <p className="text-black">ارتباط مؤثر با مشتریان و همکاران برای هماهنگی بهتر</p>
              </motion.div>
            </div>
            
            <div className="text-center mt-12">
              <button
                onClick={startQuestions}
                className="bg-primary hover:bg-primary-600 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                دریافت مشاوره رایگان
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Questions Section (existing code)
  const renderQuestionContent = () => {
    const currentQuestion = questions[currentQuestionIndex];

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
                className={`w-full p-4 text-right border rounded-lg transition-all ${
                  answers[currentQuestion.id] === option.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card hover:bg-primary/10 border-input'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        );
      case 'text-input':
        return (
          <div className="space-y-4">
            <textarea
              placeholder={currentQuestion.placeholder}
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => setAnswers({ ...answers, [currentQuestion.id]: e.target.value })}
              className="w-full p-4 h-32 border rounded-lg bg-card"
            />
            <button
              onClick={() => handleTextSubmit(currentQuestion.id, answers[currentQuestion.id] || '')}
              className="w-full p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 transition-all"
            >
              ادامه
            </button>
          </div>
        );
      case 'contact-info':
        return (
          <div className="space-y-4">
            {currentQuestion.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="block text-sm font-medium">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={(answers[currentQuestion.id] as Record<string, string>)?.[field.id] || ''}
                  onChange={(e) => {
                    const currentFormData = (answers[currentQuestion.id] as Record<string, string>) || {};
                    setAnswers({
                      ...answers,
                      [currentQuestion.id]: { ...currentFormData, [field.id]: e.target.value }
                    });
                  }}
                  className="w-full p-3 border rounded-lg bg-card"
                />
              </div>
            ))}
            <button
              onClick={() => handleContactSubmit(currentQuestion.id, (answers[currentQuestion.id] as Record<string, string>) || {})}
              className="w-full p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 transition-all"
            >
              ارسال
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Add a blurred background with the same styling as landing page */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/images/custom/background.png')`, 
          filter: `blur(${blurAmount}px)`,
          opacity: 0.85,
          transition: 'filter 0.5s ease-in-out',
          transform: 'scale(1.1)', // Prevent edge artifacts during blur
        }}
      />

      {/* Consistent overlay to match landing page */}
      <div className="fixed inset-0 bg-white/40 dark:bg-gray-900/40 z-5"></div>

      <div className="container relative z-10 mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Progress Bar - Enhanced to better show current question */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleProgressClick(index)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    index < currentQuestionIndex
                      ? 'bg-primary/80 text-white'
                      : index === currentQuestionIndex
                      ? 'bg-primary text-white ring-4 ring-primary/30 transform scale-110'
                      : 'bg-white/70 text-gray-500 hover:bg-white/90 hover:text-gray-700'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-700"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            <div className="text-center mt-2 text-sm font-medium">
              سوال {currentQuestionIndex + 1} از {questions.length}
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-black">{questions[currentQuestionIndex].text}</h2>
              {renderQuestionContent()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}