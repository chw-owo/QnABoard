import Axios from "axios";
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { questionContentState, answerContentState, answerState } from "../atoms";
import { useParams } from 'react-router-dom';

function Detail() {

    const { idpost } = useParams();
    
    const [questionContent, setQuestionContent] = useRecoilState(questionContentState);
    const [answerContent, setAnswerContent] = useRecoilState(answerContentState);
    const [answer, setAnswer] = useRecoilState(answerState);

    const onAnswerHandler = (e) => {
        setAnswer(e.target.value);
    }

    const onAnswer = () => {

        const answerInfo = {
            answer,
            idpost
        }

        if(answer === ""){
            console.log('내용을 다 입력해주십시오.');
        }
  
        else{
            console.log(answerInfo);
            Axios.post("http://localhost:8000/post/answer", answerInfo)
            .then((res)=>{
                console.log(res);
                document.location.href = `/detail/${idpost}`
            })
            .catch((e)=>{
                console.error(e);
            });
        };
    }

    useEffect(()=>{
        Axios.get(`http://localhost:8000/answer/${idpost}`)
        .then((res)=>{
            console.log(res.data);
            setAnswerContent(res.data);
      
        })
    }, [setAnswerContent, idpost]);



    useEffect(()=>{
        Axios.get(`http://localhost:8000/question/${idpost}`)
        .then((res)=>{
            console.log(res.data);
            setQuestionContent(res.data);
        })
    }, [setQuestionContent, idpost]);

    return (
        <div className="Detail">
            <div class = "body">
                
                <div class="box">
                    <div class="container question-container">
                    <h3>Question</h3> 

                    {questionContent.map(element =>
                        <div class="box-part">
                        <div class="title content-box">
                        <h5>{element.TITLE}</h5>
                        </div>
                        <div class="text content-box">
                        <span>{element.CONTENT}</span>
                        </div>  
                        <button class="btn btn-edit btn-outline-light btn-lg px-5 text-dark ">Edit</button>        
                        </div>
                
                    )}

                        
                    </div>

                    <div class="container answer-container">
                    <h3>Answer</h3>
                    
                    {answerContent.map(element =>
                        <div class="box-part">
                        <div class="text content-box">
                        <span>{element.ANSWER}</span>
                        </div>    
                        <button class="btn btn-accept btn-outline-light btn-lg px-5 text-dark ">Accept</button>         
                        </div>
                
                    )}
                    

                    </div>

                    <div class="container answer-container">
                    <h3>What's your Answer?</h3>
                    <div class = "input-part">
                    <input type="text" readonly class="form-control form-body form-content" id="answer" name="answer"
                    value={answer} onChange={onAnswerHandler}></input>
                    </div>
                    
                    </div>
                    <button onClick={onAnswer} class="btn btn-answer bg-dark btn-outline-light btn-lg px-5 text-white ">Go to Answer!</button>

                    
                </div>
            </div>
        </div>

  );
}

export default Detail;