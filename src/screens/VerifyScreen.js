import { Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Verify(props) {
    const verifyID = props.match.params.id;
    const [verifyError, setVerifyError] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if(verifyError) return;
        axios
            .post(`${process.env.REACT_APP_API_URL}/verify`,
                {
                    id: verifyID,
                },
                { withCredentials: true },
            )
            .then(response => {
                if (response.data.success) {
                    if (response.data.loggedIn) {
                        history.push("/success");
                    } else {
                        history.push("/login");
                    }
                }
            })
            .catch(err => {
                setVerifyError(true);
            });
    }, [verifyError, history, verifyID]);

    const errorMessage = (
        <Text>An error has occured verifying you. Please try scanning the QR code again?</Text>
    );
    const loadingMessage = (
        <Text>We are currently verifying you. Please wait.</Text>
    );

    return (
        <Flex
            height="100vh"
            background="teal.100"
            alignItems="center"
            justifyContent="center"
        >
            <Flex direction="column" background="white" p={12} rounded={6}>
                {verifyError ? errorMessage : loadingMessage}
            </Flex>
        </Flex>
    );
}

export default Verify;