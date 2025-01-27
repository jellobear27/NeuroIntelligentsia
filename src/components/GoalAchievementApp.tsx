"use client"

import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, Target, Brain, Activity, Calendar } from 'lucide-react';

const TeachingTip = ({ title, content }: { title: string; content: string }) => (
  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-6 relative overflow-hidden animate-float font-display">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 animate-shimmer"></div>
    <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">{title}</h3>
    <p className="text-sm text-purple-700 dark:text-purple-300 font-body">{content}</p>
  </div>
);

const StepContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-xl transition-all duration-500 font-body">
    {children}
  </div>
);

const GoalAchievementApp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [goalData, setGoalData] = useState({
    idealOutcome: '',
    leastDesiredOutcome: '',
    positiveHabits: [],
    negativeHabits: [],
    futureImage: '',
    futureLetters: '',
    dopamineMap: {
      current: [],
      desired: []
    }
  });

  const teachingTips = {
    1: {
      title: "The Power of Contrast",
      content: "Your brain needs contrast - the dream versus the nightmare. By vividly describing both outcomes, your mind starts to crave the ideal because staying the same becomes unbearable."
    },
    2: {
      title: "Connect With Your Future Self",
      content: "Most people don't prioritize their future selves because they can't visualize them. Creating a strong visual connection helps bridge this gap and makes your goals more emotionally compelling."
    },
    3: {
      title: "Habits Shape Your Future",
      content: "Remember: Goals are destinations, habits are the vehicle. Focus on building habits that make your goals a natural byproduct of who you're becoming."
    },
    4: {
      title: "The FEAR Formula",
      content: "Focus, Emotion, Agitation, and Repetition - these four elements help your mammalian brain embrace new patterns and make lasting changes."
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900 p-6">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 8s infinite;
        }
        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }
        .font-body {
          font-family: 'Outfit', sans-serif;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-purple-800 dark:text-purple-200 font-display bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Neurocognitive Goal Achievement
        </h1>

        <TeachingTip {...teachingTips[currentStep]} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {['Set Your Outcomes', 'Future Self Vision', 'Build Habits', 'Track Progress'].map((title, index) => (
            <div
              key={index}
              className={`cursor-pointer rounded-lg p-4 transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1 font-display ${
                currentStep === index + 1
                  ? 'bg-purple-100 dark:bg-purple-900 border-l-4 border-purple-500'
                  : 'bg-white dark:bg-gray-800'
              }`}
              onClick={() => setCurrentStep(index + 1)}
            >
              <h3 className={`font-medium ${
                currentStep === index + 1
                  ? 'text-purple-600 dark:text-purple-300'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {title}
              </h3>
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <StepContainer>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-display font-medium mb-2 text-purple-800 dark:text-purple-200">
                  Describe Your Ideal Future
                </label>
                <textarea
                  placeholder="Paint a vivid picture of your perfect outcome..."
                  value={goalData.idealOutcome}
                  onChange={(e) => setGoalData(prev => ({...prev, idealOutcome: e.target.value}))}
                  className="w-full h-32 p-4 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all duration-300 font-body"
                />
              </div>
              <div>
                <label className="block text-lg font-display font-medium mb-2 text-purple-800 dark:text-purple-200">
                  Describe Your Nightmare Scenario
                </label>
                <textarea
                  placeholder="What happens if nothing changes..."
                  value={goalData.leastDesiredOutcome}
                  onChange={(e) => setGoalData(prev => ({...prev, leastDesiredOutcome: e.target.value}))}
                  className="w-full h-32 p-4 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all duration-300 font-body"
                />
              </div>
            </div>
          </StepContainer>
        )}

        {currentStep === 2 && (
          <StepContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-display font-medium text-purple-800 dark:text-purple-200">Your Future Self</h3>
                <div className="aspect-square bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-purple-300 hover:border-purple-500 transition-all duration-300 flex flex-col items-center justify-center p-4">
                  {goalData.futureImage ? (
                    <img 
                      src={goalData.futureImage} 
                      alt="Future self" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <PlusCircle className="h-12 w-12 text-purple-400 mb-2" />
                      <p className="text-sm text-purple-600 dark:text-purple-300 text-center font-body">
                        Upload a visualization of your future self
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="future-self-upload"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setGoalData(prev => ({
                          ...prev,
                          futureImage: e.target?.result as string
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label
                  htmlFor="future-self-upload"
                  className="block w-full py-3 text-center border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 cursor-pointer transition-all duration-300 font-display"
                >
                  Upload Photo
                </label>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-display font-medium text-purple-800 dark:text-purple-200">Letter to Future Self</h3>
                <textarea
                  placeholder="Dear Future Me..."
                  value={goalData.futureLetters}
                  onChange={(e) => setGoalData(prev => ({
                    ...prev,
                    futureLetters: e.target.value
                  }))}
                  className="w-full h-64 p-4 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all duration-300 font-body"
                />
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg animate-float">
                  <p className="text-sm text-purple-700 dark:text-purple-300 font-body">
                    Write to your future self about your hopes, dreams, and the person you're committed to becoming.
                  </p>
                </div>
              </div>
            </div>
          </StepContainer>
        )}

        {currentStep === 3 && (
          <StepContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-display font-medium text-purple-800 dark:text-purple-200">Build Positive Habits</h3>
                <div className="space-y-3">
                  {goalData.positiveHabits.map((habit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg animate-float"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-purple-500" />
                      <span className="font-body">{habit}</span>
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      const habit = prompt('Enter a positive habit:');
                      if (habit) {
                        setGoalData(prev => ({
                          ...prev,
                          positiveHabits: [...prev.positiveHabits, habit]
                        }));
                      }
                    }}
                    className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 font-display"
                  >
                    Add Positive Habit
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-display font-medium text-purple-800 dark:text-purple-200">Transform Negative Habits</h3>
                <div className="space-y-3">
                  {goalData.negativeHabits.map((habit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg animate-float"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-red-500" />
                      <span className="font-body">{habit}</span>
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      const habit = prompt('Enter a habit to change:');
                      if (habit) {
                        setGoalData(prev => ({
                          ...prev,
                          negativeHabits: [...prev.negativeHabits, habit]
                        }));
                      }
                    }}
                    className="w-full py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-300 font-display"
                  >
                    Add Habit to Change
                  </button>
                </div>
              </div>
            </div>
          </StepContainer>
        )}

        {currentStep === 4 && (
          <StepContainer>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-display font-medium text-purple-800 dark:text-purple-200">Overall Progress</span>
                  <span className="text-sm font-body text-purple-600 dark:text-purple-300">75%</span>
                </div>
                <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-600 rounded-full transition-all duration-1000"
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Habits Formed', value: '5/8', color: 'from-purple-500 to-blue-500' },
                  { title: 'Days Consistent', value: '24', color: 'from-blue-500 to-cyan-500' },
                  { title: 'Support Check-ins', value: '12', color: 'from-cyan-500 to-teal-500' }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition-all duration-300 animate-float"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="h-1 w-full bg-gradient-to-r rounded-full mb-4" style={{ backgroundImage: `linear-gradient(to right, ${stat.color})` }} />
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-body">{stat.title}</div>
                    <div className="text-2xl font-bold mt-1 font-display bg-clip-text text-transparent bg-gradient-to-r ${stat.color}">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </StepContainer>
        )}

        <div className="flex justify-between mt-8">
          <button
            className="px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-purple-600 font-display font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            className="px-6 py-3 rounded-lg bg-purple-600 text-white font-display font-medium hover:shadow-lg hover:bg-purple-700 transition-all duration-300 disabled:opacity-50"
            onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
            disabled={currentStep === 4}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalAchievementApp;