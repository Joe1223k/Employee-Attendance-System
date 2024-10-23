import React from 'react';
import { Clock, LogIn, LogOut } from 'lucide-react';

// タイムカードコンポーネントのプロパティ定義
interface TimeCardProps {
  timeRecord: {
    checkIn: Date | null;    // 出勤時刻
    checkOut: Date | null;   // 退勤時刻
    workingHours: string;    // 勤務時間
  };
  isWorking: boolean;        // 勤務状態
  currentTime: Date;         // 現在時刻
  onCheckIn: () => void;     // 出勤処理関数
  onCheckOut: () => void;    // 退勤処理関数
}

export function TimeCard({ timeRecord, isWorking, currentTime, onCheckIn, onCheckOut }: TimeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      {/* ヘッダー部分：タイトルと現在時刻 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">タイムカード</h2>
        <div className="flex items-center text-gray-600">
          <Clock className="w-5 h-5 mr-2" />
          <span className="font-mono">
            {currentTime.toLocaleTimeString('ja-JP')}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* 出退勤ボタン */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCheckIn}
            disabled={isWorking}
            className={`flex items-center px-6 py-3 rounded-lg text-white font-medium transition-all ${
              isWorking
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            <LogIn className="w-5 h-5 mr-2" />
            出勤
          </button>
          <button
            onClick={onCheckOut}
            disabled={!isWorking}
            className={`flex items-center px-6 py-3 rounded-lg text-white font-medium transition-all ${
              !isWorking
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            <LogOut className="w-5 h-5 mr-2" />
            退勤
          </button>
        </div>

        {/* 勤務情報表示部分 */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-2 gap-4">
            {/* 出勤時刻表示 */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">出勤時刻</p>
              <p className="font-mono text-lg">
                {timeRecord.checkIn
                  ? timeRecord.checkIn.toLocaleTimeString('ja-JP')
                  : '--:--:--'}
              </p>
            </div>
            {/* 退勤時刻表示 */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">退勤時刻</p>
              <p className="font-mono text-lg">
                {timeRecord.checkOut
                  ? timeRecord.checkOut.toLocaleTimeString('ja-JP')
                  : '--:--:--'}
              </p>
            </div>
          </div>
          {/* 勤務時間表示 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">勤務時間</p>
            <p className="font-mono text-3xl font-bold text-indigo-600">
              {timeRecord.workingHours}
            </p>
          </div>
        </div>

        {/* 勤務状態メッセージ */}
        <div className="text-center text-sm text-gray-500">
          {isWorking ? (
            <p className="text-green-600 font-medium">現在勤務中です</p>
          ) : (
            <p>お疲れ様でした</p>
          )}
        </div>
      </div>
    </div>
  );
}