import { Chip, CircularProgress, IconButton, Skeleton } from "@mui/material";
import React from "react";
import { Edit, Remove } from "../../assets/icons/icon";
import ViewExamContainer from "../../container/viewExam";
import BSButton from "../../shared/BSButton";
import BSCard from "../../shared/BSCard";
import BSContainer from "../../shared/BSContainer";
import BSGrid from "../../shared/BSGrid";
import BSModal from "../../shared/BSModal";
import BSStack from "../../shared/BSStack";
import BSTypography from "../../shared/BSTypography";
import ShowExamDetail from "./showExamDetail";

const ViewExam = () => {
  const {
    viewExamData,
    isLoading,
    handleDeleteExam,
    open,
    handleDeleteModal,
    handleClose,
    circleLoading,
    handleExamDetail,
    examDetailOpen,
    examDetail,
    examOption,
    handleChange,
    handleSubmit,
    formField,
    buttonDisabled,
  } = ViewExamContainer();
  return (
    <>
      <BSContainer>
        <BSGrid container columnSpacing={3}>
          {isLoading ? (
            [1, 2, 3, 4].map((_, i) => {
              return (
                <BSGrid item md={3} key={i}>
                  <BSCard sx={{ my: 3 }}>
                    <Skeleton
                      width={200}
                      height={25}
                      variant="rounded"
                      sx={{ mb: 1.5 }}
                    />
                    <BSStack direction="row" spacing={1} mb={1.5}>
                      <Skeleton
                        width={120}
                        variant="rounded"
                        height={34}
                        sx={{ borderRadius: 30 }}
                      />
                      <Skeleton
                        width={120}
                        variant="rounded"
                        height={34}
                        sx={{ borderRadius: 30 }}
                      />
                    </BSStack>
                    <Skeleton width={130} variant="rounded" height={36} />
                  </BSCard>
                </BSGrid>
              );
            })
          ) : (
            <>
              {viewExamData.length === 0 && (
                <BSTypography
                  variant="h4"
                  component="h4"
                  sx={{ textAlign: "center", mt: 4 }}
                >
                  No Exam Found
                </BSTypography>
              )}
              {viewExamData.map((data, i) => {
                return (
                  <BSGrid item md={3} key={i}>
                    <BSCard sx={{ my: 3 }}>
                      <BSStack direction="row" alignItems="center" mb={1}>
                        <BSTypography variant="h6" component="h6">
                          {data.subjectName}
                        </BSTypography>
                        <BSStack direction="row" ml="auto" spacing={1}>
                          <IconButton
                            color="error"
                            sx={{ backgroundColor: "error.light" }}
                            onClick={() =>
                              handleDeleteModal(data._id, data.subjectName)
                            }
                          >
                            <Remove />
                          </IconButton>
                          <IconButton
                            color="black"
                            sx={{ backgroundColor: "primary.main" }}
                            onClick={() =>
                              handleExamDetail(
                                data._id,
                                "Edit",
                                data.subjectName
                              )
                            }
                          >
                            <Edit />
                          </IconButton>
                        </BSStack>
                      </BSStack>
                      {data.notes.map((note, i) => {
                        return (
                          <Chip sx={{ mr: 1, mb: 2 }} key={i} label={note} />
                        );
                      })}
                      <BSButton
                        onClick={() =>
                          handleExamDetail(data._id, "View", data.subjectName)
                        }
                      >
                        Exam Detail
                      </BSButton>
                    </BSCard>
                  </BSGrid>
                );
              })}
            </>
          )}
        </BSGrid>
      </BSContainer>
      <ShowExamDetail
        open={examDetailOpen}
        maxWidth="lg"
        fullWidth
        onClose={handleClose}
        examDetail={examDetail}
        title={`${!examOption.edit ? "View" : "Edit"} Exam ${
          examOption.subjectName
        }`}
        disabled={!examOption.edit}
        handleChange={handleChange}
        handleClick={() => handleSubmit(examOption.id)}
        loading={circleLoading}
        buttonDisabled={buttonDisabled}
        formField={formField}
      />
      <BSModal
        open={open?.id}
        maxWidth="xs"
        fullWidth
        onClose={handleClose}
        title={`Delete Exam ${open?.subjectName}`}
      >
        <BSStack mt={3} mb={3} textAlign="center">
          <BSTypography>Are you sure you want to delete this exam</BSTypography>
          <BSStack display="block" mt={2}>
            <BSButton color="error" onClick={() => handleDeleteExam(open)}>
              Delete Exam
              {circleLoading && (
                <CircularProgress size={16} sx={{ ml: 1 }} color="white" />
              )}
            </BSButton>
          </BSStack>
        </BSStack>
      </BSModal>
    </>
  );
};

export default ViewExam;
