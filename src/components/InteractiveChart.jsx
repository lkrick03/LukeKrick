import { useState } from 'react';
import './InteractiveChart.css';

export default function InteractiveChart({ chartData }) {
  const [activePoint, setActivePoint] = useState(null);

  if (!chartData || !chartData.series || chartData.series.length === 0) {
    return (
      <div className="interactive-chart__placeholder">
        <p>[LUKE NOTE]: No chart series data defined for this topic yet.</p>
      </div>
    );
  }

  const { chartTitle, xAxisLabel, yAxisLabel, note, series } = chartData;

  // Flatten points to calculate bounding ranges (min / max for x and y)
  const allPoints = series.flatMap((s) => s.data);
  const xValues = allPoints.map((p) => p.x);
  const yValues = allPoints.map((p) => p.y);

  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(0, Math.min(...yValues));
  const yMax = Math.max(...yValues) * 1.1 || 1; // 10% headroom above max

  // SVG viewBox dimensions
  const width = 650;
  const height = 320;
  const padding = { top: 40, right: 30, bottom: 50, left: 60 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Coordinate mapping functions
  const getX = (val) => {
    if (xMax === xMin) return padding.left + innerWidth / 2;
    return padding.left + ((val - xMin) / (xMax - xMin)) * innerWidth;
  };

  const getY = (val) => {
    if (yMax === yMin) return padding.top + innerHeight / 2;
    return padding.top + innerHeight - ((val - yMin) / (yMax - yMin)) * innerHeight;
  };

  // Color palette for series
  const seriesColors = ['#ff4d4d', '#4da6ff', '#50e3c2', '#f5a623', '#bd10e0'];

  // Grid line values
  const yTicksCount = 5;
  const yTicks = Array.from({ length: yTicksCount }, (_, i) => {
    return yMin + (i * (yMax - yMin)) / (yTicksCount - 1);
  });

  const xTicksCount = Math.min(6, xValues.length);
  const xTicks = Array.from({ length: xTicksCount }, (_, i) => {
    return xMin + (i * (xMax - xMin)) / (xTicksCount - 1);
  });

  return (
    <div className="interactive-chart-wrapper">
      <div className="interactive-chart__header">
        <h4 className="interactive-chart__title">{chartTitle}</h4>
        {note && <p className="interactive-chart__note">{note}</p>}
      </div>

      <div className="interactive-chart__container">
        <svg viewBox={`0 0 ${width} ${height}`} className="interactive-chart__svg">
          {/* Background Grid & Y Ticks */}
          {yTicks.map((tickVal, idx) => {
            const yPos = getY(tickVal);
            return (
              <g key={`y-grid-${idx}`}>
                <line
                  x1={padding.left}
                  y1={yPos}
                  x2={width - padding.right}
                  y2={yPos}
                  className="interactive-chart__grid-line"
                />
                <text
                  x={padding.left - 10}
                  y={yPos + 4}
                  className="interactive-chart__axis-text"
                  textAnchor="end"
                >
                  {tickVal.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* X Axis Ticks */}
          {xTicks.map((tickVal, idx) => {
            const xPos = getX(tickVal);
            return (
              <g key={`x-grid-${idx}`}>
                <text
                  x={xPos}
                  y={height - padding.bottom + 20}
                  className="interactive-chart__axis-text"
                  textAnchor="middle"
                >
                  {tickVal.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Axis Labels */}
          <text
            x={width / 2}
            y={height - 10}
            className="interactive-chart__label-text"
            textAnchor="middle"
          >
            {xAxisLabel || 'X Axis'}
          </text>

          <text
            x={-height / 2}
            y={18}
            transform="rotate(-90)"
            className="interactive-chart__label-text"
            textAnchor="middle"
          >
            {yAxisLabel || 'Y Axis'}
          </text>

          {/* Plot Lines */}
          {series.map((s, sIdx) => {
            const color = seriesColors[sIdx % seriesColors.length];

            // Build polyline / path command
            const pathPoints = s.data
              .map((p) => `${getX(p.x)},${getY(p.y)}`)
              .join(' L ');
            const pathD = `M ${pathPoints}`;

            return (
              <g key={`series-group-${sIdx}`}>
                {/* Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={color}
                  strokeWidth="2.5"
                  className="interactive-chart__path"
                />

                {/* Data Dots */}
                {s.data.map((p, pIdx) => {
                  const cx = getX(p.x);
                  const cy = getY(p.y);
                  const isHovered =
                    activePoint && activePoint.sIdx === sIdx && activePoint.pIdx === pIdx;

                  return (
                    <circle
                      key={`dot-${sIdx}-${pIdx}`}
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 6 : 4}
                      fill={color}
                      stroke="#111"
                      strokeWidth="2"
                      className="interactive-chart__dot"
                      onMouseEnter={() =>
                        setActivePoint({ sIdx, pIdx, x: p.x, y: p.y, name: s.name, color })
                      }
                      onMouseLeave={() => setActivePoint(null)}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {activePoint && (
          <div className="interactive-chart__tooltip">
            <span
              className="interactive-chart__tooltip-badge"
              style={{ backgroundColor: activePoint.color }}
            />
            <strong>{activePoint.name}:</strong>
            <span>
              X: {activePoint.x}, Y: {activePoint.y}
            </span>
          </div>
        )}
      </div>

      {/* Series Legend */}
      <div className="interactive-chart__legend">
        {series.map((s, sIdx) => (
          <div key={`legend-${sIdx}`} className="interactive-chart__legend-item">
            <span
              className="interactive-chart__legend-color"
              style={{ backgroundColor: seriesColors[sIdx % seriesColors.length] }}
            />
            <span className="interactive-chart__legend-label">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
