import PropTypes from 'prop-types';
import { Paper, Grid, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

function LibraryCard({ proto, deleteProto }) {
  const styles = {
    width: '360px',
    height: '100px',
    background: '#eeeeee',
  };

  return (
    <Paper style={styles}>
      <Grid container height="100%" justifyContent="space-between">
        <Grid item xs={12} alignSelf="center" marginLeft={2}>
          <Typography
            variant="h5"
            fontWeight={700}
          >
            {proto.title}
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          alignSelf="center"
          justifyContent="space-between"
          marginLeft={2}
          marginRight={2}
        >
          <Grid item>
            <AssignmentIcon sx={{ marginRight: '16px' }} />
            <AccessTimeFilledIcon />
          </Grid>
          <Grid item>
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{
                '&:hover': { color: 'red' },
                cursor: 'pointer',
              }}
            >
              View
            </Typography>
            <Typography
              variant="caption"
              fontWeight={500}
              onClick={() => deleteProto(proto.title, proto._id)}
              sx={{
                '&:hover': { color: 'red' },
                cursor: 'pointer',
                marginLeft: 5,
              }}
            >
              Delete
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

LibraryCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default LibraryCard;
