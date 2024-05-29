import React from "react";
import BSModal from "../../shared/BSModal";
import BSInput from "../../shared/BSInput";
import BSSelect from "../../shared/BSSelect";
import { CircularProgress, MenuItem } from "@mui/material";
import BSGrid from "../../shared/BSGrid";
import BSStack from "../../shared/BSStack";
import BSForm from "../../shared/BSForm";
import BSButton from "../../shared/BSButton";

const ShowExamDetail = ({
  examDetail,
  disabled,
  handleChange,
  handleClick,
  loading,
  buttonDisabled,
  formField,
  ...props
}) => {
  return (
    <BSModal {...props}>
      <BSForm>
        {formField?.questions?.map((data, i) => {
          return (
            <BSStack
              mb={4}
              pb={2}
              sx={{ borderBottom: "1px dashed #ddd" }}
              key={i}
            >
              <BSGrid container columnSpacing={3}>
                <BSGrid item md={6}>
                  <BSInput
                    value={data.question}
                    label={`Question ${i + 1}`}
                    disabled={disabled}
                    onChange={(e) => handleChange(e, i)}
                    name="question"
                  />
                </BSGrid>
                <BSGrid item md={6}>
                  <BSSelect
                    defaultValue={data.answer}
                    value={data.answer}
                    label="Answer"
                    disabled={disabled}
                    name="answer"
                    onChange={(e) => handleChange(e, i)}
                  >
                    {data.options.map((option) => {
                      return (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      );
                    })}
                  </BSSelect>
                </BSGrid>

                {data.options.map((option, optionIndex) => {
                  return (
                    <BSGrid item md={3} key={optionIndex}>
                      <BSInput
                        disabled={disabled}
                        value={option}
                        label={`Option ${optionIndex + 1}`}
                        name="options"
                        onChange={(e) => handleChange(e, i, optionIndex)}
                      />
                    </BSGrid>
                  );
                })}
              </BSGrid>
            </BSStack>
          );
        })}
        {!disabled && (
          <BSStack
            sx={{
              position: "sticky",
              bottom: -16,
              display: "block",
              backgroundColor: "white.main",
              textAlign: "right",
              p: 3,
              mx: -3,
              mb: -3,
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <BSButton onClick={handleClick} disabled={buttonDisabled}>
              Update
              {loading && (
                <CircularProgress size={16} sx={{ ml: 1 }} color="black" />
              )}
            </BSButton>
          </BSStack>
        )}
      </BSForm>
    </BSModal>
  );
};

export default ShowExamDetail;
