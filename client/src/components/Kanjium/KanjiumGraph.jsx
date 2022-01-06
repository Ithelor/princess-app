import React from 'react'

// Pitch accent graph, 3rd column
const PitchGraph = ({ pattern, graphWidth }) => {
  const array = pattern.split(''),
    length = pattern.length

  const step = 15,
    radius = 5,
    y = 25
  let x = graphWidth / 2 - (length * (step + radius)) / 2

  // TODO: reduce circle to component with H/L handling (triangle on last ?)
  // TODO: connective lines between circles (dotted on last ?)
  return (
    <svg width="100%" height="100%">
      {array.map((pitch, i, arr) =>
        // Last element
        i + 1 === arr.length ? (
          // Last element High pitch
          pitch === 'H' ? (
            <circle
              key={pattern._id}
              cx={(x += step)}
              cy={y}
              r={radius}
              fill="transparent"
              stroke="white"
              strokeWidth="2"
            />
          ) : (
            // Last element Low pitch
            pitch === 'L' && (
              <circle
                key={pattern._id}
                cx={(x += step)}
                cy={y + step - radius / 2}
                r={radius}
                fill="transparent"
                stroke="white"
                strokeWidth="2"
              />
            )
          )
        ) : // High pitch
        pitch === 'H' ? (
          <circle
            key={pattern._id}
            cx={(x += step)}
            cy={y}
            r={radius}
            fill="white"
          />
        ) : (
          // Low pitch
          pitch === 'L' && (
            <circle
              key={pattern._id}
              cx={(x += step)}
              cy={y + step - radius / 2}
              r={radius}
              fill="white"
            />
          )
        )
      )}
    </svg>
  )
}

export default PitchGraph
