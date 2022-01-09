import React from 'react'

// Pitch accent graph, 3rd JPT column
const PitchGraph = ({ pattern, graphWidth }) => {
  const array = pattern.split(''),
    length = pattern.length

  const step = 15,
    radius = 5,
    y = 25

  let x = graphWidth / 2 - (length * (step + radius)) / 2
  let yLast = y

  return (
    <svg key={pattern._id} width="100%" height="100%">
      {array.map((pitch, i, arr) => {
        let key = `${pattern._id}_${i}`
        // Default point options, High pitch
        let opts = { cy: y, fill: 'white', stroke: '', strokeWidth: '1' }
        // Alter point options if Low pitch
        if (pitch === 'L') {
          opts = { ...opts, cy: y + step - radius / 2 }
        }

        // TODO: pitch drop
        // Last graph point
        if (i + 1 === arr.length) {
          opts = {
            ...opts,
            fill: 'transparent',
            stroke: 'white',
            strokeWidth: '2'
          }
        }

        return (
          <g key={key}>
            {i !== 0 && (
              // Exclude line on 1st point
              <line
                x1={x}
                y1={yLast}
                x2={x + step}
                y2={opts.cy}
                stroke="white"
                // stroke-dasharray="1, 2"
                strokeWidth="2"
              />
            )}
            {(yLast = opts.cy)}
            {i + 1 === arr.length ? (
              // Last point, triangle
              <polygon
                points={`
                ${x + step - radius},${opts.cy - radius}
                ${x + step + radius},${opts.cy - radius}
                ${x + step},${opts.cy + radius}
              `}
                fill="transparent"
                stroke="white"
                strokeWidth="1"
              />
            ) : (
              // Normal point, circle
              <circle
                cx={x + step}
                cy={opts.cy}
                r={radius}
                fill={opts.fill}
                stroke={opts.stroke}
                strokeWidth={opts.strokeWidth}
              />
            )}
            {(x += step)}
          </g>
        )
      })}
    </svg>
  )
}

export default PitchGraph
