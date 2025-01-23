export default async function uploadFile(reportName, id, fieldName, file) {
  try {
    const config = {
      appName: "visa-management",
      reportName: reportName,
      id: id,
      fieldName: fieldName,
      file: file,
    };
    const response = await ZOHO.CREATOR.API.uploadFile(config);
    return response;
  } catch (error) {
    throw new Error(`Error Uploading File : ${error}`);
  }
}
