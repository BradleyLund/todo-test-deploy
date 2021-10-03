import Table from "react-bootstrap/Table";

export default function StudentTable(props) {
  for (let student of props.studentsArray) {
    // calculate the total time, score and percentage for each of the students
    if (student.lessonHistoryArray.length > 0) {
      let cumulativeTime = 0;
      let totalLessons = student.lessonHistoryArray.length;
      let cumulativeScore = 0;
      for (let lesson of student.lessonHistoryArray) {
        cumulativeTime += lesson.totalTime;
        cumulativeScore += lesson.score;
      }

      let percentage = (cumulativeScore / (totalLessons * 10)) * 100;

      student.cumulativeTime = cumulativeTime;
      student.cumulativeScore = `${cumulativeScore}/${totalLessons * 10}`;
      student.percentage = percentage;
    } else {
      student.cumulativeTime = 0;
      student.cumulativeScore = 0;
      student.percentage = 0;
    }
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Difficulty Level</th>
          <th>Score</th>
          <th>Percentage</th>
          <th>Total Time Spent</th>
        </tr>
      </thead>
      <tbody>
        {props.studentsArray.map((student, index) => (
          <tr key={index}>
            <td>{student.username}</td>
            <td>{student.difficultyLevel}</td>
            <td>{student.cumulativeScore}</td>
            <td>{student.percentage.toFixed(2)}%</td>
            <td>
              {new Date(student.cumulativeTime * 1000)
                .toISOString()
                .substr(11, 8)}{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
