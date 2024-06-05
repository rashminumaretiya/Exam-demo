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
    subjectField,
    handleDeleteRow,
    error,
  } = CreateExamContainer();

  return (
    <BSContainer>
      <BSForm onSubmit={handleSubmit}>
        <BSCard sx={{ my: 3, "& .MuiCardContent-root": { pb: 0 } }}>
          <BSFormField
            list={subjectField}
            error={error}
            onChange={handleChange}
          />
        </BSCard>
        {cloneField?.map((data, i) => {
          return (
            <BSCard sx={{ my: 3 }} key={i}>
              <BSFormField
                error={error}
                list={data}
                onChange={(e) => handleChange(e, i)}
              />
              {cloneField?.length - 1 === i ? (
                cloneField?.length <= 14 && (
                  <IconButton
                    sx={{ backgroundColor: "primary.main" }}
                    onClick={(e) => handleAddRow(e, i)}
                  >
                    <Plus />
                  </IconButton>
                )
              ) : (
                <IconButton
                  sx={{ backgroundColor: "error.main", color: "white.main" }}
                  onClick={(e) => handleDeleteRow(e, i)}
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
