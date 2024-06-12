import { useLocation, useNavigate } from "react-router-dom";
import { apiCall } from "../../api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ExamPaperContainer = () => {
  const param = useLocation();
  const [examPaper, setExamPaper] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [ansList, setAnsList] = useState([]);
  const [status, setStatus] = useState();
  const navigate = useNavigate();
  const { ApiContainer } = apiCall();
  const [isLoading, setIsLoading] = useState(false);
  const [skipQuestion, setSkipQuestion] = useState([]);
  const [checkVal, setCheckVal] = useState(true);
  const [timer, setTimer] = useState({});
  const [loaderTimer, setLoaderTimer] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const getExamPaper = async () => {
    setIsLoading(true);
    try {
      const response = await ApiContainer(
        `student/examPaper${param.search}`,
        "GET",
        null
      );
      if (response.data) {
        setExamPaper(response.data.data);
      }
      if (response.data.statusCode === 500) {
        setStatus(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleNextQuestion = () => {
    if (activeStep < examPaper.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (examPaper.length - 1 === activeStep && skipQuestion.length === 0) {
      setCheckVal(false);
    } else {
      setCheckVal(true);
    }
    if (examPaper.length === activeStep && skipQuestion.length > 0) {
      setCheckVal(false);
      setSkipQuestion([]);
    }
    if (timer === 0) {
      setActiveStep(0);
    }
    examPaper.forEach((el) => (el.checked = false));
  };

  const handleSkip = () => {
    if (activeStep < examPaper.length + 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    setCheckVal(true);
    setSkipQuestion((prev) => [
      ...prev,
      { ...examPaper[activeStep], checked: false },
    ]);
    if (timer === 0) {
      setActiveStep(0);
    }
    examPaper.forEach((el) => (el.checked = false));
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newVal = { question: name, answer: value };
    examPaper.forEach((el) => delete el.checked);
    const uniqueQuestions = new Set(ansList.map((item) => item.question));
    if (!uniqueQuestions.has(name)) {
      setAnsList((prev) => [...prev, newVal]);
    }
    setCheckVal(!checked);
    if (skipQuestion.length && examPaper.length === activeStep) {
      const checkIndex = skipQuestion?.findIndex((el) => el._id === name);
      delete skipQuestion[checkIndex].checked;
      const checkSkipOption = skipQuestion.some((el) => el.checked === false);
      setCheckVal(checkSkipOption);
    }
  };

  const handleSubmitExam = async () => {
    setIsLoading(true);
    try {
      const response = await ApiContainer(
        `student/giveExam${param.search}`,
        "POST",
        ansList
      );
      if (response.data.statusCode === 200) {
        setStatus(response.data.message);
      } else if (response.data.statusCode === 500) {
        toast.error(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    navigate("/");
  };
  const timerFn = (time) => {
    let second = 60;
    let minute = time - 1;
    let circlePercent = (time * 100) / 60;
    let elapsedTime = 100 / (time * 60);
    const intervalID = setInterval(() => {
      second = second - 1;
      circlePercent = circlePercent + elapsedTime;
      setLoaderTimer(circlePercent);
      setTimer({ minute, second });
      if (second <= 0) {
        minute = minute - 1;
        second = 60;
        if (minute < 0) {
          clearInterval(intervalID);
          setModalOpen(true);
        }
      }
    }, 1000);
  };
  useEffect(() => {
    const intervalID = timerFn(1);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const handleClose = () => {
    setModalOpen(false);
    setActiveStep(0);
    setAnsList([]);
    timerFn(1);
    examPaper.map((el) => (el.checked = false));
  };

  useEffect(() => {
    getExamPaper();
  }, []);
  return {
    examPaper,
    handleNextQuestion,
    activeStep,
    handleChange,
    ansList,
    handleSubmitExam,
    status,
    handleRedirect,
    isLoading,
    handleSkip,
    skipQuestion,
    checkVal,
    timer,
    loaderTimer,
    modalOpen,
    handleClose,
  };
};

export default ExamPaperContainer;
