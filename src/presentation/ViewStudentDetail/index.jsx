import React, { useEffect, useState } from "react";
import ViewStudentDetailContainer from "../../container/ViewStudentDetail";
import BSContainer from "../../shared/BSContainer";
import BSStack from "../../shared/BSStack";
import BSCard from "../../shared/BSCard";
import BSGrid from "../../shared/BSGrid";
import BSTypography from "../../shared/BSTypography";
import { Collapse, IconButton } from "@mui/material";
import { DownArrow, DownUp } from "../../assets/icons/icon";

const ViewStudentDetail = () => {
  const { student } = ViewStudentDetailContainer();
  const [allStudent, setAllStudent] = useState();

  useEffect(() => {
    let newStr = student
      ?.map((el) => el?.Result?.map((item) => ({ ...item, isOpen: false })))
      .flat();

    setAllStudent(newStr);
  }, [student]);
  const handleCollapse = (id) => {
    const isOpen = allStudent?.map((item) => ({
      ...item,
      isOpen: item._id === id ? !item.isOpen : false,
    }));
    setAllStudent(isOpen);
  };
  return (
    <BSContainer>
      <BSStack mt={2} sx={{ width: "100%", display: "block" }}>
        {student?.map((data, i) => {
          return (
            <BSGrid container spacing={3} key={i}>
              <BSGrid item md={3}>
                <BSCard>
                  <>
                    <BSTypography
                      variant="body1"
                      sx={{ textTransform: "capitalize" }}
                    >
                      Name: {data.name}
                    </BSTypography>
                    <BSTypography variant="body2">
                      Email: {data.email}
                    </BSTypography>
                  </>
                </BSCard>
              </BSGrid>
              <BSGrid item md={9}>
                {allStudent?.map((result, ind) => {
                  return (
                    <BSCard sx={{ mb: 2 }} key={ind}>
                      <BSStack direction="row" alignItems="center">
                        <BSTypography
                          variant="body1"
                          sx={{ textTransform: "capitalize" }}
                        >
                          <BSTypography component="span" fontWeight="bold">
                            Subject Name:
                          </BSTypography>
                          {result.subjectName}
                        </BSTypography>
                        <BSStack
                          direction="row"
                          spacing={2}
                          ml="auto"
                          alignItems="center"
                        >
                          <BSTypography
                            variant="body1"
                            sx={{ textTransform: "capitalize" }}
                          >
                            <BSTypography component="span" fontWeight="bold">
                              Rank:
                            </BSTypography>
                            {result.rank}
                          </BSTypography>
                          <BSTypography
                            variant="body1"
                            sx={{ textTransform: "capitalize" }}
                          >
                            <BSTypography component="span" fontWeight="bold">
                              score:
                            </BSTypography>
                            {result.score}
                          </BSTypography>
                          <IconButton
                            onClick={() => handleCollapse(result._id)}
                          >
                            {result.isOpen ? <DownUp /> : <DownArrow />}
                          </IconButton>
                        </BSStack>
                      </BSStack>
                      <Collapse
                        in={result.isOpen}
                        sx={{
                          mt: result.isOpen ? 2 : 0,
                          pt: result.isOpen ? 2 : 0,
                          borderTop: result.isOpen ? "1px solid #ddd" : 0,
                        }}
                      >
                        {result.studentAnswer.map((data) => {
                          return (
                            <BSStack mb={2}>
                              <BSTypography
                                variant="body1"
                                sx={{ textTransform: "capitalize" }}
                              >
                                <BSTypography
                                  component="span"
                                  fontWeight="bold"
                                >
                                  question:
                                </BSTypography>{" "}
                                {data.question}
                              </BSTypography>
                              <BSTypography
                                variant="body1"
                                sx={{ textTransform: "capitalize" }}
                              >
                                <BSTypography
                                  component="span"
                                  fontWeight="bold"
                                >
                                  Answer:
                                </BSTypography>
                                {data.answer}
                              </BSTypography>
                            </BSStack>
                          );
                        })}
                      </Collapse>
                    </BSCard>
                  );
                })}
              </BSGrid>
            </BSGrid>
          );
        })}
      </BSStack>
    </BSContainer>
  );
};

export default ViewStudentDetail;
