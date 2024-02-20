import { Snackbar, Alert, AlertColor } from "@mui/material";

export interface DefaultSnackbarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  variant: AlertColor;
  description?: string;
}

export const DefaultSnackbar = (props: DefaultSnackbarProps) => (
  <Snackbar
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    open={props.open}
    autoHideDuration={4000}
    onClose={() => props.setOpen(false)}>
    <Alert onClose={() => props.setOpen(false)} severity={props.variant} sx={{ width: "100%" }}>
      {props.description}
    </Alert>
  </Snackbar>
);
