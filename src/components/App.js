import React, { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import AdminNavBar from "./AdminNavBar"

function App() {
  const [page, setPage] = useState("List")
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from the server
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]); // Add the new question to the list
  }

  function handleDeleteQuestion(id) {
    // Remove the question from the server
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => {
        // Update the state after deletion
        setQuestions(questions.filter((question) => question.id !== id));
      });
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form"? <QuestionForm onAddQuestion={handleAddQuestion} />: <QuestionList questions={questions} onUpdate={handleUpdateQuestion} onDelete={handleDeleteQuestion} />}
      
    </main>
  );
}

export default App;