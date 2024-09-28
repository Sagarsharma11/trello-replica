import React from 'react';

const ViewTask = ({ taskData }) => {
  return (
    <div>
       <h4>{taskData?.title}</h4>
      <p>{taskData?.description}</p> 
    </div>
  );
};

export default ViewTask;
