import { IProgress } from '../types/types';

interface ProgressBarProps {
  progress: IProgress;
}

const ProgressBar = (props: ProgressBarProps) => {
  const percentage = Math.ceil(
    (100 * props.progress.current) / props.progress.total
  );

  return (
    <div className="pb-container">
      <div className="pb-filler" style={{ width: `${percentage}%` }}>
        <div className="pb-label">
          {props.progress.current} / {props.progress.total}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
