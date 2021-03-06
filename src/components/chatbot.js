import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import renderHTML from 'react-render-html';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import logo  from '../images/logo.png';
import {addMessage} from '../actions/chatbot'


class Chatbot extends React.Component {
    state = {    
        openContainer: false,
        isHiddenButton: false,
        isComposed: false,
        isConfirm: false,  
    };
    componentDidMount(){}
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
    scrollToBottom = () => {
        const { messageList } = this.refs;
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    isConfirm = () => {
        this.setState({ isConfirm: true });
    }
    changeText = (event) => {
        this.setState({
            messageText: event.target.value
        })
    }
    render() {
        const addMessages = this.props.messages.map((item, index) => {
            let text = '', img = '';
            if (item.text) {
                text = <p>{renderHTML(item.text)}</p> 
            }
            if (item.imgSrc) {
                img = <img src={`${item.imgSrc}`} />
            }     
            if(item.scrollToBottom) {
                setTimeout(()=> {
                   this.scrollToBottom()
                }, 50)
            }
            return (
                <Fragment key={index}>
                    <div className={`chatbot__chat__message ${item.from === 'bot' ? 'chatbot__chat__message--bot' : 'chatbot__chat__message--user'}`}>
                        <div className='inner-container'>
                            {text}
                            {img}
                        </div>
                    </div>
                </Fragment>
            )
        })
        return (
           
            <div className="chatbot-wrapper">
            <a href="javascript:;" onClick={this.openBot} className={`chatbot-open-btn js-chatbot-open-btn  ${this.state.isHiddenButton ? 'is-hidden' : ''}`}>
            <img style={{width:'200px',height:'100px'}} src="https://image.flaticon.com/icons/svg/62/62940.svg"/>
            </a>

            <div className={`chatbot-container js-chatbot-container ${this.state.isComposed ? 'is-composed' : ''} ${this.state.openContainer ? 'is-shown' : 'is-hidden'}`}>
                <div className="chatbot-header">
                    <div className="chatbot-header__logo">
                        <img src={logo} alt="Лого" />
                    </div>
                    <div className="chatbot-header__company">
                       Кредит
        </div>
                    <a onClick={this.closeBot} href="javascript:;" className="chatbot-header__closer js-chatbot-header__closer"></a>
                </div>
                <div ref="messageList" className="chatbot__chat-wrapper  js-chatbot__chat-wrapper">
                    <div className="chatbot__chat cf">
                    <button  onClick={this.addmessage} className={'message-button'}>Переход на основной сайт</button>
                    <button onClick={()=>this.props.addMessage('Текущий статус заявки')} className={'message-button'}>Статус заявки</button>
                        {addMessages}
                    </div>
                </div>
                <div className="chatbot__controls">
                    <form id="chatbot__form" className="chatbot__form" onSubmit={this.submitForm} encType="multipart/form-data">
                        <div className="form-field">
                            <label htmlFor="input-file" className="label-file"></label>
                            <input type="file" id="input-file" onChange={this.changeFile} name="input-file" accept="image/*,image/jpeg" />
                        </div>
                        <div className="form-field form-field--text">
                            <label htmlFor="input-text"></label>
                            <input type="text" id="input-text" value={this.state.messageText} onChange={this.changeText} className="input-text" placeholder="Введите сообщение..." autoComplete="off" />
                        </div>
                        <button type="submit" className="submit"></button>
                    </form>
                </div>
                <div className={`chatbot__overlay ${this.state.isConfirm ? 'is-confirm' : ''}`}>
                    <p>
                        Даю согласие на обработку моей информации банком.
       </p>
                    <a href="javascript:;" onClick={this.isConfirm} className={'legal-btn'}>Даю согласие</a>
                </div>
            </div>
        </div>

        );
    }
}
const mapDispatchtoProps = dispatch => bindActionCreators({ addMessage }, dispatch);
const mapStateToProps = state => ({
    messages: state.chatbot.messages
});

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Chatbot);


