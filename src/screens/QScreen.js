import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MainContain from '../components/MainContain';
import Answer from '../components/Answer';
import { answers, questions } from '../res/data/appData';
import { useNavigation } from '@react-navigation/native';
import screenName from '../../route/screenName';

const Q1 = () => {
  const [question, setQuestion] = useState({});
  const [qAnswers, setQAnswers] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const navigation = useNavigation();

  const generateRand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const shuffleAnswers = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  }

  const addAnswerToArray = (trueAnswerID, answersError) => {
    var a = [trueAnswerID, ...answersError]
    a = shuffleAnswers(a);
    setQAnswers(a);
  };

  const passTheTest = () => {
    navigation.navigate(screenName.screen3);
  }

  const generateRandQ = () => {
    let remainingQuestions = questions.filter((q) => !answeredQuestions.includes(q));

    if (remainingQuestions.length === 0) {
      return passTheTest(); 
    }

    const qIndex = generateRand(0, remainingQuestions.length - 1);
    const randQuestion = remainingQuestions[qIndex];


    addAnswerToArray(randQuestion.answerID, randQuestion.answersError);
    setQuestion(randQuestion);
  };

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === question.answerID) {
      setAnsweredQuestions([...answeredQuestions, question]);
    } else {
      navigation.navigate(screenName.screenRed);
    }
  };

  useEffect(() => {
    generateRandQ();
  }, [answeredQuestions]);

  return (
    <MainContain>
      <Text style={styles.textSt}>{question.text}</Text>
      {qAnswers.map((answerID, index) => (
        <Answer key={index} name={answers[answerID]} click={() => handleAnswerClick(answerID)} />
      ))}
    </MainContain>
  );
};

const styles = StyleSheet.create({
  textSt: {
    color: 'black',
    fontSize: 40,
    alignItems: 'center',
    marginBottom: 40,
  },
});

export default Q1;
