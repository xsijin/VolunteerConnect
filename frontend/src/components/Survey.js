import React from "react";

function Survey() {
  const [questions, setQuestions] = useState([{ questionText: "" }]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: "" }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  //   const token = localStorage.getItem('token'); // Get the stored JWT token

  const handleSubmit = async (event) => {
    event.preventDefault();

    const surveyData = {
      title,
      description,
      questions: questions.map((q) => q.questionText),
    };

    try {
      const response = await fetch(VITE_API_BASEURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}` // Include the JWT token in the request
        },
        body: JSON.stringify(surveyData),
      });
      console.log("Survey created successfully:", response.data);
      // Optionally reset the form or show a success message
      setTitle("");
      setDescription("");
      setQuestions([{ questionText: "" }]);
    } catch (error) {
      console.error("Error creating survey:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Survey Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Survey Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        {questions.map((question, index) => (
          <div key={index}>
            <label>Question {index + 1}</label>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, e)}
              required
            />
            <button type="button" onClick={() => handleRemoveQuestion(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
      </div>
      <button type="submit">Submit Survey</button>
    </form>
  );
}

export default Survey;
