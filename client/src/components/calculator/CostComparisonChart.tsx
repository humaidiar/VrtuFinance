import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  Label
} from 'recharts';
import { type CalculationResult } from '@shared/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CostComparisonChartProps {
  result: CalculationResult;
}

const CostComparisonChart: React.FC<CostComparisonChartProps> = ({ result }) => {
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // We'll get the comparison data from the calculation result
  const comparisonData = result.costComparison;
  
  // Find a good reference year to highlight (around year 3)
  const referenceYear = comparisonData[Math.min(3, comparisonData.length - 1)];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumulative Cost Comparison</CardTitle>
        <CardDescription>
          See how Diminishing Musharaka compares to a conventional mortgage over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={comparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} 
              />
              <YAxis 
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                domain={['dataMin', 'dataMax']}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Legend />
              
              {/* Reference point to highlight savings at a specific year */}
              {referenceYear && (
                <ReferenceLine
                  x={referenceYear.year}
                  stroke="#888"
                  strokeDasharray="3 3"
                  label={{ 
                    value: `Year ${referenceYear.year}`, 
                    position: 'insideTopLeft',
                    fill: '#666',
                    fontSize: 12
                  }}
                />
              )}
              
              <Line 
                type="monotone" 
                dataKey="musharakaCost" 
                name="Diminishing Musharaka" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ r: 1 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="conventionalCost" 
                name="Conventional Mortgage" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ r: 1 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Savings summary */}
        <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-md p-4 text-center">
          <h3 className="text-lg font-semibold text-emerald-800">
            Cost Savings with Diminishing Musharaka
          </h3>
          <p className="text-emerald-700 mt-2">
            Over {result.fullOwnershipYears} years, you could save approximately {formatCurrency(result.totalSavings)} compared to a conventional mortgage at current interest rates.
          </p>
          {referenceYear && (
            <p className="text-emerald-700 mt-1">
              By Year {referenceYear.year}, you'll already save {formatCurrency(referenceYear.savings)}.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CostComparisonChart;