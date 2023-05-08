const emailValidator = (email: FormDataEntryValue | undefined) => {
  let errorMsg: string = "";
  if (!email) {
    errorMsg = "Email field Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.toString())
  ) {
    errorMsg = "Invalid email address";
  }
  return errorMsg;
};

export default { emailValidator };
