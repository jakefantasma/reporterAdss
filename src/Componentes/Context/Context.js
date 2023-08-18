import { createContext, useContext, useState } from "react";
const Ctx = createContext();
export const TaskProvider = ({ children }) => {
  function test() {
    //console.log("asd");
  }
  let value = { test };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
export const useTaskContext = () => {
  return useContext(Ctx);
};
