import React, { useState, useMemo } from 'react';
import { Calendar, Percent, Tag, DollarSign, Activity, CalendarDays, Timer, Copy, Check, RotateCcw, ArrowRight } from 'lucide-react';
import { fireCelebration } from '../../../utils/confetti';
import { trackEvent } from '../../../utils/analytics';

interface ToolCommonProps {
  onTaskCompleted?: () => void;
}

// -------------------------------------------------------------
// 19. AGE CALCULATOR
// -------------------------------------------------------------
export const AgeCalculatorTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [birthDate, setBirthDate] = useState('1998-05-15');
  const [targetDate, setTargetDate] = useState(() => new Date().toISOString().split('T')[0]);

  const ageData = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate + 'T00:00:00');
    const target = new Date((targetDate || new Date().toISOString().split('T')[0]) + 'T00:00:00');

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) {
      return null;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffTime = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    // Day of the week born
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const bornDay = dayNames[birth.getDay()];

    // Next birthday countdown
    const currentYearBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (currentYearBirthday < target) {
      currentYearBirthday.setFullYear(target.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((currentYearBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      bornDay,
      daysUntilBirthday,
    };
  }, [birthDate, targetDate]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value);
                onTaskCompleted?.();
              }}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Calculate Age As Of
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {ageData && (
        <div className="space-y-4">
          {/* Main Big Age Banner */}
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:border-blue-900/50 dark:from-blue-950/30 dark:to-indigo-950/30">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
              Exact Chronological Age
            </span>
            <div className="mt-3 flex flex-wrap items-baseline gap-4">
              <div>
                <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{ageData.years}</span>
                <span className="ml-1 text-sm font-semibold text-slate-600 dark:text-slate-300">years</span>
              </div>
              <div>
                <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{ageData.months}</span>
                <span className="ml-1 text-sm font-semibold text-slate-600 dark:text-slate-300">months</span>
              </div>
              <div>
                <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{ageData.days}</span>
                <span className="ml-1 text-sm font-semibold text-slate-600 dark:text-slate-300">days</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">
              Born on a <strong>{ageData.bornDay}</strong> · Next birthday in <strong>{ageData.daysUntilBirthday} days</strong>
            </p>
          </div>

          {/* Life stats grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs text-slate-400">Total Days Lived</span>
              <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{ageData.totalDays.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs text-slate-400">Total Weeks Lived</span>
              <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{ageData.totalWeeks.toLocaleString()}</p>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs text-slate-400">Total Hours Elapsed</span>
              <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{ageData.totalHours.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 20. PERCENTAGE CALCULATOR
// -------------------------------------------------------------
export const PercentageCalculatorTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  // Mode 1: What is X% of Y?
  const [m1P, setM1P] = useState<number | ''>(15);
  const [m1Y, setM1Y] = useState<number | ''>(200);

  // Mode 2: X is what % of Y?
  const [m2X, setM2X] = useState<number | ''>(45);
  const [m2Y, setM2Y] = useState<number | ''>(180);

  // Mode 3: Percentage change from X to Y
  const [m3Old, setM3Old] = useState<number | ''>(50);
  const [m3New, setM3New] = useState<number | ''>(75);

  const res1 = m1P !== '' && m1Y !== '' ? ((m1P / 100) * m1Y).toFixed(2) : '0.00';
  const res2 = m2X !== '' && m2Y !== '' && m2Y !== 0 ? (((m2X as number) / (m2Y as number)) * 100).toFixed(2) : '0.00';
  const res3 =
    m3Old !== '' && m3New !== '' && m3Old !== 0
      ? ((((m3New as number) - (m3Old as number)) / Math.abs(m3Old as number)) * 100).toFixed(2)
      : '0.00';

  return (
    <div className="space-y-6">
      {/* Mode 1 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          1. What is X% of Y?
        </h4>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium">What is</span>
          <input
            type="number"
            value={m1P}
            onChange={(e) => {
              setM1P(e.target.value === '' ? '' : Number(e.target.value));
              onTaskCompleted?.();
            }}
            className="w-24 rounded-xl border border-slate-200 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          <span className="text-sm font-medium">% of</span>
          <input
            type="number"
            value={m1Y}
            onChange={(e) => {
              setM1Y(e.target.value === '' ? '' : Number(e.target.value));
              onTaskCompleted?.();
            }}
            className="w-28 rounded-xl border border-slate-200 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          <span className="text-sm font-bold text-slate-400">=</span>
          <span className="rounded-xl bg-blue-50 px-4 py-1.5 text-lg font-extrabold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            {res1}
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-400 font-mono">
          Formula: ({m1P || 0} ÷ 100) × {m1Y || 0} = {res1}
        </p>
      </div>

      {/* Mode 2 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          2. X is what percentage of Y?
        </h4>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            value={m2X}
            onChange={(e) => setM2X(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-24 rounded-xl border border-slate-200 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          <span className="text-sm font-medium">is what % of</span>
          <input
            type="number"
            value={m2Y}
            onChange={(e) => setM2Y(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-28 rounded-xl border border-slate-200 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          <span className="text-sm font-bold text-slate-400">=</span>
          <span className="rounded-xl bg-blue-50 px-4 py-1.5 text-lg font-extrabold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            {res2}%
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-400 font-mono">
          Formula: ({m2X || 0} ÷ {m2Y || 1}) × 100 = {res2}%
        </p>
      </div>

      {/* Mode 3 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          3. Percentage Increase / Decrease
        </h4>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium">From</span>
          <input
            type="number"
            value={m3Old}
            onChange={(e) => setM3Old(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-24 rounded-xl border border-slate-200 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          <span className="text-sm font-medium">to</span>
          <input
            type="number"
            value={m3New}
            onChange={(e) => setM3New(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-28 rounded-xl border border-slate-200 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          <span className="text-sm font-bold text-slate-400">=</span>
          <span
            className={`rounded-xl px-4 py-1.5 text-lg font-extrabold ${
              Number(res3) >= 0
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                : 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400'
            }`}
          >
            {Number(res3) >= 0 ? `+${res3}%` : `${res3}%`}
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-400 font-mono">
          {Number(res3) >= 0 ? 'Increase of ' : 'Decrease of '}
          {Math.abs(Number(res3))}%
        </p>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 21. DISCOUNT CALCULATOR
// -------------------------------------------------------------
export const DiscountCalculatorTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [price, setPrice] = useState<number>(100);
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [extraCoupon, setExtraCoupon] = useState<number>(0);
  const [taxPercent, setTaxPercent] = useState<number>(0);

  const calculations = useMemo(() => {
    const primarySavings = price * (discountPercent / 100);
    const priceAfterPrimary = price - primarySavings;
    const secondarySavings = priceAfterPrimary * (extraCoupon / 100);
    const subtotal = priceAfterPrimary - secondarySavings;
    const tax = subtotal * (taxPercent / 100);
    const finalPrice = subtotal + tax;
    const totalSavings = price - subtotal;

    return {
      finalPrice: finalPrice.toFixed(2),
      totalSavings: totalSavings.toFixed(2),
      taxAmount: tax.toFixed(2),
    };
  }, [price, discountPercent, extraCoupon, taxPercent]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Original Price ($)</label>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => {
                setPrice(Number(e.target.value));
                onTaskCompleted?.();
              }}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Discount ({discountPercent}%)</label>
            <input
              type="range"
              min={1}
              max={90}
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="mt-2 w-full accent-blue-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Additional Coupon (%) (Optional)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={extraCoupon}
              onChange={(e) => setExtraCoupon(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Sales Tax (%) (Optional)</label>
            <input
              type="number"
              min={0}
              max={30}
              value={taxPercent}
              onChange={(e) => setTaxPercent(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>

        {/* Results Banner */}
        <div className="flex flex-col justify-between rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:border-blue-900/50 dark:from-blue-950/40 dark:to-indigo-950/40">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
              Final Out-Of-Pocket Price
            </span>
            <p className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white">
              ${calculations.finalPrice}
            </p>
          </div>

          <div className="mt-6 space-y-2 border-t border-blue-200/60 pt-4 dark:border-blue-900/60">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Total Money Saved:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">${calculations.totalSavings}</span>
            </div>
            {Number(calculations.taxAmount) > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Estimated Sales Tax:</span>
                <span className="font-medium">${calculations.taxAmount}</span>
              </div>
            )}
            <p className="mt-2 text-[10px] text-slate-400">
              Estimates for personal planning only. Final store checkout prices may vary slightly based on state rounding rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 22. TIP CALCULATOR
// -------------------------------------------------------------
export const TipCalculatorTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [bill, setBill] = useState<number>(85);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [people, setPeople] = useState<number>(2);
  const [roundUp, setRoundUp] = useState<boolean>(false);

  const stats = useMemo(() => {
    const rawTip = bill * (tipPercent / 100);
    let total = bill + rawTip;
    if (roundUp) {
      total = Math.ceil(total);
    }
    const tipAmount = total - bill;
    const splitCount = Math.max(1, people);
    const tipPerPerson = tipAmount / splitCount;
    const totalPerPerson = total / splitCount;

    return {
      tipAmount: tipAmount.toFixed(2),
      totalBill: total.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2),
      totalPerPerson: totalPerPerson.toFixed(2),
    };
  }, [bill, tipPercent, people, roundUp]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Total Check / Bill ($)</label>
            <input
              type="number"
              min={0}
              step={0.5}
              value={bill}
              onChange={(e) => {
                setBill(Number(e.target.value));
                onTaskCompleted?.();
              }}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-base font-semibold dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">
              Tip Percentage: {tipPercent}%
            </label>
            <div className="flex flex-wrap gap-2">
              {[10, 15, 18, 20, 25].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setTipPercent(pct)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold ${
                    tipPercent === pct
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Split Between People: {people}
            </label>
            <input
              type="range"
              min={1}
              max={20}
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="mt-2 w-full accent-blue-600"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={roundUp}
              onChange={(e) => setRoundUp(e.target.checked)}
              className="rounded accent-blue-600"
            />
            <span>Round up total bill to nearest whole dollar</span>
          </label>
        </div>

        {/* Breakdown Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 dark:border-emerald-900/50 dark:from-emerald-950/30 dark:to-teal-950/30">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Total Per Person
            </span>
            <p className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white">
              ${stats.totalPerPerson}
            </p>
            <p className="mt-1 text-xs text-slate-500">Includes ${stats.tipPerPerson} tip each</p>
          </div>

          <div className="mt-6 space-y-2 border-t border-emerald-200/60 pt-4 dark:border-emerald-900/60 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Total Tip:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">${stats.tipAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Grand Total Check:</span>
              <span className="font-bold text-slate-900 dark:text-white">${stats.totalBill}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 23. BMI CALCULATOR
// -------------------------------------------------------------
export const BmiCalculatorTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  // Metric: weight kg, height cm
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(175);
  // Imperial: weight lbs, height feet & inches
  const [weightLbs, setWeightLbs] = useState<number>(155);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(9);

  const bmi = useMemo(() => {
    let score = 0;
    if (unit === 'metric') {
      if (heightCm > 0 && weightKg > 0) {
        const heightM = heightCm / 100;
        score = weightKg / (heightM * heightM);
      }
    } else {
      const totalInches = heightFeet * 12 + heightInches;
      if (totalInches > 0 && weightLbs > 0) {
        score = (703 * weightLbs) / (totalInches * totalInches);
      }
    }
    return score > 0 ? parseFloat(score.toFixed(1)) : 0;
  }, [unit, weightKg, heightCm, weightLbs, heightFeet, heightInches]);

  const getBmiCategory = (score: number) => {
    if (score < 18.5) return { name: 'Underweight', color: 'text-amber-500', bar: 'w-1/4 bg-amber-400' };
    if (score <= 24.9) return { name: 'Normal Healthy Weight', color: 'text-emerald-600', bar: 'w-1/2 bg-emerald-500' };
    if (score <= 29.9) return { name: 'Overweight', color: 'text-amber-600', bar: 'w-3/4 bg-amber-500' };
    return { name: 'Obesity Class', color: 'text-red-600', bar: 'w-full bg-red-500' };
  };

  const category = getBmiCategory(bmi);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setUnit('metric')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            unit === 'metric' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          Metric Units (kg / cm)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            unit === 'imperial' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          Imperial Units (lbs / ft-in)
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {unit === 'metric' ? (
            <>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => {
                    setHeightCm(Number(e.target.value));
                    onTaskCompleted?.();
                  }}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Weight (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => {
                    setWeightKg(Number(e.target.value));
                    onTaskCompleted?.();
                  }}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Feet</label>
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Inches</label>
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Weight (lbs)</label>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </>
          )}
        </div>

        {/* Results Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Body Mass Index</span>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">{bmi}</span>
              <span className={`text-base font-bold ${category.color}`}>{category.name}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 flex">
              <div className="h-full w-1/4 bg-blue-300" title="Underweight (<18.5)" />
              <div className="h-full w-1/4 bg-emerald-500" title="Normal (18.5 - 24.9)" />
              <div className="h-full w-1/4 bg-amber-400" title="Overweight (25 - 29.9)" />
              <div className="h-full w-1/4 bg-red-500" title="Obese (30+)" />
            </div>

            <p className="text-[11px] text-slate-400">
              Disclaimer: Body Mass Index (BMI) is an approximate population screening tool and does not replace professional medical evaluation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 24. DATE DIFFERENCE CALCULATOR
// -------------------------------------------------------------
export const DateDifferenceTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [includeEndDay, setIncludeEndDay] = useState(true);

  const diffData = useMemo(() => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(endDate + 'T00:00:00');

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return null;

    let calendarDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (includeEndDay) calendarDays += 1;

    // Count weekdays vs weekends
    let businessDays = 0;
    let weekendDays = 0;
    const cur = new Date(start.getTime());
    const limit = new Date(end.getTime());
    if (includeEndDay) limit.setDate(limit.getDate() + 1);

    while (cur < limit) {
      const dayOfWeek = cur.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      } else {
        businessDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    return {
      calendarDays,
      businessDays,
      weekendDays,
      weeks: (calendarDays / 7).toFixed(1),
    };
  }, [startDate, endDate, includeEndDay]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                onTaskCompleted?.();
              }}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                onTaskCompleted?.();
              }}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={includeEndDay}
              onChange={(e) => setIncludeEndDay(e.target.checked)}
              className="rounded accent-blue-600"
            />
            <span>Include end date (make calculation inclusive)</span>
          </label>
        </div>
      </div>

      {diffData && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-semibold text-slate-500">Total Days</span>
            <p className="mt-1 text-2xl font-extrabold text-blue-600 dark:text-blue-400">{diffData.calendarDays}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-semibold text-slate-500">Business Days</span>
            <p className="mt-1 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{diffData.businessDays}</p>
            <span className="text-[10px] text-slate-400">Mon - Fri</span>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-semibold text-slate-500">Weekend Days</span>
            <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{diffData.weekendDays}</p>
            <span className="text-[10px] text-slate-400">Sat - Sun</span>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-semibold text-slate-500">Total Weeks</span>
            <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{diffData.weeks}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 25. TIME DURATION CALCULATOR
// -------------------------------------------------------------
export const TimeDurationTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [startTime, setStartTime] = useState('09:15');
  const [endTime, setEndTime] = useState('17:45');

  const duration = useMemo(() => {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    let startTotalM = startH * 60 + startM;
    let endTotalM = endH * 60 + endM;

    // Support overnight shift
    if (endTotalM < startTotalM) {
      endTotalM += 24 * 60;
    }

    const diffM = endTotalM - startTotalM;
    const hours = Math.floor(diffM / 60);
    const minutes = diffM % 60;
    const decimalHours = (diffM / 60).toFixed(2);

    return { hours, minutes, decimalHours, totalMinutes: diffM };
  }, [startTime, endTime]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                onTaskCompleted?.();
              }}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-base font-semibold dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                onTaskCompleted?.();
              }}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-base font-semibold dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6 dark:border-blue-900/50 dark:bg-slate-900">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            Elapsed Hours & Minutes
          </span>
          <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
            {duration.hours} hrs {duration.minutes} mins
          </p>
          <span className="text-xs text-slate-500">({duration.totalMinutes} total minutes)</span>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 dark:border-emerald-900/50 dark:bg-slate-900">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            Decimal Hours (for Timesheets)
          </span>
          <p className="mt-2 text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {duration.decimalHours} <span className="text-sm font-semibold">hours</span>
          </p>
          <span className="text-xs text-slate-500">Standard for hourly billing & invoicing</span>
        </div>
      </div>
    </div>
  );
};
