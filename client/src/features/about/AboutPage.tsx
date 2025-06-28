// import { useEffect, useState } from "react";
import {
  // LinearProgress,
  Container,
  Typography,
  ButtonGroup,
  Button,
} from "@mui/material";
import {
  useLazyGet400ErrorQuery,
  useLazyGet401ErrorQuery,
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGetValidationErrorQuery,
} from "./errorApi";

export default function AboutPage() {
  const [trigger400Error] = useLazyGet400ErrorQuery();
  const [trigger401Error] = useLazyGet401ErrorQuery();
  const [trigger404Error] = useLazyGet404ErrorQuery();
  const [trigger500Error] = useLazyGet500ErrorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();

  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate loading
  //   const timer = setTimeout(() => setIsLoading(false), 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div>
  //       {/* Top Progress Bar */}
  //       <div className="fixed left-0 w-full z-50 top-[calc(92px+3rem)] sm:top-[calc(2.5rem+3rem)]">
  //         <LinearProgress
  //           sx={{
  //             backgroundColor: "#e0e0e0",
  //             "& .MuiLinearProgress-bar": { backgroundColor: "black" },
  //           }}
  //         />
  //       </div>

  //       {/* Loading Text */}
  //       <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">
  //         Loading About Page...
  //       </div>
  //     </div>
  //   );
  // }

  return (
    // <section className="w-full px-4 sm:px-6 lg:px-12 py-15">
    //   <div className="max-w-3xl mx-auto text-center">
    //     <h1 className="text-2xl sm:text-3xl lg:text-4xl uppercase font-bold mb-8 sm:mb-10">
    //       About Us
    //     </h1>
    //     <p className="mb-4 text-sm sm:text-base text-gray-700">
    //       Welcome to our online store! We are dedicated to providing you with
    //       the best shopping experience.
    //     </p>
    //     <p className="mb-4 text-sm sm:text-base text-gray-700">
    //       Our team is passionate about curating a wide range of products that
    //       cater to your needs and preferences.
    //     </p>
    //     <p className="mb-4 text-sm sm:text-base text-gray-700">
    //       Thank you for choosing us, and we look forward to serving you!
    //     </p>
    //   </div>
    // </section>

    <Container maxWidth="lg">
      <Typography gutterBottom variant="h3">
        Errors for testing
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() => trigger400Error().catch((err) => console.log(err))}
        >
          Test 400 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger401Error().catch((err) => console.log(err))}
        >
          Test 401 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger404Error().catch((err) => console.log(err))}
        >
          Test 404 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger500Error().catch((err) => console.log(err))}
        >
          Test 500 Error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            triggerValidationError().unwrap().catch((err) => console.log(err))
          }
        >
          Test Validation Error
        </Button>
      </ButtonGroup>
    </Container>
  );
}
