import { Box, Button, makeStyles } from "@material-ui/core";
import { sizeShorthand } from "../utils/helpers";

type SizeSelectorProps = {
  sizes: string[];
  value?: string;
  onClick: (value: string) => void
}

const useStyles = makeStyles({
  sizeButton: {
    '& + &': {
      marginLeft: 5,
    }
  }
});


export default function SizeSelector({ sizes, value, onClick }: SizeSelectorProps) {
  const classes = useStyles();
  return (
    <Box mt={1} mb={3}>
      {sizes.map((label, i) => (
        <Button
          key={i}
          variant="outlined"
          color={value === label ? 'primary' : 'default'}
          className={classes.sizeButton}
          onClick={() => onClick(label)}
        >
          {sizeShorthand(label)}
        </Button>
      ))}
    </Box>
  );
}