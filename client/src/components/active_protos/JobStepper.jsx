import { MobileStepper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';

function JobStepper({ totalJobCount, totalJobsComplete }) {
  return (
    <>
      <MobileStepper
        variant="progress"
        steps={totalJobCount === 0 ? 0 : totalJobCount + 1}
        activeStep={totalJobsComplete}
        position="static"
        sx={{ width: '100%', flexGrow: 1 }}
      />
      {totalJobsComplete === totalJobCount && totalJobCount !== 0
        ? <StarIcon fontSize="large" sx={{ color: 'gold' }} />
        : <StarBorder fontSize="large" color="disabled" />}
    </>
  );
}

export default JobStepper;
