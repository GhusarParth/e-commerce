import React from "react";
import { Formik } from "formik";

const FormikForm = ({
  initialValues = {},
  onSubmit = () => {},
  children = () => {},
  validationSchema = {},
  formikProps,
}: any) => (
  <Formik
    {...formikProps}
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {(params: any) => (
      <form onSubmit={params.handleSubmit}>{children(params)}</form>
    )}
  </Formik>
);

export default FormikForm;
