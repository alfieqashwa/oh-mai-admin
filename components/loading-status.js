import { ImSpinner9 } from 'react-icons/im'

export const LoadingStatus = () => (
  <div className="grid h-screen text-5xl place-items-center">
    <ImSpinner9
      className="transition duration-1000 ease-in-out w-14 h-14 animate-spin text-P700"
    />
  </div>
)