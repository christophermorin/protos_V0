import { Stack, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material"
export default function ActiveJobsList({ jobs }) {
  const jobslist = jobs ? jobs.map(job => {
    return (
      <Accordion key={job._id}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{job.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {job.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
  })
    : null

  return (
    <Stack spacing={1}>
      {/* <Accordion>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
      {jobslist}
    </Stack>
  )
}