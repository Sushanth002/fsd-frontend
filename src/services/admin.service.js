import axios from 'axios';

export let adminSericeObj =
{
    getAllDepartments,
    getDeptById,
    addDept,
    updateDept,
    deleteDept
};

let url = "http://localhost:3000/api/admin/dashboard/";

async function getToken() {
    let authApiUrl = "http://localhost:3002/authapi/login";
    let userObj = { "userName": "scott", "password": "scott123" }
    let response = await axios.post(authApiUrl, userObj);
    return response.data.token;
}

async function getAllUsers() {
    const token = await getToken();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let resData = await axios.get(url, config);
    return resData.data;
}




async function addDept(deptObj) {
    let resData = await axios.post(url, deptObj);
    return resData.data;
}

async function deleteDept(dno) {
    let resData = await axios.delete(url + dno);
    return resData.data;
}


async function getDeptById(dno) {
    let resData = await axios.get(url + dno);
    return resData.data;
}

async function updateDept(deptObj) {
    let resData = await axios.put(url + deptObj.deptno, deptObj);
    return resData.data;
}