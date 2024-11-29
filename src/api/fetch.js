const fetchRecordByID = async (id) => {
    const config = {
        appName: "visa-management",
        reportName: "All_Leads",
        id: id
    }    
    try {
        const response = await ZOHO.CREATOR.API.getRecordById(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export default fetchRecordByID;