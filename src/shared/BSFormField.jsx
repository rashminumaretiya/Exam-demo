import React from "react";
import BSInput from "./BSInput";
import BSSelect from "./BSSelect";
import { MenuItem } from "@mui/material";
import BSGrid from "./BSGrid";

const BSFormField = ({ list, onChange, handleShowPasswordClick = null }) => {
  return (
    <>
      <BSGrid container columnSpacing={3}>
        {list?.map((item, ind) =>
          item.type === "select" ? (
            <BSGrid item md={item?.md || 12} key={item.name}>
              <BSSelect
                label={item?.label}
                onChange={onChange}
                error={item?.error}
                value={item?.value}
                defaultValue={item?.defaultValue}
                name={item?.name}
                disabled={item?.disabled}
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
            <BSGrid item md={item?.md || 12} key={item.name}>
              <BSInput
                type={item?.type}
                label={item?.label}
                name={item?.name}
                value={item?.value}
                onChange={(e) => onChange(e, ind)}
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
