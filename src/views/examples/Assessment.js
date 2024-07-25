/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Card, Container, Row } from "reactstrap";
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import QuestionCard from '../../variables/QuestionCard';
// core components
// import Header from "components/Headers/Header.js";
import AssessmentHeader from "components/Headers/AssessmentHeader";

const questions = [
  {
    id: 1,
    text: "How would you describe your investment knowledge?",
    options: ["Extensive", "Moderate", "Basic"]
  },
  {
    id: 2,
    text: "What is your primary investment goal?",
    options: ["Growth", "Income", "Preservation"]
  },
  // Add more questions here
];


const Assessment = () => {

  const [answers, setAnswers] = useState({});
  const { questionId } = useParams();
  const currentQuestionId = parseInt(questionId, 10);
  const navigate = useNavigate();

  // if (isNaN(currentQuestionId) || currentQuestionId < 1 || currentQuestionId > questions.length) {
  //   navigate(`/admin/assessment/1`, { replace: true });
  //   return null;
  // }

  useEffect(() => {
    // Redirect to the first question if `questionId` is invalid
    if (isNaN(currentQuestionId) || currentQuestionId < 1 || currentQuestionId > questions.length) {
      navigate(`/admin/assessment/1`, { replace: true });
    }
  }, [currentQuestionId, navigate]);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const nextQuestion = () => {
    console.log(currentQuestionId, questionId, questions.length);
    if (currentQuestionId < questions.length) {
      navigate(`/admin/assessment/${currentQuestionId + 1}`);
    }
  };

  const prevQuestion = () => {
    console.log(currentQuestionId, questionId, questions.length);
    if (currentQuestionId > 1) {
      navigate(`/admin/assessment/${currentQuestionId - 1}`);
    }
  };

  return (
    <>
      <AssessmentHeader />
      {/* Page content */}


      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-1">
              <Routes>
                {questions.map((question) => (
                  <Route
                    key={question.id}
                    path={`${question.id}`}
                    element={
                      <QuestionCard
                        question={question}
                        totalQuestions={questions.length}
                        currentQuestion={currentQuestionId}
                        answer={answers[question.id]}
                        onAnswer={handleAnswer}
                        onNext={nextQuestion}
                        onPrev={prevQuestion}
                      />
                    }
                  />
                ))}
                <Route path="*" element={<div>Question not found</div>} />
                {/* Insert Risk assesment here */}
              </Routes>
            </Card>
          </div>
        </Row>
      </Container>

    </>
  );
};

export default Assessment;
