import React from "react";
import BSContainer from "../../shared/BSContainer";
import BSCard from "../../shared/BSCard";
import BSFormField from "../../shared/BSFormField";
import CreateExamContainer from "../../container/createExam";
import BSForm from "../../shared/BSForm";
import { Plus, Remove } from "../../assets/icons/icon";
import { IconButton } from "@mui/material";
import BSButton from "../../shared/BSButton";

const CreateExam = () => {
  const {
    handleChange,
    handleAddRow,
    handleSubmit,
    cloneField,
    handleDeleteRow,
  } = CreateExamContainer();
  return (
    <BSContainer>
      <BSForm onSubmit={handleSubmit}>
        {cloneField?.map((data, i) => {
          return (
            <BSCard sx={{ my: 3 }} key={i}>
              {Object.values(data).map((subFields, i) => (
                <BSFormField
                  list={Object.values(subFields)}
                  onChange={handleChange}
                />
              ))}
              {cloneField.length - 1 === i ? (
                <IconButton
                  sx={{ backgroundColor: "primary.main" }}
                  onClick={() => handleAddRow(i)}
                >
                  <Plus />
                </IconButton>
              ) : (
                <IconButton
                  sx={{ backgroundColor: "error.main", color: "white.main" }}
                  onClick={() => handleDeleteRow(i)}
                >
                  <Remove />
                </IconButton>
              )}
            </BSCard>
          );
        })}
        <BSButton type="submit">Submit</BSButton>
      </BSForm>
    </BSContainer>
  );
};

export default CreateExam;
