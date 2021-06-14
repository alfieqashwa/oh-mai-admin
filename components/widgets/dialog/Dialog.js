import { GlassDefault } from 'components/glassDefault';
import ExitIcon from './ExitIcon';
import IconButton from './IconButton';

export default function Dialog(props) {
  const { open, onClose } = props;

  if (!open) {
    return <></>;
  }
  
  return (
    // !HASKEL this dialog blur is not as blur as we want (not blur enought)
    <div className="fixed z-10 inset-0 overflow-visible overflow-auto" role="dialog" aria-modal="true">
      <div className="relative p-8 w-full max-w-md m-auto flex-col flex rounded-lg bg-clip-padding glassBlur">
        <div>{props.children}</div>
        <span className="absolute top-0 right-0 p-4">
          <IconButton onClick={() => onClose()} className="text-N0">
            <ExitIcon />
          </IconButton>
        </span>
      </div>
    </div>
  );
}