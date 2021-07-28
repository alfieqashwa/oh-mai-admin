import React from 'react'
import { format } from 'date-fns'

import { GlassDefault } from 'components/glassDefault'
import { moneyFormat } from 'utils/money-format'

export function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !label) {
    return <> </>
  }

  if (active) {
    const date = new Date(label)
    return (
      <GlassDefault className="p-4 text-center rounded-md border-P700 bg-N800">
        <h5 className="text-G400">{format(date, 'eeee, d MMM, yyyy')}</h5>
        <p className="mt-1 text-N100">
          {payload && moneyFormat.format(payload?.[0].value)}
        </p>
      </GlassDefault>
    )
  }

  return null
}
