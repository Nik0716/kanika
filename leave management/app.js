const LeaveForm = () => {
  const [formData, setFormData] = React.useState({
    empId: "",
    email: "",
    startDate: "",
    endDate: "",
    leaveType: "Annual Leave",
    halfDayStart: false,
    halfDayEnd: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleReset = () => {
    setFormData({
      empId: "",
      email: "",
      startDate: "",
      endDate: "",
      leaveType: "Annual Leave",
      halfDayStart: false,
      halfDayEnd: false,
    });
  };

  return (
    React.createElement("div", { className: "container" },
      React.createElement("form", { onSubmit: handleSubmit, onReset: handleReset, className: "form" },
        React.createElement("div", { className: "form-group" },
          React.createElement("label", { htmlFor: "leaveType", className: "form-label" }, "Leave Type"),
          React.createElement("select", {
            name: "leaveType",
            className: "form-control",
            value: formData.leaveType,
            onChange: handleInputChange
          },
            React.createElement("option", { value: "Annual Leave" }, "Annual Leave"),
            React.createElement("option", { value: "Maternity Leave" }, "Maternity Leave")
          )
        ),
        React.createElement("div", { className: "form-group" },
          React.createElement("label", { htmlFor: "empId", className: "form-label" }, "Emp ID"),
          React.createElement("input", {
            type: "text",
            className: "form-control",
            id: "empId",
            name: "empId",
            value: formData.empId,
            onChange: handleInputChange
          })
        ),
        React.createElement("div", { className: "form-group" },
          React.createElement("label", { htmlFor: "email", className: "form-label" }, "Email"),
          React.createElement("input", {
            type: "email",
            className: "form-control",
            id: "email",
            name: "email",
            value: formData.email,
            onChange: handleInputChange
          })
        ),
        React.createElement("div", { className: "form-group" },
          React.createElement("label", { htmlFor: "startDate", className: "form-label" }, "Start Date"),
          React.createElement("input", {
            type: "date",
            className: "form-control",
            id: "startDate",
            name: "startDate",
            value: formData.startDate,
            onChange: handleInputChange
          })
        ),
        React.createElement("div", { className: "form-group" },
          React.createElement("label", { htmlFor: "endDate", className: "form-label" }, "End Date"),
          React.createElement("input", {
            type: "date",
            className: "form-control",
            id: "endDate",
            name: "endDate",
            value: formData.endDate,
            onChange: handleInputChange
          })
        ),
        React.createElement("div", { className: "form-buttons" },
          React.createElement("input", { type: "reset", className: "form-reset", value: "Reset" }),
          React.createElement("input", { type: "submit", className: "form-button", value: "Apply Leave" })
        )
      )
    )
  );
};

ReactDOM.render(React.createElement(LeaveForm), document.getElementById('root'));
