export /*const*/ enum FormType {
  STRING,
  NUMBER,
  DATE
}

export type FormDialogData = {
  title: string,
  columnsInfo: {
    name: string,
    type: FormType,
    value?: any
  }[],
}
