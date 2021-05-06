import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { XIcon, CheckIcon } from '@heroicons/react/outline'

export function SwitchOnOff(props) {
  const initialValue = props.isEnabled;
  const [enabled, setEnabled] = useState(initialValue);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? "bg-G400" : "bg-N400"}
         inline-flex flex-shrink-0 h-[36px] w-[82px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-N0 focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">{props.title}</span>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-11" : "translate-x-0"}
            pointer-events-none flex items-center justify-center h-[24px] w-[24px] rounded-full bg-N0 shadow-lg transform ring-0 transition ease-in-out duration-500`}
      >
        {enabled
          ? <CheckIcon className="w-5 h-5 text-G400" />
          : <XIcon className="w-5 h-5 text-N400" />
        }
      </span>
    </Switch>
  )
}