import { AiOutlineArrowLeft } from 'react-icons/ai';
import { GlassDefault } from './glassDefault';

// Confirmation Saved-Button
export const GlassHeader = ({ title, children }) =>
  <GlassDefault className="fixed right-0 z-20 top-0 left-0 md:left-[252px] h-16 rounded-none">
    <div className="flex items-center justify-between px-4 py-3 x-4">
      <div className="flex items-center">
        <AiOutlineArrowLeft className="w-6 h-6 md:hidden text-N0" />
        <p className="ml-4 capitalize w400">{title}</p>
      </div>
      {children}
    </div>
  </GlassDefault>