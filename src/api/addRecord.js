const addRecord = async (formName, formData) => {
  const config = {
    appName: "visa-management",
    formName: formName,
    data: {
      data: formData,
    },
  };
  try {
    const response = await ZOHO.CREATOR.API.addRecord(config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default addRecord;
