import { getMonth, getYear } from 'date-fns';
import React from 'react';
import DatePicker from 'react-modern-calendar-datepicker';

const DatePickerCustom = ({ selectedDate, setSelectedDate }) => {
  // date picker customization
  const valideYears = Array.from(
    { length: getYear(new Date()) - 1990 + 1 },
    (_, index) => 1990 + index
  );
  const allMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <div>
      <DatePicker
        className="lg:w-[330px] px-4 py-3 rounded-md border-[#e5e7eb]  text-gray-900 p-[0.65rem] w-full  focus:ring outline-none  border focus:ring-opacity-75 focus:ring-violet-400"
        customInput={<input className="w-full" />}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex justify-between p-2 gap-2">
            <button
              type="button"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="focus:outline-none text-xl font-semibold"
            >
              {'<'}
            </button>
            <div className="flex gap-2">
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(value)}
                className="outline-none rounded-md text-xs scrollbar-thin scrollbar-thumb-blue-600 scrollbar-thumb-rounded-md scrollbar-track-slate-300"
              >
                {valideYears.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={allMonths[getMonth(date)]}
                onChange={({ target: { value } }) => changeMonth(allMonths.indexOf(value))}
                className="outline-none text-xs rounded-md"
              >
                {allMonths.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="focus:outline-none text-xl font-semibold"
            >
              {'>'}
            </button>
          </div>
        )}
        selected={selectedDate || ''}
        onChange={(date) => setSelectedDate(date)}
        placeholderText="Select date"
      />
    </div>
  );
};

export default DatePickerCustom;
