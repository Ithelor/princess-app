import React from 'react'

// Pitch accent graph, 3rd column
const PitchGraph = ({ pattern, graphWidth }) => {
  const array = pattern.split(''),
    length = pattern.length

  const step = 15,
    radius = 5,
    y = 25
  let x = graphWidth / 2 - (length * (step + radius)) / 2

  let yLast
  const Point = (props) => {
    // Default circle options are for High pitch, altered later if needed
    let opts = { cy: y, fill: 'white', stroke: '', strokeWidth: '1' }

    // Handling input string: L or H pitch
    if (props.pitch === 'L') {
      opts = { ...opts, cy: y + step - radius / 2 }
    }

    // Handling alternative appearence
    // (i.e. for the first or the last circle in the graph)
    if (props.type === 'first') {
      yLast = opts.cy
    } else if (props.type === 'last') {
      opts = {
        ...opts,
        fill: 'transparent',
        stroke: 'white',
        strokeWidth: '2'
      }
    }

    return (
      <>
        {
          // Lines are drawn from the second point
          props.type !== 'first' && (
            <line
              x1={x}
              y1={yLast}
              x2={x + step / 2}
              y2={opts.cy}
              stroke="white"
              // stroke-dasharray="1, 2"
              strokeWidth="2"
            />
          )
        }
        {
          // Last point, triangle
          props.type === 'last' ? (
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
          )
        }
        {console.log(`from (${x},${yLast})\nto (${x + step / 2},${opts.cy})`)}
        {(x += step / 2)}
        {(yLast = opts.cy)}
      </>
    )
  }

  return (
    <svg key={pattern._id} width="100%" height="100%">
      {array.map((pitch, i, arr) => {
        // x += step / 2
        let key = `${pattern._id}_${i}`,
          type
        // First graph point
        if (i === 0) {
          type = 'first'
        }
        // Last graph point
        else if (i + 1 === arr.length) {
          type = 'last'
        }

        return (
          <>
            <Point key={key} pitch={pitch} type={type} />{' '}
            {console.log(`\nendgame\n`)}
          </>
        )
      })}
    </svg>
  )
}

export default PitchGraph
