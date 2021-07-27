import React, { useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import { XIcon } from '@heroicons/react/outline'

export function SwitchOnOff(props) {
  const customerId = props.customerId

  useEffect(() => {
    // console.log('re render...' + customerId)
  }, [])

  useEffect(() => {
    // console.log('props.isEnabled', props.isEnabled)
    // console.log('on togle change, cust id:' + customerId)
  }, [props.isEnabled])

  const onChange = () => {
    // console.log('{___________on togle change')
    // console.log('on togle change, cust id:' + customerId)
    // console.log('on togle change, enabled:' + !props.isEnabled)
    // console.log('on togle change___________}')
    props.updateArray(customerId, !props.isEnabled)
  }

  return (
    <Switch
      checked={props.isEnabled}
      onChange={onChange}
      className={`${props.isEnabled ? 'bg-G400' : 'bg-N400'}
        inline-flex flex-shrink-0 h-[36px] w-[82px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-N0 focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">{props.title}</span>
      <span
        aria-hidden="true"
        className={`${props.isEnabled ? 'translate-x-11' : 'translate-x-0'}
          pointer-events-none flex items-center justify-center h-[24px] w-[24px] rounded-full bg-N0 shadow-lg transform ring-0 transition ease-in-out duration-500`}
      >
        {props.isEnabled
          ? <CheckIcon className="w-5 h-5 text-G400" />
          : <XIcon className="w-5 h-5 text-N400" />
        }
      </span>
    </Switch>
  )
}
