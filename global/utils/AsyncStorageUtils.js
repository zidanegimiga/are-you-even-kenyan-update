import AsyncStorage from "@react-native-async-storage/async-storage"
import { QUESTION_PROGRESS_STORAGE_KEY, CORRECT_ANSWERS_KEY } from "../constants/AsyncStorageKeys"

const storeCurrentQuestionIndex = async (newQuestionIndex) => {
    try {
        await AsyncStorage.setItem(QUESTION_PROGRESS_STORAGE_KEY, String(newQuestionIndex))
    } catch (e) {
        console.error(e)
    }
}

const storeCurrentScoreOfWrongAnswers = async (score) => {
    console.log("Trying to store " + score)
    try {
        await AsyncStorage.setItem(SCORE_OF_WRONG_ANSWERS_KEY, String(score))
    } catch (e) {
        console.error(e)
    }
}

const fetchScoreAndCallSetState = async (setState) => {
    const result = await AsyncStorage.getItem(SCORE_OF_WRONG_ANSWERS_KEY)
    const scoreOfWrongAnswers = result
    const resultAsNumber = Number(scoreOfWrongAnswers)
    if (!isNaN(resultAsNumber)) {
        setState(resultAsNumber)
    }
}

const storeNumberOfCorrectAnswers = async (score) => {
    console.log("Trying store " + score + " number of correct ans")
    try {
        await AsyncStorage.setItem(CORRECT_ANSWERS_KEY, String(score))
        console.log("Wrote number of correct answers: " + score)
    } catch (e) {
        console.error(e)
    }
}

const fetchNumberOfCorrectAnswers = async () => {
    const result = await AsyncStorage.getItem(CORRECT_ANSWERS_KEY)
    console.log("Read number of correct answers: " + result)
    return Number(result)
}

export { storeCurrentQuestionIndex, fetchNumberOfCorrectAnswers, storeNumberOfCorrectAnswers }