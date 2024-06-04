import { useState, useRef } from "react";
import { Container, Text, VStack, Button, HStack, Box } from "@chakra-ui/react";

const Index = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [splits, setSplits] = useState([]);
  const timerRef = useRef(null);

  const formatTime = (time) => {
    const milliseconds = `0${time % 100}`.slice(-2);
    const seconds = `0${Math.floor(time / 100) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 6000)}`.slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const startStopTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setIsRunning(false);
    setSplits([]);
  };

  const splitTimer = () => {
    if (isRunning) {
      setSplits([...splits, time]);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Box borderWidth="1px" borderRadius="lg" p={4} width="100%" textAlign="center">
          <Text fontSize="4xl" fontWeight="bold">
            {formatTime(time)}
          </Text>
        </Box>
        <HStack spacing={4}>
          <Button colorScheme="teal" onClick={startStopTimer}>
            {isRunning ? "Stop" : "Start"}
          </Button>
          <Button colorScheme="red" onClick={resetTimer}>
            Reset
          </Button>
          <Button colorScheme="blue" onClick={splitTimer}>
            Split
          </Button>
        </HStack>
        <VStack spacing={2} width="100%">
          {splits.map((split, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" p={2} width="100%" textAlign="center">
              <Text fontSize="lg">Split {index + 1}: {formatTime(split)}</Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;