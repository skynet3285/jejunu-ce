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

type NullableDate = Date | null;

interface PeriodType {
  start: NullableDate;
  end : NullableDate;
}

export default function PensionOwnReservation() {
  const [period, setPeriod] = useState<PeriodType>({start: null, end : null});
  const [value, setValue] = useState<NullableDate | [NullableDate, NullableDate]>([null, null]);
  const [selectedDays, setSelectedDays] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

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
      const { start, end } = period;
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
    if(value) {
      if (Array.isArray(value)) {
        setPeriod({start: value[0], end: value[1]});
      } else {
        setPeriod({start: value, end: value});
      }
    }
  }, [value]);

  useEffect(() => {
      const {start, end} = period;
      if (!start || !end) {
        return;
      }
      const diffInTime = Math.abs(end.getTime() - start.getTime());
      const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
      setSelectedDays(diffInDays);
    
  }, [period]);

  return (
    <div className="flex flex-col">
      <StyledCalendarWrapper>
        <StyledCalendar
          selectRange
          onChange={(v) => {
            if (isActive === false) {
              setValue(v);
            }
          }}
          value={value}
          tileClassName={tileClassName}
          calendarType="gregory"
        />
      </StyledCalendarWrapper>
      {isActive === false ? (
      <button
        onClick={() => {
          if(selectedDays === 0) {
            alert('예약일을 선택하세요');
          }
          else {
            setIsActive(true);
          }
        }}
        className="mt-4 h-8 rounded bg-red-600 text-white"
        type="button" >
        펜션 사용권 {selectedDays > 0 ? `${selectedDays}장으로` : ''} 예약하기
      </button>) : (
      <>
        <button
          className="mt-4 h-8 rounded bg-gray-400 text-white text-center items-center"
          type="button">
          펜션 예약완료
        </button>
        <div className="flex flex-col text-purple-700 text-center my-4">
          <p>
            {period.start?.toLocaleDateString()} ~ {period.end?.toLocaleDateString()} ({selectedDays}일)
          </p>
          <p>
            펜션 이용 예약되었습니다
          </p>
        </div>
      </>
      )
      }
    </div>
  );
}
