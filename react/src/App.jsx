import AppointmentCalendar from "./components/calendar";
import Quiz from "./components/quiz";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <h1>Quiz App</h1>
      <Quiz />
      <AppointmentCalendar />
    </div>
  );
}

export default App;
