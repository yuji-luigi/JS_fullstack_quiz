import { ReactNode } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
const Form = ({
  children,
  onSubmit,
  methods,
}: {
  children: ReactNode;
  onSubmit: () => void;
  methods: UseFormReturn<FieldValues, any>;
}) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
};

export default Form;
