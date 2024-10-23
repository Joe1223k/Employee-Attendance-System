import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';

// 作業日報の型定義
interface WorkReport {
  tasks: string;      // 作業内容
  comments: string;   // 特記事項・引き継ぎ事項
}

export function WorkReport() {
  // 作業日報の状態管理
  const [report, setReport] = useState<WorkReport>({
    tasks: '',
    comments: ''
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      {/* コンポーネントヘッダー */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <ClipboardList className="w-5 h-5 mr-2 text-blue-500" />
        作業日報
      </h2>
      <div className="space-y-4">
        {/* 作業内容入力エリア */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">本日の作業内容</label>
          <textarea
            value={report.tasks}
            onChange={(e) => setReport({ ...report, tasks: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32"
            placeholder="作業内容を入力してください"
          />
        </div>
        {/* 特記事項入力エリア */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">特記事項・引き継ぎ事項</label>
          <textarea
            value={report.comments}
            onChange={(e) => setReport({ ...report, comments: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24"
            placeholder="特記事項があれば入力してください"
          />
        </div>
      </div>
    </div>
  );
}