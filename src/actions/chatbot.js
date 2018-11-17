import axios from 'axios';
import{host } from '../config'
import {
  INIT_SUCCESS, INIT_FAILED,
  FETCH_MESSAGES_START, FETCH_MESSAGES_FAILED, FETCH_MESSAGES_SUCCESS,
  SEND_PICTURE_START, SEND_PICTURE_SUCCESS, SEND_PICTURE_FAILED,
  SEND_FORM_START, SEND_FORM_FAILED, SEND_FORM_SUCCESS,DESTROY_SESSION
} from '../constant/chatbot-consts';



export function init() {
  return dispatch => {
    const sessionId = Math.random() * 100000000000;
    axios.post('https://avia.splat.cleverbots.ru/splat/message/', {
      headers: {
      },
      'userId': '1', 'sessionId': sessionId, 'messageType': 1, 'message': 'hello'
    }).then((result) => {
      let res = result.data;
      dispatch({
        type: INIT_SUCCESS, payload: {
          from: 'bot', text: res.messages[0], imgSrc: res.messages[1]
        }, session_id:sessionId
      })
      setInterval(()=>dispatch(fetchMessages()),5000)

    }).catch(() => { dispatch({ type: INIT_FAILED }) })
  };
};

export function fetchMessages() {
  return (dispatch, getState) => {
    const session_id = getState().chatbot.session_id;
    dispatch({ type: FETCH_MESSAGES_START })
    axios.get('https://avia.splat.cleverbots.ru/splat/messages/', {
      params: {
        'userId': '1', 'sessionId': session_id
      }
    }
    ).then((result) => {
      let res = result.data;
      let resultArray = [];
    //  console.log('getbot', res)
      if (res.length > 0)
        res.forEach(item => resultArray.push({ from: 'bot', text: item.text, scrollToBottom: true }))
      dispatch({ type: FETCH_MESSAGES_SUCCESS, payload: resultArray })
    }).catch(() => dispatch({ type: FETCH_MESSAGES_FAILED }))
  };
};



export function sendForm(messageText) {
  return (dispatch, getState) => {
    const session_id = getState().chatbot.session_id;
    dispatch({ type: SEND_FORM_START })
    axios.post('https://avia.splat.cleverbots.ru:443/splat/message/', {
      'userId': '1', 'sessionId': session_id, 'messageType': 1, 'message': messageText
    }).then(() => {
      dispatch({ type: SEND_FORM_SUCCESS, payload: { from: 'user', text: messageText, scrollToBottom: true } })
      setTimeout(() => {
        dispatch(fetchMessages())
      }, 500)
    }).catch(()=>dispatch({type:SEND_FORM_FAILED, payload:{ from: 'bot', text:'К сожалению возникла ошибка при отправки вашего сообщения на сервер, пожалуйста повторите попытку', scrollToBottom: true }}))
  };
};
export function destroySession () {
  return (dispatch, getState) => {
   dispatch({type:DESTROY_SESSION})
  };
};
