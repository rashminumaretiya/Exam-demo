import { toast } from "react-toastify";
import { apiCall } from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validation from "../../utils/javascript";

const ViewExamContainer = () => {
  const [viewExamData, setViewExamData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [circleLoading, setCircleLoading] = useState(false);
  const [open, setOpen] = useState({});
  const [examDetailOpen, setExamDetailOpen] = useState(false);
  const [examDetail, setExamDetail] = useState([]);
  const [examOption, setExamOption] = useState({});
  const [formField, setFormField] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const { ApiContainer } = apiCall();
  const ViewAllExam = async () => {
    setIsLoading(true);
    try {
      const response = await ApiContainer(
        "dashboard/Teachers/viewExam",
        "GET",
        null
      );
      if (response.data) {
        setViewExamData(response.data.data);
        navigate("/view-exam");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteModal = (id, subjectName) => {
    setOpen({ id, subjectName });
  };
  const handleDeleteExam = async (id) => {
    const newData = viewExamData.filter((item) => item._id !== id);
    setCircleLoading(true);
    try {
      const response = await ApiContainer(
        `dashboard/Teachers/deleteExam?id=${id}`,
        "DELETE",
        null
      );
      if (response.statusCode === 200) {
        toast.success(response.data.message);
        setCircleLoading(false);
        setOpen(null);
        setViewExamData(newData);
      } else {
        toast.error(response.data.message);
        setCircleLoading(false);
        setOpen(null);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setExamDetailOpen(false);
  };
  const fetchExamDetail = async (id) => {
    setCircleLoading(true);
    try {
      const response = await ApiContainer(
        `dashboard/Teachers/examDetail?id=${id}`,
        "GET",
        null
      );

      if (response.data) {
        setExamDetail(response.data.data.questions);
        setFormField({
          questions: response.data.data.questions,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setCircleLoading(false);
    }
  };
  const handleExamDetail = (id, type, subjectName) => {
    setExamDetailOpen(id ? true : false);
    fetchExamDetail(id);
    switch (type) {
      case "Edit":
        setExamOption({ id, edit: true, subjectName: subjectName });
        break;
      case "View":
        setExamOption({ id, edit: false, subjectName: subjectName });
        break;
      default:
        return null;
    }
  };
  const handleChange = (e, index, optionIndex) => {
    const { name, value } = e.target;
    let newErr = {
      ...formField.questions[index].helperText,
      [name]: validation(name, value, true, null),
    };

    formField.questions[index].error = newErr;
    formField.questions[index].helperText = newErr;
    Object.values(newErr).some((el) => {
      if (el !== null) {
        return setButtonDisabled(true);
      } else {
        return setButtonDisabled(false);
      }
    });

    if (
      name === "option1" ||
      name === "option2" ||
      name === "option3" ||
      name === "option4"
    ) {
      formField.questions[index].options[optionIndex] = value;
    } else {
      formField.questions[index][name] = value;
    }
    setFormField({
      subjectName: examOption.subjectName,
      questions: formField?.questions,
      notes: ["10mins exam", "start time 10am"],
    });
  };
  console.log("formField", formField.questions);
  const handleSubmit = async (id) => {
    setCircleLoading(true);
    try {
      const response = await ApiContainer(
        `dashboard/Teachers/editExam?id=${id}`,
        "PUT",
        formField
      );
      if (response.data) {
        toast.success(response.data.message);
        setExamDetailOpen(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setCircleLoading(false);
    }
  };

  useEffect(() => {
    ViewAllExam();
  }, []);

  return {
    viewExamData,
    handleDeleteExam,
    isLoading,
    open,
    handleClose,
    handleDeleteModal,
    circleLoading,
    handleExamDetail,
    examDetailOpen,
    examOption,
    handleChange,
    handleSubmit,
    formField,
    buttonDisabled,
  };
};
export default ViewExamContainer;
