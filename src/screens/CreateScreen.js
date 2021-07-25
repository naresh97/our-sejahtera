import { Button, Flex, FormControl, FormLabel, Heading, Input, Select, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authLogin } from '../features/auth/authSlice';

function OrgSelect(props) {
    const orgs = ["MISI: Solidariti", "UNDI18"];
    const orgOptions = orgs.map((name) => {
        return (
            <option value={name}>{name}</option>
        )
    });

    return (
        <Select placeholder={props.placeholder} onChange={props.onChange}>
            {orgOptions}
        </Select>
    );
}

function Create() {

    const dispatch = useDispatch();
    const toast = useToast();
    const history = useHistory();

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [org, setOrg] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name | !email | !phoneNumber | !org | !password) {
            toast({
                title: 'Problem!',
                description: 'Please fill in all the fields',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/create`,
                {
                    name: name,
                    email: email,
                    org: org,
                    phoneNumber: org,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            )
            .then(response => {
                if (response.data.success) {
                    dispatch(authLogin());
                    history.push('/success');
                } else {
                    toast({
                        title: 'An error occurred',
                        description: response.data.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            })
            .catch(e=>{
                if(e.response.status === 401){
                    toast({
                        title: 'Verification Error',
                        description: "You couldn't be verified. Please try scanning the verification QR Code again.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      });
                }
            });
    }

    return (
        <Flex
            height="100vh"
            background="teal.100"
            alignItems="center"
            justifyContent="center"
        >
            <Flex direction="column" background="white" p={12} rounded={6}>
                <Heading mb={6}>
                    Create Account
                </Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl mb={6}>
                        <FormLabel>Name:</FormLabel>
                        <Input onChange={e => setName(e.target.value)} />
                    </FormControl>
                    <FormControl mb={6}>
                        <FormLabel >Email:</FormLabel>
                        <Input type="email" onChange={e => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl mb={6}>
                        <FormLabel>Phone Number:</FormLabel>
                        <Input onChange={e => setPhoneNumber(e.target.value)} />
                    </FormControl>
                    <FormControl mb={6}>
                        <FormLabel>Organization:</FormLabel>
                        <OrgSelect placeholder="Select Organization" onChange={e => setOrg(e.target.value)} />
                    </FormControl>
                    <FormControl mb={6}>
                        <FormLabel>Password:</FormLabel>
                        <Input type="password" onChange={e => setPassword(e.target.value)} />
                    </FormControl>
                    <Button type="submit">Create!</Button>
                </form>
            </Flex>
        </Flex>
    )
}

export default Create;