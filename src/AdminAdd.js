import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Radio,
  Alert,
} from "@material-tailwind/react";
import { RadioGroup } from "@headlessui/react";
import axios from 'axios';



const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    designation: "",
    location: "",
    photoUrl: "",
}

function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

export default function AdminAdd() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState({add:0,msg:""});
  const [openMessage, setOpenMessage] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = {
            postdata: values,
          };
          console.log(formData);
          const add_url = 'http://localhost:5000/admin/addAdmin';
          const config = { 'content-type': 'multipart/form-data'};
          const response = await axios.post(
              add_url,
              formData,
              config
          );
          console.log(response); 
          if(response.status === 200){
            setStatus({add:true,message:response?.message});
            setOpenMessage(true);
            setOpen(false);
          }else
          {
            setStatus({add:false,message:response?.message});
            setOpenMessage(true);
          }
        } catch (error) {
          setStatus({add:false,message:"Some Error Occured"});
          setOpenMessage(true);
        }
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]:value});
  }

  return (
    <>
  <Button onClick={handleOpen} className="bg-blue-600">Add New Admin</Button>
        <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-16 place-items-center"
          >
            <Typography variant="h4" color="white">
              Add New Admin
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Input label="Name" type="text" name="name" value={values.name} onChange={handleInputChange} size="lg" />
              <Input label="Email" type="email" name="email" value={values.email} onChange={handleInputChange} size="lg" />
              <Input label="Designation" type="text" name="designation" value={values.designation} onChange={handleInputChange} size="lg" />
              <Input label="Location" type="text" name="location" value={values.location} onChange={handleInputChange} size="lg" />
              <Input label="Password" type="password" name="password" value={values.password} onChange={handleInputChange} size="lg" />
              {/* <Input label="Confirm Password" type="password" name="confirmPassword" onChange={handleInputChange} value={values.confirmPassword} size="lg" /> */}
              
              <div className="-ml-2.5">
                <RadioGroup label="Gender" />
                  <Radio label="Male" name="gender" onChange={handleInputChange} checked={values.gender === "Male"} value="Male" />
                  <Radio label="Female" name="gender" onChange={handleInputChange} checked={values.gender === "Female"} value="Female" />
                  <Radio label="Others" name="gender" onChange={handleInputChange} checked={values.gender === "Others"} value="Others" />
                <RadioGroup/>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
            {!openMessage && (
                  <Button type="submit" variant="gradient" fullWidth>
                      Submit
                  </Button>
              )}
            </CardFooter>
          </form>
            {
                status.add?
                <Alert
                    variant="gradient"
                    open={openMessage}
                    icon={<Icon />}
                    action={
                    <Button
                        variant="text"
                        color="white"
                        size="sm"
                        className="!absolute top-3 right-3"
                        onClick={() => setOpenMessage(false)}
                    >
                        Close
                    </Button>
                    }                    
                color="green">
                {status.message}
            </Alert> : 
            <Alert
                variant="gradient"
                open={openMessage}
                icon={<Icon />}
                action={
                <Button
                    variant="text"
                    color="white"
                    size="sm"
                    className="!absolute top-3 right-3"
                    onClick={() => setOpenMessage(false)}
                >
                    Close
                </Button>
                }            
            color="red">
                {status.message}
            </Alert>
            }

        </Card>
      </Dialog>
    </>
  );
}