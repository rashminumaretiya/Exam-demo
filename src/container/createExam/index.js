import { useState } from "react";

const CreateExamContainer = () => {
  const [formFields, setFormFields] = useState({
    subjectName: "",
    question: "",
    options: [],
    answer: "",
  });

  const [storeData, setStoreData] = useState([]);

  const createExamField = [
    {
      subjectName: [
        {
          name: "subjectName",
          type: "text",
          label: `Subject Name`,
          md: 6,
        },
      ],
      questions: [
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
        },
        {
          name: "answer1",
          type: "text",
          label: "Answer 1",
          isOptions: true,
          optionIndex: 1,
          md: 3,
        },
        {
          name: "answer2",
          type: "text",
          label: "Answer 2",
          isOptions: true,
          optionIndex: 2,
          md: 3,
        },
        {
          name: "answer3",
          type: "text",
          label: "Answer 3",
          isOptions: true,
          optionIndex: 3,
          md: 3,
        },
        {
          name: "answer4",
          type: "text",
          label: "Answer 4",
          isOptions: true,
          optionIndex: 4,
          md: 3,
        },
      ],
    },
  ];
  const [cloneField, setCloneField] = useState([...createExamField]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("createExamField", createExamField);
    const field = createExamField?.map((field) =>
      field?.questions.filter((el) => el.name === name)
    );
    let option = formFields?.options;
    console.log("field?.isOptions", [...field]);
    if (field?.isOptions) {
      console.log("first", field?.isOptions);
      option[field?.optionIndex - 1] = value;
    }
    setFormFields((prev) => ({
      ...prev,
      ...(!field?.isOptions && { [name]: value }),
      options: option,
    }));
  };

  console.log("formFields", formFields);

  const handleAddRow = (i) => {
    let clone = JSON.parse(JSON.stringify([...createExamField]));
    clone[0].questions[0].label = `Question ${i + 2}`;
    setCloneField((prev) => [...prev, ...clone]);
  };

  const handleDeleteRow = (el) => {
    const updatedFields = [...cloneField];
    const newData = updatedFields.filter((_, index) => index !== el);
    newData.forEach((field, index) => {
      field.questions[0].label = `Question ${index + 1}`;
    });
    setCloneField(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStoreData((prev) => [...prev, formFields]);
  };
  //   console.log("storeData", storeData);

  return {
    createExamField,
    handleChange,
    handleAddRow,
    handleSubmit,
    cloneField,
    handleDeleteRow,
  };
};

export default CreateExamContainer;
