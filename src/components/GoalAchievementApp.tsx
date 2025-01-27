
"use client"
import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, Target, Brain, Activity, Calendar } from 'lucide-react';

interface StepCardProps {
  title: string;
  icon: React.ComponentType<any>;
  isActive: boolean;
  onClick: () => void;
}

interface GoalData {
  idealOutcome: string;
  leastDesiredOutcome: string;
  positiveHabits: string[];
  negativeHabits: string[];
  tribe: string[];
  emotionalAttachments: string;
  topHabits: string[];
  futureImage?: string;
  futureLetters: string;
}

const GoalAchievementApp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [goalData, setGoalData] = useState<GoalData>({
    idealOutcome: '',
    leastDesiredOutcome: '',
    positiveHabits: [],
    negativeHabits: [],
    tribe: [],
    emotionalAttachments: '',
    topHabits: [],
    futureLetters: ''
  });

  const StepCard: React.FC<StepCardProps> = ({ title, icon: Icon, isActive, onClick }) => (
    <div
      className={`cursor-pointer rounded-lg p-4 transition-all duration-200 hover:scale-105 ${
        isActive ? 'bg-purple-100 dark:bg-purple-900' : 'bg-gray-50 dark:bg-gray-800'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon className={`h-6 w-6 ${
          isActive ? 'text-purple-600 dark:text-purple-300' : 'text-gray-500'
        }`} />
        <span className={`font-medium ${
          isActive ? 'text-purple-600 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'
        }`}>
          {title}
        </span>
      </div>
    </div>
  );

  const addHabit = (type: 'positive' | 'negative') => {
    const habit = prompt(`Enter a ${type} habit:`);
    if (habit) {
      setGoalData(prev => ({
        ...prev,
        [`${type}Habits`]: [...prev[`${type}Habits`], habit]
      }));
    }
  };

  const steps = [
    { title: 'Ideal Outcome', icon: Target },
    { title: 'Vision & Goals', icon: Brain },
    { title: 'Habits & Beliefs', icon: Activity },
    { title: 'Track Progress', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-800 dark:text-purple-200">
          Goal Achievement System
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              title={step.title}
              icon={step.icon}
              isActive={currentStep === index + 1}
              onClick={() => setCurrentStep(index + 1)}
            />
          ))}
        </div>

        <div className="space-y-6">
          {currentStep === 1 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Define Your Ideal Outcome</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Describe your perfect outcome with vivid details
                  </label>
                  <textarea
                    placeholder="Be specific about what success looks like..."
                    value={goalData.idealOutcome}
                    onChange={(e) => setGoalData(prev => ({
                      ...prev,
                      idealOutcome: e.target.value
                    }))}
                    className="w-full h-32 p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Describe your least desired outcome
                  </label>
                  <textarea
                    placeholder="What happens if nothing changes..."
                    value={goalData.leastDesiredOutcome}
                    onChange={(e) => setGoalData(prev => ({
                      ...prev,
                      leastDesiredOutcome: e.target.value
                    }))}
                    className="w-full h-32 p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Vision & Goals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Your Future Self</h3>
                  <div className="aspect-square bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4">
                    {goalData.futureImage ? (
                      <img 
                        src={goalData.futureImage} 
                        alt="Future self" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <PlusCircle className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 text-center">
                          Upload a photo of your future self
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
                    className="block w-full py-2 text-center border-2 border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 cursor-pointer transition-colors"
                  >
                    Upload Photo
                  </label>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Letter to Future Self</h3>
                  <textarea
                    placeholder="Dear Future Me..."
                    value={goalData.futureLetters}
                    onChange={(e) => setGoalData(prev => ({
                      ...prev,
                      futureLetters: e.target.value
                    }))}
                    className="w-full h-64 p-4 border rounded-md"
                  />
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Write to your future self about your hopes, promises, and the person you're committed to becoming. What would you like to tell them?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Positive Habits & Beliefs</h2>
                <div className="space-y-4">
                  {goalData.positiveHabits.map((habit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>{habit}</span>
                    </div>
                  ))}
                  <button 
                    onClick={() => addHabit('positive')}
                    className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Add Positive Habit
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Habits to Change</h2>
                <div className="space-y-4">
                  {goalData.negativeHabits.map((habit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded"
                    >
                      <CheckCircle2 className="h-5 w-5 text-red-500" />
                      <span>{habit}</span>
                    </div>
                  ))}
                  <button 
                    onClick={() => addHabit('negative')}
                    className="w-full border-2 border-purple-600 text-purple-600 py-2 rounded-md hover:bg-purple-50 transition-colors"
                  >
                    Add Habit to Change
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Track Your Progress</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-500">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Habits Formed', value: '5/8' },
                    { title: 'Days Consistent', value: '24' },
                    { title: 'Support Check-ins', value: '12' }
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                    >
                      <div className="text-sm text-gray-500">{stat.title}</div>
                      <div className="text-2xl font-bold mt-1">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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