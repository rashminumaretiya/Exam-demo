import React from "react";
import BSContainer from "../../shared/BSContainer";
import ExamPaperContainer from "../../container/student/examPaper";
import BSCard from "../../shared/BSCard";
import BSTypography from "../../shared/BSTypography";
import {
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import BSButton from "../../shared/BSButton";
import BSStack from "../../shared/BSStack";
import BSGrid from "../../shared/BSGrid";

const ExamPaper = () => {
  const {
    examPaper,
    handleNextQuestion,
    activeStep,
    handleChange,
    handleSubmitExam,
    status,
    handleRedirect,
    isLoading,
  } = ExamPaperContainer();
  return (
    <>
      <BSContainer>
        <BSGrid container sx={{ justifyContent: "center" }}>
          <BSGrid item md={8}>
            {isLoading ? (
              <BSStack
                my={2}
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "calc(100vh - 100px)" }}
              >
                <CircularProgress size={30} color="black" />
              </BSStack>
            ) : status ? (
              <BSStack
                my={2}
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "calc(100vh - 100px)" }}
              >
                <BSTypography variant="h5" mb={2}>
                  {status}
                </BSTypography>
                <BSButton onClick={handleRedirect}>Back to home</BSButton>
              </BSStack>
            ) : (
              <>
                <BSTypography variant="h5" my={2}>
                  Exam
                </BSTypography>
                <BSStack mb={3}>
                  {examPaper?.map((paper, i) => {
                    return (
                      <BSCard
                        key={i}
                        className={` ${activeStep > i ? "complete" : ""}`}
                        sx={{
                          display: `${activeStep === i ? "block" : "none"}`,
                        }}
                      >
                        <BSTypography mb={2} fontWeight="bold">
                          {i + 1}. {paper?.question}
                        </BSTypography>

                        <RadioGroup row name={`${paper._id}`}>
                          {paper?.options.map((data, ind) => {
                            return (
                              <FormControlLabel
                                value={`${data}`}
                                control={<Radio />}
                                label={data}
                                key={ind}
                                onChange={handleChange}
                              />
                            );
                          })}
                        </RadioGroup>
                      </BSCard>
                    );
                  })}
                </BSStack>
                <BSStack direction="row" justifyContent="end">
                  <BSButton
                    onClick={() =>
                      examPaper?.length - 1 === activeStep
                        ? handleSubmitExam()
                        : handleNextQuestion()
                    }
                  >
                    {examPaper?.length - 1 === activeStep ? "Submit" : "Next"}
                  </BSButton>
                </BSStack>
              </>
            )}
          </BSGrid>
        </BSGrid>
      </BSContainer>
    </>
  );
};

export default ExamPaper;
