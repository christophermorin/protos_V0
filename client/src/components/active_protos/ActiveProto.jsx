import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import ActiveProtoHeader from './ActiveProtoHeader';
import JobStepper from './JobStepper';
import JobCard from './JobCard';

function ActiveProto({ proto }) {
  const activeList = useSelector((state) => state.activeProtos);
  const totalJobCount = proto.jobs.length;
  const totalJobsComplete = proto.jobs.filter((job) => job.isComplete);
  const [protoIsComplete, setProtoIsComplete] = useState(
    totalJobsComplete.length === totalJobCount,
  );
  const user = useSelector((state) => state.userAuth);

  useEffect(() => {
    setProtoIsComplete(totalJobsComplete.length === totalJobCount);
  }, [totalJobsComplete.length]);

  const jobslist = proto.jobs.map((job) => (
    <JobCard key={job._id} job={job} listId={activeList._id} protoId={proto._id} userId={user.id} />
  ));

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={0.5}
      key={proto._id}
      sx={{
        width: { xs: 'calc(100vw - 32px)', sm: '360px' },
      }}
    >
      <ActiveProtoHeader
        protoTitle={proto.title}
        protoDescription={proto.description}
        protoId={proto._id}
        listId={activeList._id}
        isComplete={protoIsComplete}
      />
      <Accordion
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="The How"
          id="proto-how"
        >
          <Typography
            margin="auto"
            variant="caption"
            fontWeight={700}
          >
            {totalJobsComplete.length}
            /
            {totalJobCount}
          </Typography>
          <JobStepper
            totalJobCount={totalJobCount}
            totalJobsComplete={totalJobsComplete.length}
          />
        </AccordionSummary>
        <AccordionDetails sx={{ overflowY: 'auto', scrollbarWidth: 'thin' }}>
          <Stack spacing={1} sx={{ maxHeight: '55vh' }}>
            {jobslist}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

ActiveProto.propTypes = {
  proto: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    timeOfDay: PropTypes.string,
    isComplete: PropTypes.bool.isRequired,
    jobs: PropTypes.oneOfType([PropTypes.array]),
  }).isRequired,
};

export default ActiveProto;
