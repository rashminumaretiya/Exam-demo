import React from "react";
import HomeContainer from "../../container/home";
import {
  Chip,
  CircularProgress,
  Container,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import BSTypography from "../../shared/BSTypography";
import BSStack from "../../shared/BSStack";
import BSButton from "../../shared/BSButton";
import BSCard from "../../shared/BSCard";
import InfiniteScroll from "react-infinite-scroll-component";
import BSGrid from "../../shared/BSGrid";

const Home = () => {
  const {
    studentExam,
    isLoading,
    handleExam,
    allStudent,
    role,
    items,
    hasMore,
    fetchMoreData,
    handleStudentDetail,
  } = HomeContainer();

  return (
    <>
      <Container maxWidth="xl">
        <BSStack mt={2} sx={{ width: "100%", display: "block" }}>
          {role === "teacher" ? (
            <TableContainer component={Paper}>
              <InfiniteScroll
                dataLength={items?.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  <BSStack direction="row" justifyContent="center" my={2}>
                    <CircularProgress />
                  </BSStack>
                }
                height={400}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allStudent?.slice(0, items?.length)?.map((data, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>{data.name}</TableCell>
                          <TableCell>{data.email}</TableCell>
                          <TableCell>
                            <Chip
                              sx={{ mr: 1, mb: 1 }}
                              key={i}
                              label={data.status}
                              color={
                                data.status === "Active" ? "success" : "warning"
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <BSButton
                              variant="contained"
                              color="primary"
                              onClick={() => handleStudentDetail(data?._id)}
                            >
                              View Details
                            </BSButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </InfiniteScroll>
            </TableContainer>
          ) : (
            <>
              <BSTypography variant="h6" mb={1}>
                All Exam for student
              </BSTypography>
              <BSGrid container spacing={3}>
                {isLoading
                  ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
                      return (
                        <BSGrid item md={3} key={item}>
                          <BSCard
                            sx={{
                              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                            }}
                          >
                            <BSTypography variant="h5" component="h5">
                              <Skeleton />
                            </BSTypography>
                            <BSTypography mb={1} variant="body2" component="p">
                              <Skeleton width="80%" />
                            </BSTypography>
                            <BSStack direction="row" spacing={1} mb={1}>
                              <Skeleton
                                width={100}
                                height={30}
                                variant="rounded"
                              />
                              <Skeleton
                                width={100}
                                height={30}
                                variant="rounded"
                              />
                            </BSStack>
                            <Skeleton
                              width={120}
                              height={40}
                              variant="rounded"
                            />
                          </BSCard>
                        </BSGrid>
                      );
                    })
                  : studentExam?.reverse().map((data) => {
                      return (
                        <BSGrid item md={3} key={data?._id}>
                          <BSCard>
                            <BSTypography variant="h5" component="h5">
                              {data.subjectName}
                            </BSTypography>
                            <BSTypography mb={1} variant="body2" component="p">
                              {data.email}
                            </BSTypography>
                            {data?.notes.map((note, i) => {
                              return (
                                <Chip
                                  sx={{ mr: 1, mb: 1 }}
                                  key={i}
                                  label={note}
                                />
                              );
                            })}
                            <BSButton
                              variant="contained"
                              color="primary"
                              onClick={() => handleExam(data?._id)}
                              sx={{ display: "table" }}
                            >
                              Give Exam
                            </BSButton>
                          </BSCard>
                        </BSGrid>
                      );
                    })}
              </BSGrid>
            </>
          )}
        </BSStack>
      </Container>
    </>
  );
};

export default Home;
