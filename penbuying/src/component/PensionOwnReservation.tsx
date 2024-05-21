import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledCalendar = styled(Calendar)`
  border: none;

  .react-calendar {
    max-width: 400px;
    background: #fff;
    font-family: Helvetica, sans-serif;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    background: #007bff;
    color: white;
  }

  .react-calendar__tile--highlight {
    background: #90cdf4;
    color: white;
  }

  .react-calendar__tile--hover {
    background: #f0f0f0;
  }
`;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function PensionOwnReservation() {
  const [value, onChange] = useState<Value>([null, null]);
  const [selectedDays, setSelectedDays] = useState<number | null>(null);

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const [start, end] = value as [Date | null, Date | null];
      if (start && end && date >= start && date <= end) {
        return 'react-calendar__tile--highlight';
      }
    }
    if (isToday(date)) {
      return 'react-calendar__tile--today';
    }
    return null;
  };

  useEffect(() => {
    if (value) {
      const [start, end] = value as [Date | null, Date | null];
      if (!start || !end) {
        return;
      }
      const diffInTime = Math.abs(end.getTime() - start.getTime());
      const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
      setSelectedDays(diffInDays);
    } else {
      setSelectedDays(null);
    }
  }, [value]);

  return (
    <div className="flex flex-col">
      <StyledCalendarWrapper>
        <StyledCalendar
          selectRange
          onChange={onChange}
          value={value}
          tileClassName={tileClassName}
          calendarType="gregory"
        />
      </StyledCalendarWrapper>
      <button type="button" className="mt-4 h-8 rounded bg-red-600 text-white">
        펜션 사용권{selectedDays !== null ? selectedDays : '0'}장으로 예약하기
      </button>
    </div>
  );
}
