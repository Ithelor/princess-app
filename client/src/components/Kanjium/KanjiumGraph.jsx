import React from 'react'

// Pitch accent graph, 3rd JPT column
const PitchGraph = ({ pattern, graphWidth }) => {
  const array = pattern.split(''),
    length = pattern.length

  const step = 15,
    radius = 5,
    y = 25
  let x = graphWidth / 2 - (length * (step + radius)) / 2

  // TODO: include to Point component ?
  const Path = (props) => {
    let yLast = y,
      xPath = x + (step * 3) / 2

    return props.array.map((pitch, i) => {
      // Default point height for High pitch
      let cy = y

      // Alter point height if Low pitch
      if (pitch === 'L') {
        cy = y + step - radius / 2
      }

      return (
        <>
          {
            // Exclude 1st point line
            i !== 0 && (
              <line
                x1={xPath}
                y1={yLast}
                x2={(xPath += step)}
                y2={cy}
                stroke="white"
                // stroke-dasharray="1, 2"
                strokeWidth="2"
              />
            )
          }
          {(yLast = cy)}
        </>
      )
    })
  }

  const Point = (props) => {
    // Default point options for High pitch
    let opts = { cy: y, fill: 'white', stroke: '', strokeWidth: '1' }

    // Alter point options if Low pitch
    if (props.pitch === 'L') {
      opts = { ...opts, cy: y + step - radius / 2 }
    }

    // Handling alt appearence
    // (i.e. first / last points or pitch drop)
    if (props.type === 'last') {
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
        {(x += step / 2)}
      </>
    )
  }

  return (
    <svg key={pattern._id} width="100%" height="100%">
      <Path array={array} />
      {array.map((pitch, i, arr) => {
        let key = `${pattern._id}_${i}`,
          type
        // Last graph point
        if (i + 1 === arr.length) {
          type = 'last'
        }

        return <Point key={key} pitch={pitch} type={type} />
      })}
    </svg>
  )
}

export default PitchGraph
