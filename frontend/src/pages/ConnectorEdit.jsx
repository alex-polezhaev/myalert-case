import React, { useEffect, useState } from 'react';
import { Button, Flex, Spacer, Spinner, Stack } from '@chakra-ui/react';
import { Header } from '../components';
import { services } from '../data/services';
import { useDispatch, useSelector } from 'react-redux';
import { getCombinations } from '../redux/slices/combinations';
import ServiceChoice from '../components/ConnectorEdit-parts/ServiceChoice';
import StrategyChoice from '../components/ConnectorEdit-parts/StrategyChoice';
import StrategySettings from '../components/ConnectorEdit-parts/StrategySettings';
import OutputsChoice from '../components/ConnectorEdit-parts/OutputsChoice';
import RemoveConnectorButton from '../components/ConnectorEdit-parts/buttons/RemoveConnectorButton';
import SaveConnectorButton from '../components/ConnectorEdit-parts/buttons/SaveConnectorButton';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ConnectorEdit = () => {
  const { loading: combinLoading, entities: combinations } = useSelector(
    (state) => state.combinations,
  );
  const { currentConnector, ConnectorEditState } = useSelector(
    (state) => state.connectors,
  );
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState({
    accountId: '',
    settings: {},
    outputs: [],
  });
  const [currentInputServiceKey, setCurrentInputServiceKey] = useState('');
  const [strategies, setStrategies] = useState({});
  const [currentStrategy, setCurrentStrategy] = useState(null);
  const [currentStrategyKey, setCurrentStrategyKey] = useState('');

  const chooseService = (
    serviceKey,
    accountId,
    initStrategyKey = null,
    initRules = null,
    outputs = [],
    multiSelectOptins = [],
  ) => {
    const currentService = services[serviceKey];
    setCurrentInputServiceKey(serviceKey);
    setStrategies(currentService.strategies);
    const strategyKey = initStrategyKey
      ? initStrategyKey
      : Object.keys(currentService.strategies)[0];
    setCurrentStrategy(currentService.strategies[strategyKey]);
    const rules = initRules
      ? initRules
      : currentService.strategies[strategyKey].rules;
    setData({
      ...data,
      accountId,
      settings: {
        [strategyKey]: {
          ...rules,
        },
      },
      outputs,
    });
    setSelected(multiSelectOptins);
  };

  useEffect(() => {
    dispatch(getCombinations());
  }, []);

  const createMiltiselectOptions = (callbackPredicate) => {
    if (currentInputServiceKey) {
      const { outputs } = combinations.filter(
        (el) => el.service === currentInputServiceKey,
      )[0];

      return outputs.filter(callbackPredicate).map((el) => ({
        id: el._id,
        label: el.title,
        value: el._id,
        service: el.service,
      }));
    }
    return [];
  };

  const createOutputOptions = (selectedOutputs) => {
    const callbackPredicate = (el) => !selectedOutputs.includes(el._id);
    return createMiltiselectOptions(callbackPredicate);
  };

  const createSelected = (selectedOutputs = []) => {
    const callbackPredicate = (el) => selectedOutputs.includes(el._id);
    return createMiltiselectOptions(callbackPredicate);
  };

  useEffect(() => {
    if (!combinLoading && combinations.length > 0) {
      if (ConnectorEditState === 'editing') {
        const {
          input_service: serviceKey,
          account_id: accountId,
          settings,
          outputs,
        } = currentConnector;
        const [strategyKey, rules] = Object.entries(settings)[0];
        const preparedOutputs = outputs.map((output) => output.account_id);
        const multiSelectedOptions = createSelected(preparedOutputs);
        chooseService(
          serviceKey,
          accountId,
          strategyKey,
          rules,
          preparedOutputs,
          multiSelectedOptions,
        );
      } else {
        const initCombination = combinations[0];
        chooseService(initCombination.service, initCombination._id);
      }
    }
  }, [combinLoading]);

  return combinLoading ? (
    <Spinner
      mt={40}
      ml={40}
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='red.500'
      size='xl'
    />
  ) : (
    <>
      <Header text='Edit / add' addBtn={false} />
      <Stack className='card-box' px={{ base: '16px', sm: 6, desktop: 6 }}>
        <ServiceChoice
          chooseService={chooseService}
          currentInputServiceKey={currentInputServiceKey}
        />
        <StrategyChoice
          data={data}
          setData={setData}
          strategies={strategies}
          setCurrentStrategy={setCurrentStrategy}
          currentStrategyKey={currentStrategyKey}
          setCurrentStrategyKey={setCurrentStrategyKey}
        />
        <StrategySettings
          currentStrategy={currentStrategy}
          data={data}
          setData={setData}
        />
        <OutputsChoice
          data={data}
          setData={setData}
          selected={selected}
          setSelected={setSelected}
          createOutputOptions={createOutputOptions}
        />
      </Stack>
      <Flex
        gap={{ base: 2, sm: 3 }}
        flexDir={{ base: 'column', sm: 'row' }}
        justifyContent='end'
        mt={{ base: '20px', sm: 8 }}
        mb='45px'
      >
        <Link to='/connectors'>
          <Button
            leftIcon={<FaRegArrowAltCircleLeft />}
            variant={'outline'}
            color={'gray.500'}
          >
            Back
          </Button>
        </Link>
        <Spacer />
        <RemoveConnectorButton data={data} />
        <SaveConnectorButton data={data} currentStrategy={currentStrategy} />
      </Flex>
    </>
  );
};
export default ConnectorEdit;
