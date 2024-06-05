import { useState } from "react";
import { apiCall } from "../../api";
import { toast } from "react-toastify";
import validation from "../../utils/javascript";
const createExamField = [
  {
    name: "question",
    type: "text",
    label: `Question 1`,
    md: 6,
    value: "",
  },
  {
    name: "answer",
    type: "select",
    label: "Answer",
    dropdownList: [],
    md: 6,
    disabled: true,
    value: "",
    defaultValue: "",
  },
  {
    name: "option1",
    type: "text",
    label: "Option 1",
    isOptions: true,
    optionIndex: 1,
    md: 3,
    value: "",
  },
  {
    name: "option2",
    type: "text",
    label: "Option 2",
    isOptions: true,
    optionIndex: 2,
    md: 3,
    value: "",
  },
  {
    name: "option3",
    type: "text",
    label: "Option 3",
    isOptions: true,
    optionIndex: 3,
    md: 3,
    value: "",
  },
  {
    name: "option4",
    type: "text",
    label: "Option 4",
    isOptions: true,
    optionIndex: 4,
    md: 3,
    value: "",
  },
];
const CreateExamContainer = () => {
  const { ApiContainer } = apiCall();
  const [error, setError] = useState({});
  const [subjectError, setSubjectError] = useState();
  const [formFields, setFormFields] = useState({
    subjectName: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
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
      error: subjectError,
      // value: "",
      helperText: subjectError,
    },
  ];
  const [cloneField, setCloneField] = useState([createExamField]);
  const handleChange = (e, ind) => {
    const { name, value } = e.target;
    const newErr = {
      [name]: validation(
        name,
        value,
        true,
        null,
        formFields.questions[ind].options
      ),
    };
    const newField = [...subjectField, ...cloneField.flat()];
    const field = newField?.filter((field) => field.name === name);
    let option = formFields?.questions[ind]?.options;
    let newCloneField = JSON.parse(JSON.stringify(cloneField));

    const findIndex = newCloneField[ind].findIndex(
      (item) => item?.name === Object.keys(newErr)[0]
    );
    if (findIndex !== -1) {
      newCloneField[ind][findIndex].error = newErr[name];
      newCloneField[ind][findIndex].helperText = newErr[name];
    }

    field.forEach((item) => {
      if (item.isOptions) {
        option[item.optionIndex - 1] = value;
        newCloneField[ind][findIndex].value = value;
        newCloneField[ind][1].dropdownList = [];
        if (!option[item.optionIndex - 1]) {
          newCloneField[ind][1].dropdownList.splice(item.optionIndex - 1, 1);
        } else {
          newCloneField[ind][1].dropdownList.push(
            ...formFields.questions[ind].options
          );
        }
        newCloneField[ind][1].disabled = !option?.every((list) => list);
      }
      if (item.name === "subjectName") {
        setSubjectError(newErr[name]);
        formFields.subjectName = value;
        subjectField[ind].value = value;
      }
      if (item.name === "question") {
        formFields.questions[ind].question = value;
        newCloneField[ind][findIndex].value = value;
      }
      if (item.name === "answer") {
        formFields.questions[ind].answer = value;
        newCloneField[ind][findIndex].value = value;
        newCloneField[ind][findIndex].defaultValue = value;
      }
    });

    setCloneField([...newCloneField]);
    setFormFields((prev) => ({
      ...prev,
      ...(!field[0]?.isOptions &&
        field[0].name !== "question" &&
        field[0].name !== "answer" && { [name]: value }),
    }));
  };

  const handleAddRow = () => {
    let newErr = {};
    let errorCheck = false;

    cloneField.forEach((subArray, outerIndex) => {
      const item = formFields.questions[outerIndex];
      for (let key in item) {
        if (typeof item[key] === "object") {
          let optionsError = [];
          item.options?.forEach((val, ind) => {
            optionsError.push(validation(`option${ind + 1}`, val));
          });
          newErr[key] = optionsError;
        } else {
          newErr[key] = validation(key, item[key]);
        }
      }
      subArray.forEach((item, innerIndex) => {
        Object.keys(newErr).forEach((err) => {
          if (item.name === err) {
            cloneField[outerIndex][innerIndex].error = newErr[err]
              ? true
              : false;
            cloneField[outerIndex][innerIndex].helperText = newErr[err];
          } else {
            if (
              item.optionIndex &&
              item.optionIndex > 0 &&
              item.optionIndex <= newErr.options.length
            ) {
              cloneField[outerIndex][innerIndex].error = newErr.options[
                item.optionIndex - 1
              ]
                ? true
                : false;
              cloneField[outerIndex][innerIndex].helperText =
                newErr.options[item.optionIndex - 1];
            }
          }
        });
      });
      setError(newErr);
      errorCheck = cloneField[outerIndex].some((el) => el.error);
    });
    if (!errorCheck) {
      let clone = JSON.parse(JSON.stringify(createExamField));
      clone[0].label = `Question ${cloneField.length + 1}`;
      clone.forEach((item) => {
        item.error = false;
        item.helperText = "";
      });
      setCloneField((prev) => [...prev, clone]);
      setFormFields((prev) => ({
        ...prev,
        questions: [
          ...prev.questions,
          {
            question: "",
            options: ["", "", "", ""],
            answer: "",
          },
        ],
      }));
    }
  };

  const handleDeleteRow = (e, ind) => {
    const updatedFields = JSON.parse(JSON.stringify(cloneField));
    const newData = updatedFields.filter((_, index) => index !== ind);
    newData.forEach((field, index) => {
      field[0].label = `Question ${index + 1}`;
    });
    let newFormField = formFields.questions.filter((_, index) => index !== ind);

    setCloneField(newData);
    setFormFields((prev) => ({
      ...prev,
      questions: newFormField,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErr = {};
    Object.keys(formFields).forEach((field) => {
      if (field === "subjectName") {
        newErr = validation(field, formFields[field]);
      }
    });
    setSubjectError(newErr);
    if (!newErr?.length) {
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
      } catch (error) {
        toast.error("error");
      }
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
    error,
  };
};

export default CreateExamContainer;
