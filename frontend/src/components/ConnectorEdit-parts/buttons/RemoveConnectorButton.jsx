import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { ButtonComponent } from '../../ButtonComponent';
import {
  setCurrentConnector,
  getConnectors,
} from '../../../redux/slices/connectors';
import { removeConnection } from '../../../api/connectorsApi';
import assets from '../../../assets';

const RemoveConnectorButton = ({ data }) => {
  const { currentConnector, ConnectorEditState } = useSelector(
    (state) => state.connectors,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <ButtonComponent
      size='md'
      icon={assets.trashLogo}
      variant='outline'
      text='Delete permanently'
      fontSize='16px'
      color='black.5'
      width={{ base: 'full', sm: 'fit-content' }}
      to={''}
      onClick={() => {
        if (currentConnector && ConnectorEditState === 'editing') {
          const { _id: inputId } = currentConnector;
          const finalData = { inputId, ...data };
          removeConnection(finalData)
            .then(() => {
              toast({
                title: `Connector deleted successfully`,
                status: 'success',
                isClosable: true,
                colorScheme: 'green',
              });
              dispatch(setCurrentConnector(null));
              dispatch(getConnectors());
              navigate('/connectors');
            })
            .catch(() => {
              toast({
                title: 'An error occurred',
                description: 'Please try again later',
                status: 'error',
                isClosable: true,
                colorScheme: 'red',
              });
            });
        } else {
          toast({
            title: 'Deletion is currently unavailable',
            status: 'info',
            isClosable: true,
          });
        }
      }}
    />
  );
};

export default RemoveConnectorButton;
