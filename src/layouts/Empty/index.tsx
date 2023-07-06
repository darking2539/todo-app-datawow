import React from "react";

const EmptyLayout = (props: any) => {
  const { children } = props;

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};
export default EmptyLayout;
