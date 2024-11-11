/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable guard-for-in */
/* eslint-disable default-case */
import { useEffect, useState } from 'react';

type Validations = {
  minLenght?: number;
  isContainsUppercaseLetter?: boolean,
  isContainsLowercaseLetter?: boolean,
  isContainsSpecialCharacters?: boolean,
  isContainsNumber?: boolean;
};

export const useValidation = (value: string, validations: Validations) => {
  const [minLenght, setMinLenght] = useState(false);
  const [isContainsUppercaseLetter, setIsContainsUppercaseLetter] = useState(false);
  const [isContainsLowercaseLetter, setIsContainsLowercaseLetter] = useState(false);
  const [isContainsSpecialCharacters, setIsContainsSpecialCharacters] = useState(false);
  const [isContainsNumber, setIsContainsNumber] = useState(false);

  const [isValid, setIsValid] = useState(true);

  const regNumber = /[0-9]/;
  const regUppercaseLetter = /[A-Z]/;
  const regLowercaseLetter = /[a-z]/;
  const regSpecialCharacters = /\W|_/g;

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLenght':
          // @ts-ignore
          value.length > validations[validation] ? setMinLenght(true) : setMinLenght(false);
          break;
        case 'isContainsUppercaseLetter':
          setIsContainsUppercaseLetter(regUppercaseLetter.test(value));
          break;
        case 'isContainsLowercaseLetter':
          setIsContainsLowercaseLetter(regLowercaseLetter.test(value));
          break;
        case 'isContainsNumber':
          setIsContainsNumber(regNumber.test(value));
          break;
        case 'isContainsSpecialCharacters':
          setIsContainsSpecialCharacters(regSpecialCharacters.test(value));
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (minLenght && isContainsUppercaseLetter && isContainsLowercaseLetter && isContainsNumber && isContainsSpecialCharacters) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
  }, [minLenght, isContainsUppercaseLetter, isContainsLowercaseLetter, isContainsNumber, isContainsSpecialCharacters]);

  return {
    minLenght,
    isContainsUppercaseLetter,
    isContainsLowercaseLetter,
    isContainsNumber,
    isContainsSpecialCharacters,
    isValid,
  };
};
