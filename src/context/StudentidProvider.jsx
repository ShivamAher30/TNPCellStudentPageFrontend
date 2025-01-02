import React, { createContext, useState } from "react";

export const studentidContext = createContext();

function StudentidProvider(props) {
  const [studentId, setStudentId] = useState(null);
  return (
    <studentidContext.Provider value={{ studentId, setStudentId }}>
      {props.children}
    </studentidContext.Provider>
  );
}

export default StudentidProvider;
