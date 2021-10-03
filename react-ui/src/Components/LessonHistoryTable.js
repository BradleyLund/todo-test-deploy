import Table from "react-bootstrap/Table";

export default function LessonHistoryTable(props) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Difficulty Level</th>
          <th>Score</th>
          <th>Percentage</th>
          <th>Total Time Spent</th>
        </tr>
      </thead>
      <tbody>
        {props.lessonHistoryArray.map((lesson, index) => (
          <tr key={index}>
            <td>{lesson.date.split("T")[0]}</td>
            <td>{lesson.difficultyLevel}</td>
            <td>{lesson.score}/10</td>
            <td>{lesson.score * 10}%</td>
            <td>
              {new Date(lesson.totalTime * 1000).toISOString().substr(11, 8)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
