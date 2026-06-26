import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast, Text } from '@chakra-ui/react';
import { ButtonComponent } from '../../ButtonComponent';
import {
  getConnectors,
  setConnectorEditState,
} from '../../../redux/slices/connectors';
import { createConnection } from '../../../api/connectorsApi';
import assets from '../../../assets';

const SaveConnectorButton = ({ data, currentStrategy }) => {
  const { currentConnector, ConnectorEditState } = useSelector(
    (state) => state.connectors,
  );
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  return (
    <ButtonComponent
      colorScheme={'brand'}
      text='Save'
      width={{ base: 'full', sm: 'fit-content' }}
      icon={assets.saveIcon}
      size={{ base: 'lg', sm: 'md' }}
      to={''}
      color={'white'}
      onClick={async () => {
        const { isValidationSuccessful, messages } =
          await currentStrategy.validate(data);
        if (isValidationSuccessful) {
          setLoading(true);
          const finalData = { ...data };
          if (ConnectorEditState === 'editing')
            finalData.inputId = currentConnector._id;
          createConnection(finalData)
            .then(() => {
              dispatch(getConnectors());
              dispatch(setConnectorEditState(null));
              let titleAction = 'updated';
              if (ConnectorEditState === 'addition') titleAction = 'added';
              toast({
                title: `Connector successfully ${titleAction}`,
                status: 'success',
                isClosable: true,
                colorScheme: 'green',
              });
              navigate('/connectors');
            })
            .catch((error) => {
              if (error.response && error.response.status === 409) {
                toast({
                  title: 'Such a connector already exists',
                  status: 'error',
                  isClosable: true,
                  colorScheme: 'red',
                });
              } else if (error.response && error.response.status === 400) {
                const { errors } = error.response.data;
                const description = errors.map(
                  (errMsg) => <Text key={errMsg}>{errMsg}</Text>,
                  '',
                );
                toast({
                  title: 'Strategy settings are configured incorrectly',
                  description,
                  status: 'error',
                  isClosable: true,
                  colorScheme: 'red',
                  duration: 15000,
                });
              } else {
                toast({
                  title: 'An error occurred',
                  description: 'Please try again later',
                  status: 'error',
                  isClosable: true,
                  colorScheme: 'red',
                });
              }
            })
            .finally(() => {
              setLoading(false);
            });
        } else if (isValidationSuccessful === false) {
          const description = messages.map((message) => (
            <Text mt={2} key={message}>
              {message}
            </Text>
          ));
          toast({
            title: 'The fields are filled in incorrectly',
            description,
            status: 'error',
            isClosable: true,
            colorScheme: 'red',
            duration: 15000,
          });
        }
      }}
      isLoading={isLoading}
    />
  );
};

export default SaveConnectorButton;
