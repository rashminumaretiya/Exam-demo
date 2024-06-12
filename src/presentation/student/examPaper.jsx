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
import BSModal from "../../shared/BSModal";

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
    handleSkip,
    skipQuestion,
    checkVal,
    ansList,
    timer,
    loaderTimer,
    modalOpen,
    handleClose,
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
                <BSStack direction="row">
                  <BSTypography variant="h5" my={2}>
                    Exam
                  </BSTypography>
                  <BSStack
                    sx={{
                      ml: "auto",
                      my: 2,
                      borderRadius: "100%",
                      backgroundColor: "#fff",
                      width: 50,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                        borderRadius: "100%",
                        background: `conic-gradient(#ffffff00 ${loaderTimer}%, 0, #6495ED)`,
                        zIndex: -1,
                        margin: -0.5,
                      },
                    }}
                  >
                    <BSTypography>
                      {timer.minute}:{timer.second}
                    </BSTypography>
                  </BSStack>
                </BSStack>
                <BSStack mb={3}>
                  {examPaper?.map((paper, i) => {
                    return (
                      <BSCard
                        key={i}
                        className={` ${activeStep > i ? "complete" : ""}`}
                        sx={{
                          display: `${activeStep === i ? "block" : "none"}`,
                          mb: 2,
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
                                checked={paper.checked}
                              />
                            );
                          })}
                        </RadioGroup>
                      </BSCard>
                    );
                  })}
                  {examPaper?.length === activeStep &&
                    skipQuestion.map((skipData) => {
                      return (
                        <BSCard key={skipData.question} sx={{ mb: 2 }}>
                          <BSTypography mb={2} fontWeight="bold">
                            {skipData?.question}
                          </BSTypography>
                          <RadioGroup row name={`${skipData._id}`}>
                            {skipData?.options.map((data, ind) => {
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
                  {skipQuestion.length === 0 &&
                    examPaper?.length === activeStep &&
                    ansList.map((ans) => {
                      return (
                        <BSCard key={ans.question} sx={{ mb: 2 }}>
                          <BSTypography mb={2} fontWeight="bold">
                            {ans?.question}
                          </BSTypography>
                          <BSTypography mb={2}>{ans?.answer}</BSTypography>
                        </BSCard>
                      );
                    })}
                </BSStack>
                <BSStack direction="row" spacing={2}>
                  {examPaper?.length !== activeStep ? (
                    <BSButton color="black" onClick={handleSkip}>
                      Skip
                    </BSButton>
                  ) : null}

                  <BSButton
                    onClick={() =>
                      examPaper?.length === activeStep &&
                      skipQuestion.length === 0
                        ? handleSubmitExam()
                        : handleNextQuestion()
                    }
                    disabled={checkVal}
                  >
                    {examPaper?.length === activeStep &&
                    skipQuestion.length === 0
                      ? "Submit"
                      : "Next"}
                  </BSButton>
                </BSStack>
              </>
            )}
          </BSGrid>
        </BSGrid>
      </BSContainer>
      <BSModal
        title="Time's up!"
        open={modalOpen}
        maxWidth="xs"
        fullWidth
        onClose={handleClose}
      >
        <BSTypography>Please try again!</BSTypography>
      </BSModal>
    </>
  );
};

export default ExamPaper;
