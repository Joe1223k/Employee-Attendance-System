import React, { useState, useEffect } from 'react';
import { TimeCard } from './components/TimeCard';
import { HealthCheck } from './components/HealthCheck';
import { WorkReport } from './components/WorkReport';

// タイムレコードの型定義
interface TimeRecord {
  checkIn: Date | null;   // 出勤時刻
  checkOut: Date | null;  // 退勤時刻
  workingHours: string;   // 勤務時間
}

function App() {
  // 勤怠記録の状態管理
  const [timeRecord, setTimeRecord] = useState<TimeRecord>({
    checkIn: null,
    checkOut: null,
    workingHours: '00:00'
  });
  
  // 勤務状態の管理（true: 勤務中, false: 退勤済み）
  const [isWorking, setIsWorking] = useState(false);
  
  // 現在時刻の状態管理
  const [currentTime, setCurrentTime] = useState(new Date());

  // タイマーによる時刻更新と勤務時間の計算
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // 勤務中の場合、勤務時間を計算
      if (isWorking && timeRecord.checkIn) {
        const duration = new Date().getTime() - timeRecord.checkIn.getTime();
        const hours = Math.floor(duration / (1000 * 60 * 60));
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
        setTimeRecord(prev => ({
          ...prev,
          workingHours: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
        }));
      }
    }, 1000);

    // コンポーネントのアンマウント時にタイマーをクリア
    return () => clearInterval(timer);
  }, [isWorking, timeRecord.checkIn]);

  // 出勤処理
  const handleCheckIn = () => {
    setTimeRecord({
      checkIn: new Date(),
      checkOut: null,
      workingHours: '00:00'
    });
    setIsWorking(true);
  };

  // 退勤処理
  const handleCheckOut = () => {
    setTimeRecord(prev => ({
      ...prev,
      checkOut: new Date()
    }));
    setIsWorking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">勤怠管理システム</h1>
        <div className="max-w-3xl mx-auto">
          {/* タイムカードコンポーネント */}
          <TimeCard
            timeRecord={timeRecord}
            isWorking={isWorking}
            currentTime={currentTime}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
          {/* 健康チェックと作業日報を2カラムで表示 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HealthCheck />
            <WorkReport />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;