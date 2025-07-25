import React, { type ReactNode } from "react";

const WorkflowLayout = ({ children }: { children: ReactNode }) => {
  return <div className="h-screen bg-slate-50">{children}</div>;
};

export default WorkflowLayout;
