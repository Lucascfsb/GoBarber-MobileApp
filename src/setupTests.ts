import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('expo-font', () => ({
    isLoaded: jest.fn().mockReturnValue(true), // Mock sempre retorna true, indicando que as fontes estão carregadas
    loadAsync: jest.fn(), // Mock de loadAsync, caso seja usado
  }));