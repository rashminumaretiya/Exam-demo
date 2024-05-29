import { useState } from "react";
import { apiCall } from "../../api";
import { toast } from "react-toastify";
const createExamField = [
  {
    name: "question",
    type: "text",
    label: `Question 1`,
    md: 6,
  },
  {
    name: "answer",
    type: "select",
    label: "Answer",
    dropdownList: [],
    md: 6,
    disabled: true,
  },
  {
    name: "option1",
    type: "text",
    label: "Option 1",
    isOptions: true,
    optionIndex: 1,
    md: 3,
  },
  {
    name: "option2",
    type: "text",
    label: "Option 2",
    isOptions: true,
    optionIndex: 2,
    md: 3,
  },
  {
    name: "option3",
    type: "text",
    label: "Option 3",
    isOptions: true,
    optionIndex: 3,
    md: 3,
  },
  {
    name: "option4",
    type: "text",
    label: "Option 4",
    isOptions: true,
    optionIndex: 4,
    md: 3,
  },
];
const CreateExamContainer = () => {
  const { ApiContainer } = apiCall();
  const [formFields, setFormFields] = useState({
    subjectName: "",
    questions: [
      {
        question: "",
        options: [],
        answer: "",
      },
    ],
    notes: ["10mins exam", "start time 10am"],
  });
  const subjectField = [
    {
      name: "subjectName",
      type: "text",
      label: `Subject Name`,
      md: 6,
    },
  ];

  const [cloneField, setCloneField] = useState([createExamField]);
  const handleChange = (e, ind) => {
    const { name, value } = e.target;
    const newField = [...subjectField, ...cloneField.flat()];
    const field = newField?.filter((field) => field.name === name);
    let option = formFields?.questions[ind]?.options;
    let newCloneField = JSON.parse(JSON.stringify(cloneField));
    if (field[0].isOptions) {
      option[field[0].optionIndex - 1] = value;
      newCloneField[ind].forEach((item) => {
        item.dropdownList = [];
        item.dropdownList.push(...formFields.questions[ind].options);

        newCloneField[ind][1].disabled =
          item.dropdownList.length === 0 ? true : false;
      });
    }
    if (field[0].name === "question") {
      formFields.questions[ind].question = value;
    }
    if (field[0].name === "answer") {
      formFields.questions[ind].answer = value;
    }
    setCloneField([...newCloneField]);
    setFormFields((prev) => ({
      ...prev,
      ...(!field[0]?.isOptions &&
        field[0].name !== "question" &&
        field[0].name !== "answer" && { [name]: value }),
    }));
  };

  const handleAddRow = () => {
    let clone = JSON.parse(JSON.stringify(createExamField));
    clone[0].label = `Question ${cloneField.length + 1}`;
    setCloneField((prev) => [...prev, clone]);

    let cloneSub = { question: "", options: [], answer: "" };
    setFormFields((prev) => ({
      ...prev,
      questions: [...prev.questions, cloneSub],
    }));
  };

  console.log("cloneField", cloneField);

  const handleDeleteRow = (e, ind) => {
    const updatedFields = JSON.parse(JSON.stringify(cloneField));
    const newData = updatedFields.filter((_, index) => index !== ind);
    newData.forEach((field, index) => {
      field[0].label = `Question ${index + 1}`;
    });
    let newFormField = formFields.questions.filter((_, index) => index !== ind);
    newFormField.forEach((field, index) => {
      Object.keys(field).forEach((key) => {
        newData.forEach((data) => {
          if (key === "question") {
            data[0].value = newFormField[index].question;
          }
          if (key === "answer") {
            data[1].value = newFormField[index].answer;
          }
          if (key === "options") {
            data[2].value = newFormField[index].options[0];
            data[3].value = newFormField[index].options[1];
            data[4].value = newFormField[index].options[2];
            data[5].value = newFormField[index].options[3];
          }
        });
      });
    });
    setCloneField(newData);
    setFormFields((prev) => ({
      ...prev,
      questions: newFormField,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fieldData = await ApiContainer(
        "dashboard/Teachers/Exam",
        "POST",
        formFields
      );
      if (fieldData.data) {
        toast.success(fieldData.data.message);
      } else {
        toast.error(fieldData.data.details.body[0].message);
      }
      console.log("formFields", fieldData);
    } catch (error) {
      toast.error("error", error);
    }
  };

  return {
    createExamField,
    handleChange,
    handleAddRow,
    handleSubmit,
    cloneField,
    subjectField,
    handleDeleteRow,
  };
};

export default CreateExamContainer;
