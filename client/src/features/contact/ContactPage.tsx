import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { decrement, increment } from "./counterReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";

export default function ContactPage() {
  const { data } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <section className="py-15 sm:py-6 px-4 w-full mx-auto">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <Typography variant="h2">Contact Page</Typography>
        <Typography>The data is: {data}</Typography>
        <ButtonGroup>
          <Button onClick={() => dispatch(decrement(1))} color="error">
            Decrement
          </Button>
          <Button onClick={() => dispatch(increment(1))} color="secondary">
            Increment
          </Button>
          <Button onClick={() => dispatch(increment(5))} color="primary">
            Increment by 5
          </Button>
        </ButtonGroup>
      </div>
    </section>
  );
}
