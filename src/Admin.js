import { useEffect, useState } from "react";
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Button, Modal, Box, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import {Link} from "react-router-dom";
import axios from "axios";
import AdminAdd from "./AdminAdd";
import AdminEdit from "./AdminEdit";


const Admin = () => {
    const [adminList, setAdminList] = useState([]);
    const [page, setPage] = useState("Admin Table");
    useEffect(() => {
        getAllAdmins();
      }, []);

    async function getAllAdmins(){
        try {
            const data = await fetch("http://localhost:5000/admin/getAllAdmins");
            const jsonData = await data.json();
            const adminData = jsonData.data;
            console.log(JSON.parse(adminData.data));
            setAdminList(JSON.parse(adminData.data));            
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAdmin = (person) => {
      console.log(person);
      return (<></>);

    //   axios.delete('http://localhost:5000/admin/deleteAdmin/1')
    // .then((response) => element.innerHTML = 'Delete successful');
    }

     return (<div className="flex flex-col">
            <header className="bg-white shadow">
              <div className="flex flex-row justify-between items-center mx-2">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">{page}</h1>
              <div className="p-2 flex flex-row justify-end space-x-3">
                <AdminAdd />
              </div>
             </div>
          </header>
          <div className="mt-1 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-400 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-400">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider"
                  >
                    Designation
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider"
                  >
                    Gender
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase tracking-wider"
                  >
                    Location
                  </th>                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adminList.map(person => (
                  <tr key={person?.email}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          { person?.image ? <img className="h-10 w-10 rounded-full" src={person?.image} alt="userphoto" /> : <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" /> }
                          {/* <img className="h-10 w-10 rounded-full" src={person?.image} alt="userphoto" /> */}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-700">{person?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* <div className="text-sm text-gray-900">{person.designation}</div> */}
                      <div className="text-sm text-gray-500">{person?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{person?.designation}</div>
                      {/* <div className="text-sm text-gray-500">{person.Gender}</div> */}
                    </td>
  {/*                     <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        Active
                      </span>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person?.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person?.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">                       
                        <AdminEdit {...person}/>
                        <Button color="red" onClick={() => deleteAdmin(person)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
   </div>)
};
export default Admin;

