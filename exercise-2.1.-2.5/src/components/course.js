
const Header = ({courses}) =>(
    <h1>{courses[0].name}</h1>
)

const Part = ({courses}) =>{
    return(
        <div>
            {courses[0].parts.map(part =>(
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            ))}
        </div>
    )
}

const Total = ({ courses }) => {
    const totalExercises = courses[0].parts.reduce((sum, part) => sum + part.exercises, 0);
  
    return (
      <div>
        <p style={{fontWeight: "bolder"}}>Total of {totalExercises} exercises</p>
      </div>
    );
  };


const Course = ({ courses }) => {
    const totalExercises = courses[1].parts.reduce((sum,part) => sum + part.exercises,0)
    return (
      <div>
        <Header courses={courses} />
        <Part courses={courses} />
        <Total courses={courses}/>
        <h3>{courses[1].name}</h3>
        <p>{courses[1].parts[0].name} {courses[1].parts[0].exercises}</p>
        <p>{courses[1].parts[1].name} {courses[1].parts[1].exercises}</p>
        <p style={{fontWeight:"bolder"}}>total {totalExercises} exercises</p>
      </div>
    );
  };
  export default Course;