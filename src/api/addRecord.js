const addRecord = async (formName, formData) => {
  const config = {
    appName: "visa-management",
    formName: formName,
    data: formData,
  };

  try {
    await ZOHO.CREATOR.init();
    const response = await ZOHO.CREATOR.API.addRecord(config);
    console.log(response);
    if (response?.code === 3000) console.log(response?.message, response?.data);
  } catch (error) {
    console.log(error);
  }
};

export default addRecord;
