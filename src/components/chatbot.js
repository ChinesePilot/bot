import React, { Fragment } from 'react';
import ChatBot from 'react-simple-chatbot';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { init, fetchMessages, sendForm, sendPicture } from '../actions/chatbot';

const steps = [
    {
      id: '0',
      message: 'Welcome to react chatbot!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Bye!',
      end: true,
    },
  ];

class Chatbot extends React.Component {
    state = {
        
        openContainer: false,
        isHiddenButton: false,
        isComposed: false,
        isConfirm: false,
    };
    openBot = () => {
        this.setState({
            openContainer: true,
            isHiddenButton: true,
            isComposed: false
        });
    }
    closeBot = () => {
        this.setState({
            openContainer: false, isComposed: false,
            isHiddenButton: false
        });
    }
   
    render() {

        return (
           
              <div className="chatbot-wrapper">
                <a href="javascript:;" onClick={this.openBot} className={`chatbot-open-btn js-chatbot-open-btn  ${this.state.isHiddenButton ? 'is-hidden' : ''}`}></a>
                <div className={`chatbot-container js-chatbot-container ${this.state.isComposed ? 'is-composed' : ''} ${this.state.openContainer ? 'is-shown' : 'is-hidden'}`}>
               <ChatBot steps={steps} />
               </div>
               </div>

        );
    }
}
const mapDispatchtoProps = dispatch => bindActionCreators({ init, sendForm, fetchMessages, sendPicture }, dispatch);
const mapStateToProps = state => ({
    session_id: state.chatbot.session_id,
    messages: state.chatbot.messages
});

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Chatbot);


