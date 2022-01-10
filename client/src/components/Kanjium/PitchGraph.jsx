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

  // TODO: move path to background ? dont want to map 2 same arrays tho
  // TODO: replace transparent to background color
  return (
    <svg key={pattern._id} width="100%" height="100%">
      {array.map((pitch, i, arr) => {
        let isDrop = false,
          lineStartHeight = yLast, // <-- yup
          key = `${pattern._id}_${i}`

        // Default point options, High pitch
        let opts = {
          cy: y - radius / 2,
          fill: 'white',
          stroke: 'white',
          strokeWidth: '1.5'
        }

        // Alter options on Low pitch
        if (pitch === 'L') {
          opts = { ...opts, cy: y + step - radius / 2 }
        }

        // Alter options on pitch Drop
        if (pitch === 'H' && arr[i + 1] === 'L') {
          opts = { ...opts, fill: 'transparent' }
          isDrop = true
        }

        // Alter options on Last point
        if (i + 1 === arr.length) {
          opts = { ...opts, fill: 'transparent', strokeDasharray: '1.5' }
        }

        yLast = opts.cy // <-- yup
        x += step

        return (
          <g key={key}>
            {i !== 0 && (
              // Exclude line on 1st point
              <line
                x1={x - step}
                y1={lineStartHeight}
                x2={x}
                y2={opts.cy}
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray={opts.strokeDasharray}
              />
            )}
            {i + 1 === arr.length ? (
              // Last point, triangle
              <polygon
                points={`
                  ${x - radius},${opts.cy - radius}
                  ${x + radius},${opts.cy - radius}
                  ${x},${opts.cy + radius}
                `}
                fill="transparent"
                stroke="white"
                strokeWidth={opts.strokeWidth}
              />
            ) : (
              <>
                {isDrop && (
                  <circle
                    cx={x}
                    cy={opts.cy}
                    r={radius / 5}
                    fill="white"
                    stroke={opts.stroke}
                    strokeWidth={opts.strokeWidth}
                  />
                )}
                <circle
                  cx={x}
                  cy={opts.cy}
                  r={radius}
                  fill={opts.fill}
                  stroke={opts.stroke}
                  strokeWidth={opts.strokeWidth}
                />
              </>
            )}
          </g>
        )
      })}
    </svg>
  )
}

export default PitchGraph
