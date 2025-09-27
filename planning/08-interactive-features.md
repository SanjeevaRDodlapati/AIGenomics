# Interactive Features Specification - AI Science Portfolio

## 🧪 Interactive Code Execution System

### Core Architecture

#### Client-Side Python Execution with Pyodide
```typescript
// lib/pyodide-manager.ts
import { loadPyodide, PyodideInterface } from 'pyodide';

export class PyodideManager {
  private static instance: PyodideManager;
  private pyodide: PyodideInterface | null = null;
  private isLoading: boolean = false;
  private loadingPromise: Promise<void> | null = null;

  static getInstance(): PyodideManager {
    if (!PyodideManager.instance) {
      PyodideManager.instance = new PyodideManager();
    }
    return PyodideManager.instance;
  }

  async initialize(): Promise<void> {
    if (this.pyodide) return;
    if (this.isLoading) return this.loadingPromise!;

    this.isLoading = true;
    this.loadingPromise = this.loadPyodide();
    await this.loadingPromise;
    this.isLoading = false;
  }

  private async loadPyodide(): Promise<void> {
    this.pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
    });
    
    // Install common scientific packages
    await this.pyodide.loadPackage([
      'numpy',
      'pandas',
      'matplotlib',
      'scipy',
      'scikit-learn',
      'seaborn'
    ]);
    
    // Set up matplotlib for web display
    await this.pyodide.runPython(`
      import matplotlib.pyplot as plt
      import matplotlib
      matplotlib.use('Agg')
      
      import io
      import base64
      
      def save_plot():
          buf = io.BytesIO()
          plt.savefig(buf, format='png', dpi=150, bbox_inches='tight')
          buf.seek(0)
          img_base64 = base64.b64encode(buf.getvalue()).decode()
          plt.close()
          return img_base64
    `);
  }

  async executeCode(code: string): Promise<ExecutionResult> {
    if (!this.pyodide) {
      await this.initialize();
    }

    try {
      // Capture output
      await this.pyodide!.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
        sys.stderr = StringIO()
      `);

      // Execute user code
      const result = this.pyodide!.runPython(code);
      
      // Get captured output
      const stdout = this.pyodide!.runPython('sys.stdout.getvalue()');
      const stderr = this.pyodide!.runPython('sys.stderr.getvalue()');
      
      // Check if matplotlib plot was created
      let plotImage: string | null = null;
      try {
        plotImage = this.pyodide!.runPython('save_plot()');
      } catch (e) {
        // No plot was created
      }

      return {
        success: true,
        result: result?.toString() || '',
        stdout: stdout || '',
        stderr: stderr || '',
        plotImage,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async installPackage(packageName: string): Promise<void> {
    if (!this.pyodide) {
      await this.initialize();
    }
    await this.pyodide!.loadPackage(packageName);
  }
}

export interface ExecutionResult {
  success: boolean;
  result?: string;
  stdout?: string;
  stderr?: string;
  plotImage?: string;
  error?: string;
}
```

#### Interactive Code Cell Component
```typescript
// components/interactive/CodeCell.tsx
import React, { useState, useCallback } from 'react';
import { Play, Copy, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PyodideManager, ExecutionResult } from '@/lib/pyodide-manager';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeCellProps {
  initialCode: string;
  language?: 'python' | 'javascript' | 'r';
  title?: string;
  showOutput?: boolean;
  allowExecution?: boolean;
  colabUrl?: string;
  binderUrl?: string;
}

export const CodeCell: React.FC<CodeCellProps> = ({
  initialCode,
  language = 'python',
  title,
  showOutput = true,
  allowExecution = true,
  colabUrl,
  binderUrl,
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<ExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const executeCode = useCallback(async () => {
    if (language !== 'python') {
      console.warn('Only Python execution is currently supported');
      return;
    }

    setIsExecuting(true);
    try {
      const manager = PyodideManager.getInstance();
      const result = await manager.executeCode(code);
      setOutput(result);
    } catch (error) {
      setOutput({
        success: false,
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsExecuting(false);
    }
  }, [code, language]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(code);
    // Show toast notification
  }, [code]);

  const downloadCode = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [code, language]);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-muted border-b border-border">
        <div className="flex items-center gap-2">
          {title && <h3 className="font-medium text-sm">{title}</h3>}
          <span className="text-xs text-muted-foreground uppercase">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {allowExecution && (
            <Button
              size="sm"
              variant="ghost"
              onClick={executeCode}
              disabled={isExecuting}
            >
              <Play className="h-4 w-4" />
              {isExecuting ? 'Running...' : 'Run'}
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={copyToClipboard}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={downloadCode}>
            <Download className="h-4 w-4" />
          </Button>
          {colabUrl && (
            <Button size="sm" variant="ghost" asChild>
              <a href={colabUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Colab
              </a>
            </Button>
          )}
          {binderUrl && (
            <Button size="sm" variant="ghost" asChild>
              <a href={binderUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Binder
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Code Editor */}
      <div className="relative">
        {isEditable ? (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-4 font-mono text-sm bg-transparent resize-none"
            rows={code.split('\n').length}
            onBlur={() => setIsEditable(false)}
            autoFocus
          />
        ) : (
          <div onClick={() => setIsEditable(true)} className="cursor-text">
            <SyntaxHighlighter
              language={language}
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: '1rem',
                background: 'transparent',
              }}
              showLineNumbers
            >
              {code}
            </SyntaxHighlighter>
          </div>
        )}
      </div>

      {/* Output */}
      {showOutput && output && (
        <div className="border-t border-border bg-muted/50">
          {output.success ? (
            <div className="p-4 space-y-4">
              {output.stdout && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Output:</h4>
                  <pre className="text-sm bg-background p-3 rounded border overflow-x-auto">
                    {output.stdout}
                  </pre>
                </div>
              )}
              {output.result && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Result:</h4>
                  <pre className="text-sm bg-background p-3 rounded border overflow-x-auto">
                    {output.result}
                  </pre>
                </div>
              )}
              {output.plotImage && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Plot:</h4>
                  <img
                    src={`data:image/png;base64,${output.plotImage}`}
                    alt="Generated plot"
                    className="max-w-full h-auto border rounded"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="p-4">
              <h4 className="text-sm font-medium mb-2 text-destructive">Error:</h4>
              <pre className="text-sm bg-destructive/10 text-destructive p-3 rounded border overflow-x-auto">
                {output.error}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

### Interactive Data Visualization

#### Chart Component with User Controls
```typescript
// components/interactive/InteractiveChart.tsx
import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataPoint {
  [key: string]: string | number;
}

interface InteractiveChartProps {
  data: DataPoint[];
  title?: string;
  availableColumns: string[];
  defaultChartType?: 'line' | 'bar' | 'scatter';
  defaultXAxis?: string;
  defaultYAxis?: string;
  allowDownload?: boolean;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  data,
  title = 'Interactive Chart',
  availableColumns,
  defaultChartType = 'line',
  defaultXAxis = availableColumns[0],
  defaultYAxis = availableColumns[1],
  allowDownload = true,
}) => {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'scatter'>(defaultChartType);
  const [xAxis, setXAxis] = useState(defaultXAxis);
  const [yAxis, setYAxis] = useState(defaultYAxis);
  const [colorBy, setColorBy] = useState<string | null>(null);
  const [sampleSize, setSampleSize] = useState([data.length]);

  const processedData = useMemo(() => {
    const sampledData = data.slice(0, sampleSize[0]);
    return sampledData.map((point) => ({
      ...point,
      x: point[xAxis],
      y: point[yAxis],
      color: colorBy ? point[colorBy] : '#3b82f6',
    }));
  }, [data, xAxis, yAxis, colorBy, sampleSize]);

  const downloadChart = () => {
    const csvContent = [
      availableColumns.join(','),
      ...processedData.map(point => availableColumns.map(col => point[col]).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart-data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderChart = () => {
    const commonProps = {
      width: '100%',
      height: 400,
      data: processedData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="y" fill="#3b82f6" />
          </BarChart>
        );
      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis dataKey="y" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={processedData} fill="#3b82f6" />
          </ScatterChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Chart Type:</label>
            <Select value={chartType} onValueChange={(value: any) => setChartType(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="scatter">Scatter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">X-Axis:</label>
            <Select value={xAxis} onValueChange={setXAxis}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableColumns.map((col) => (
                  <SelectItem key={col} value={col}>{col}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Y-Axis:</label>
            <Select value={yAxis} onValueChange={setYAxis}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableColumns.map((col) => (
                  <SelectItem key={col} value={col}>{col}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {allowDownload && (
            <Button variant="outline" size="sm" onClick={downloadChart}>
              Download Data
            </Button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Sample Size:</label>
          <div className="flex-1 max-w-xs">
            <Slider
              value={sampleSize}
              onValueChange={setSampleSize}
              max={data.length}
              min={10}
              step={Math.ceil(data.length / 100)}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {sampleSize[0]} / {data.length} points
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
```

## 🧮 Mathematical Content Rendering

### KaTeX Integration for Mathematical Formulas
```typescript
// components/math/MathRenderer.tsx
import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface MathProps {
  children: string;
  block?: boolean;
  className?: string;
}

export const Math: React.FC<MathProps> = ({ 
  children, 
  block = false, 
  className = '' 
}) => {
  try {
    if (block) {
      return (
        <div className={`my-4 p-4 bg-muted/50 rounded-lg border ${className}`}>
          <BlockMath math={children} />
        </div>
      );
    } else {
      return (
        <span className={`inline-math ${className}`}>
          <InlineMath math={children} />
        </span>
      );
    }
  } catch (error) {
    return (
      <span className="text-destructive font-mono text-sm bg-destructive/10 px-1 rounded">
        Math Error: {children}
      </span>
    );
  }
};

// Usage in MDX:
// <Math>P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}</Math>
// <Math block>
//   \begin{aligned}
//   f(x) &= ax^2 + bx + c \\
//   f'(x) &= 2ax + b
//   \end{aligned}
// </Math>
```

### Interactive Parameter Explorer
```typescript
// components/interactive/ParameterExplorer.tsx
import React, { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Math } from '@/components/math/MathRenderer';

interface Parameter {
  name: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  description?: string;
}

interface ParameterExplorerProps {
  title: string;
  formula: string;
  parameters: Parameter[];
  func: (params: Record<string, number>, x: number) => number;
  xRange?: [number, number];
  xLabel?: string;
  yLabel?: string;
}

export const ParameterExplorer: React.FC<ParameterExplorerProps> = ({
  title,
  formula,
  parameters,
  func,
  xRange = [-10, 10],
  xLabel = 'x',
  yLabel = 'f(x)',
}) => {
  const [paramValues, setParamValues] = useState(
    parameters.reduce((acc, param) => {
      acc[param.name] = param.defaultValue;
      return acc;
    }, {} as Record<string, number>)
  );

  const data = useMemo(() => {
    const points = [];
    const step = (xRange[1] - xRange[0]) / 200;
    for (let x = xRange[0]; x <= xRange[1]; x += step) {
      try {
        const y = func(paramValues, x);
        if (isFinite(y)) {
          points.push({ x: Number(x.toFixed(3)), y: Number(y.toFixed(3)) });
        }
      } catch (error) {
        // Skip invalid points
      }
    }
    return points;
  }, [paramValues, func, xRange]);

  const updateParameter = (paramName: string, value: number[]) => {
    setParamValues(prev => ({
      ...prev,
      [paramName]: value[0],
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="bg-muted/50 p-4 rounded-lg">
          <Math block>{formula}</Math>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Parameter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parameters.map((param) => (
            <div key={param.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">{param.label}</label>
                <span className="text-sm text-muted-foreground">
                  {paramValues[param.name].toFixed(2)}
                </span>
              </div>
              <Slider
                value={[paramValues[param.name]]}
                onValueChange={(value) => updateParameter(param.name, value)}
                min={param.min}
                max={param.max}
                step={param.step}
                className="w-full"
              />
              {param.description && (
                <p className="text-xs text-muted-foreground">{param.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* Visualization */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" label={{ value: xLabel, position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: yLabel, angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Current Values Display */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Current Parameter Values:</h4>
          <div className="flex flex-wrap gap-4">
            {parameters.map((param) => (
              <span key={param.name} className="text-sm">
                <strong>{param.label}:</strong> {paramValues[param.name].toFixed(2)}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Usage example:
// <ParameterExplorer
//   title="Quadratic Function Explorer"
//   formula="f(x) = ax^2 + bx + c"
//   parameters={[
//     { name: 'a', label: 'a (coefficient)', min: -5, max: 5, step: 0.1, defaultValue: 1 },
//     { name: 'b', label: 'b (coefficient)', min: -10, max: 10, step: 0.5, defaultValue: 0 },
//     { name: 'c', label: 'c (constant)', min: -10, max: 10, step: 0.5, defaultValue: 0 }
//   ]}
//   func={(params, x) => params.a * x * x + params.b * x + params.c}
//   xRange={[-5, 5]}
// />
```

## 📊 Data Analysis Widgets

### Statistical Summary Component
```typescript
// components/interactive/StatisticalSummary.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatisticalSummaryProps {
  data: number[];
  title?: string;
  precision?: number;
}

export const StatisticalSummary: React.FC<StatisticalSummaryProps> = ({
  data,
  title = 'Statistical Summary',
  precision = 3,
}) => {
  const stats = React.useMemo(() => {
    if (data.length === 0) return null;

    const sorted = [...data].sort((a, b) => a - b);
    const n = data.length;
    const mean = data.reduce((sum, val) => sum + val, 0) / n;
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    
    const q1Index = Math.floor(n * 0.25);
    const medianIndex = Math.floor(n * 0.5);
    const q3Index = Math.floor(n * 0.75);

    return {
      count: n,
      mean: mean.toFixed(precision),
      median: sorted[medianIndex].toFixed(precision),
      mode: findMode(data)?.toFixed(precision) || 'N/A',
      stdDev: stdDev.toFixed(precision),
      variance: variance.toFixed(precision),
      min: sorted[0].toFixed(precision),
      max: sorted[n - 1].toFixed(precision),
      q1: sorted[q1Index].toFixed(precision),
      q3: sorted[q3Index].toFixed(precision),
      range: (sorted[n - 1] - sorted[0]).toFixed(precision),
      skewness: calculateSkewness(data, mean, stdDev).toFixed(precision),
      kurtosis: calculateKurtosis(data, mean, stdDev).toFixed(precision),
    };
  }, [data, precision]);

  if (!stats) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
          <Badge variant="secondary">{stats.count} points</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <StatItem label="Mean" value={stats.mean} />
          <StatItem label="Median" value={stats.median} />
          <StatItem label="Mode" value={stats.mode} />
          <StatItem label="Std Dev" value={stats.stdDev} />
          <StatItem label="Variance" value={stats.variance} />
          <StatItem label="Min" value={stats.min} />
          <StatItem label="Max" value={stats.max} />
          <StatItem label="Range" value={stats.range} />
          <StatItem label="Q1" value={stats.q1} />
          <StatItem label="Q3" value={stats.q3} />
          <StatItem label="Skewness" value={stats.skewness} />
          <StatItem label="Kurtosis" value={stats.kurtosis} />
        </div>
      </CardContent>
    </Card>
  );
};

const StatItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-center p-3 bg-muted/50 rounded-lg">
    <div className="text-lg font-mono font-bold">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

function findMode(data: number[]): number | null {
  const frequency: { [key: number]: number } = {};
  let maxFreq = 0;
  let mode: number | null = null;

  data.forEach(value => {
    frequency[value] = (frequency[value] || 0) + 1;
    if (frequency[value] > maxFreq) {
      maxFreq = frequency[value];
      mode = value;
    }
  });

  return maxFreq > 1 ? mode : null;
}

function calculateSkewness(data: number[], mean: number, stdDev: number): number {
  if (stdDev === 0) return 0;
  const n = data.length;
  const sum = data.reduce((acc, val) => acc + Math.pow((val - mean) / stdDev, 3), 0);
  return (n / ((n - 1) * (n - 2))) * sum;
}

function calculateKurtosis(data: number[], mean: number, stdDev: number): number {
  if (stdDev === 0) return 0;
  const n = data.length;
  const sum = data.reduce((acc, val) => acc + Math.pow((val - mean) / stdDev, 4), 0);
  return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sum - (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));
}
```

## 🔗 External Platform Integration

### Google Colab Integration
```typescript
// lib/colab-integration.ts
export function generateColabUrl(
  notebookContent: string,
  title: string = 'Interactive Analysis'
): string {
  // Create a notebook structure
  const notebook = {
    nbformat: 4,
    nbformat_minor: 2,
    metadata: {
      colab: {
        name: title,
        version: "0.3.2",
        provenance: [],
        collapsed_sections: []
      },
      kernelspec: {
        name: "python3",
        display_name: "Python 3"
      }
    },
    cells: [
      {
        cell_type: "markdown",
        metadata: {},
        source: [`# ${title}\n\nGenerated from AI Science Portfolio`]
      },
      {
        cell_type: "code",
        metadata: {},
        source: [notebookContent],
        outputs: [],
        execution_count: null
      }
    ]
  };

  // Encode the notebook
  const encodedNotebook = encodeURIComponent(JSON.stringify(notebook));
  
  // Create GitHub Gist URL (Colab can import from Gist)
  return `https://colab.research.google.com/github/your-username/notebook-gists/blob/main/${title.replace(/\s+/g, '_')}.ipynb`;
}

// Component to display Colab link
export const ColabButton: React.FC<{ code: string; title?: string }> = ({ 
  code, 
  title = 'Notebook' 
}) => {
  const colabUrl = generateColabUrl(code, title);
  
  return (
    <a
      href={colabUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
    >
      <img 
        src="/icons/colab-favicon.ico" 
        alt="Google Colab" 
        className="w-4 h-4" 
      />
      Open in Colab
    </a>
  );
};
```

### Binder Integration
```typescript
// lib/binder-integration.ts
export function generateBinderUrl(
  repoUrl: string,
  branch: string = 'main',
  filePath?: string
): string {
  const baseUrl = 'https://mybinder.org/v2/gh';
  const repo = repoUrl.replace('https://github.com/', '');
  
  let binderUrl = `${baseUrl}/${repo}/${branch}`;
  
  if (filePath) {
    binderUrl += `?filepath=${encodeURIComponent(filePath)}`;
  }
  
  return binderUrl;
}

export const BinderButton: React.FC<{ 
  repoUrl: string; 
  filePath?: string; 
  branch?: string;
}> = ({ repoUrl, filePath, branch = 'main' }) => {
  const binderUrl = generateBinderUrl(repoUrl, branch, filePath);
  
  return (
    <a
      href={binderUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
    >
      <img 
        src="/icons/binder-favicon.svg" 
        alt="Binder" 
        className="w-4 h-4" 
      />
      Launch Binder
    </a>
  );
};
```

## 🎮 Interactive Learning Components

### Step-by-Step Tutorial Component
```typescript
// components/interactive/StepByStepTutorial.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Play, Check } from 'lucide-react';
import { CodeCell } from './CodeCell';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  code?: string;
  explanation: string;
  expectedOutput?: string;
  hints?: string[];
}

interface StepByStepTutorialProps {
  title: string;
  steps: TutorialStep[];
  onComplete?: () => void;
}

export const StepByStepTutorial: React.FC<StepByStepTutorialProps> = ({
  title,
  steps,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showHints, setShowHints] = useState(false);

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const markStepComplete = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep);
    setCompletedSteps(newCompleted);
    
    if (isLastStep && onComplete) {
      onComplete();
    }
  };

  const nextStep = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
      setShowHints(false);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
      setShowHints(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
          <div className="w-32 bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((_, index) => (
          <Button
            key={index}
            variant={index === currentStep ? 'default' : completedSteps.has(index) ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setCurrentStep(index)}
            className="min-w-0 flex-shrink-0"
          >
            {completedSteps.has(index) ? (
              <Check className="w-4 h-4" />
            ) : (
              <span>{index + 1}</span>
            )}
          </Button>
        ))}
      </div>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {step.title}
            {completedSteps.has(currentStep) && (
              <Badge variant="secondary">
                <Check className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">{step.description}</p>
          
          {step.code && (
            <CodeCell
              initialCode={step.code}
              title={`Step ${currentStep + 1} Code`}
              language="python"
              allowExecution={true}
            />
          )}
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Explanation:</h4>
            <p className="text-sm">{step.explanation}</p>
          </div>

          {step.expectedOutput && (
            <div className="bg-green-50 dark:bg-green-950/50 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-medium mb-2 text-green-800 dark:text-green-200">Expected Output:</h4>
              <pre className="text-sm text-green-700 dark:text-green-300 font-mono">
                {step.expectedOutput}
              </pre>
            </div>
          )}

          {step.hints && step.hints.length > 0 && (
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHints(!showHints)}
              >
                {showHints ? 'Hide' : 'Show'} Hints ({step.hints.length})
              </Button>
              {showHints && (
                <div className="mt-3 space-y-2">
                  {step.hints.map((hint, index) => (
                    <div key={index} className="bg-blue-50 dark:bg-blue-950/50 p-3 rounded border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Hint {index + 1}:</strong> {hint}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={isFirstStep}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        <div className="flex gap-2">
          {!completedSteps.has(currentStep) && (
            <Button variant="secondary" onClick={markStepComplete}>
              <Check className="w-4 h-4 mr-1" />
              Mark Complete
            </Button>
          )}
          
          <Button
            onClick={nextStep}
            disabled={isLastStep}
          >
            {isLastStep ? 'Finish' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Completion Message */}
      {completedSteps.size === steps.length && (
        <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              Tutorial Complete!
            </h3>
            <p className="text-green-600 dark:text-green-400">
              Great job! You've completed all {steps.length} steps of this tutorial.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
```

---

**Interactive Features Tech Stack**:
- **Pyodide**: Client-side Python execution
- **KaTeX**: Mathematical formula rendering
- **Recharts**: Interactive data visualization
- **React**: Component-based UI
- **Web Workers**: Background computation
- **IndexedDB**: Client-side data storage