import {
  Center,
  HStack,
  Heading,
  Spinner,
} from "native-base"

import React from 'react';

const Loading = () => {
  return (
    <Center flex={1} px="3">
      <HStack space={2} alignItems="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    </Center>
  )
}

export default Loading;
