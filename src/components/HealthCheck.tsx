import React, { useState } from 'react';
import { ThermometerSun, Heart } from 'lucide-react';

// 健康状態の型定義
interface HealthStatus {
  temperature: string;   // 体温
  condition: string;     // 体調状態
}

export function HealthCheck() {
  // 健康状態の管理
  const [health, setHealth] = useState<HealthStatus>({
    temperature: '',
    condition: '良好'
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      {/* コンポーネントヘッダー */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Heart className="w-5 h-5 mr-2 text-red-500" />
        健康チェック
      </h2>
      <div className="space-y-4">
        {/* 体温入力フォーム */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            <ThermometerSun className="w-4 h-4 inline mr-2" />
            体温
          </label>
          <div className="flex items-center">
            <input
              type="number"
              step="0.1"
              value={health.temperature}
              onChange={(e) => setHealth({ ...health, temperature: e.target.value })}
              className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="36.5"
            />
            <span className="ml-2">℃</span>
          </div>
        </div>
        {/* 体調選択フォーム */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">体調</label>
          <select
            value={health.condition}
            onChange={(e) => setHealth({ ...health, condition: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="良好">良好</option>
            <option value="普通">普通</option>
            <option value="やや疲れ気味">やや疲れ気味</option>
            <option value="体調不良">体調不良</option>
          </select>
        </div>
      </div>
    </div>
  );
}