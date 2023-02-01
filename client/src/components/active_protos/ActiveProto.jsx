import PropTypes from 'prop-types';
import {
  Accordion, AccordionSummary, AccordionDetails, Grid, Typography, Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import JobCard from './JobCard';
import ActiveProtoHeader from './ActiveProtoHeader';

function ActiveProto({ proto }) {
  const activeList = useSelector((state) => state.activeProtos);


  const jobslist = proto.jobs.map((job) => (
    <JobCard key={job._id} job={job} listId={activeList._id} protoId={proto._id} />
  ));
  return (
    <Grid container spacing={0.5} key={proto._id} sx={{ width: { xs: 'calc(100vw - 16px)', md: '360px' } }}>
      <Grid item xs={12}>
        <ActiveProtoHeader
          protoTitle={proto.title}
          protoDescription={proto.description}
          protoId={proto._id}
          listId={activeList._id}
          isComplete={proto.isComplete}
        />
      </Grid>
      <Grid item xs={12}>
        <Accordion
          disableGutters
          defaultExpanded
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="The How"
            id="proto-how"
            sx={{ background: '#eeeeee' }}

          >
            <Typography variant="caption" fontWeight={500}>Job Count</Typography>
            <Typography variant="caption" fontWeight={500}>Total TIme</Typography>
            {/* <Typography
              variant="subtitle2"
              fontSize={15}
              fontWeight={'bold'}
            >
              The How
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails sx={{ background: '#eeeeee' }}>
            <Stack spacing={1} sx={{ maxHeight: '55vh', overflowY: 'scroll', paddingBottom: 1 }}>
              {jobslist}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
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
