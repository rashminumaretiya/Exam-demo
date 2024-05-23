import React from "react";
import BSInput from "./BSInput";
import BSSelect from "./BSSelect";
import { MenuItem } from "@mui/material";
import BSGrid from "./BSGrid";

const BSFormField = ({ list, onChange, handleShowPasswordClick = null }) => {
  return (
    <>
      <BSGrid container columnSpacing={3}>
        {list?.map((item) =>
          item.type === "select" ? (
            <BSGrid item md={item?.md || 12}>
              <BSSelect
                label={item?.label}
                onChange={onChange}
                error={item?.error}
                value={item?.value}
                key={item.name}
                defaultValue={item?.defaultValue}
                name={item?.name}
              >
                {item.dropdownList.map((list, i) => {
                  return (
                    <MenuItem key={i} value={list}>
                      {list}
                    </MenuItem>
                  );
                })}
              </BSSelect>
            </BSGrid>
          ) : (
            <BSGrid item md={item?.md || 12}>
              <BSInput
                key={item.name}
                type={item?.type}
                label={item?.label}
                name={item?.name}
                value={item?.value}
                onChange={onChange}
                error={item?.error}
                helperText={item?.helperText}
                AdornmentIcon={item?.AdornmentIcon}
                handleShowPasswordClick={handleShowPasswordClick}
              />
            </BSGrid>
          )
        )}
      </BSGrid>
    </>
  );
};

export default BSFormField;
