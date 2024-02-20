import { Button, ButtonProps } from "@mui/material";

interface LabelButtonProps extends ButtonProps {
  value: string;
}

export const LabelButton = (props: LabelButtonProps) => (
  <Button
    style={{
      textTransform: "none",
    }}
    variant="text"
    {...props}>
    {props.value}
  </Button>
);
