
export default function ProgressBar({ currentStep, totalSteps = 3, label }) {
  const progressPercentage = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-xs text-gray-500 mb-2 font-medium">
        <span>{label}</span>
        <span>{Math.round(progressPercentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}