export const fetchRecords = async (reportName, criteria) => {
  try {
    await ZOHO.CREATOR.init();
    const response = await ZOHO.CREATOR.API.getAllRecords({
      appName: 'visa-management',
      reportName: reportName,
      criteria: criteria,
    });
    return response.data;
  } catch (error) {
    console.log("Error Fetching Data: ", error)
    return []
  }
};
