import React, { useEffect } from "react";
import "./index.css";

export default function KanbanBoard(props) {
  const [searchInput, setSearchInput] = React.useState("");
  const [isActiveBtnForward, setIsActiveBtnForward] = React.useState(true);
  const [isActiveBtnBack, setIsActiveBtnBack] = React.useState(true);
  const [isFull, setIsFull] = React.useState(true);

  let [tasks, setTasks] = React.useState([
    { name: "Despertar", stage: 0 },
    { name: "Desayunar", stage: 0 },
  ]);

  let [stagesNames, setStagesNames] = React.useState([
    "Backlog",
    "To Do",
    "Ongoing",
    "Done",
  ]);

  let stagesTasks = [];
  for (let i = 0; i < stagesNames.length; ++i) {
    stagesTasks.push([]);
  }

  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }

  // tasks.forEach(element => {
  //   if(element.stage === 0){
  //     setIsActiveBtnBack(false);
  //   } else if(element.stage > stagesNames.length){
  //     setIsActiveBtnForward(false);
  //   } else {
  //     setIsActiveBtnBack(true);
  //     setIsActiveBtnForward(true);
  //   }
  // });

  const changeStageTaskPlus = (taskToDo) => {
    console.log("INDEX",taskToDo);
    tasks[taskToDo].stage = tasks[taskToDo].stage + 1;
    setTasks(() => [...tasks]);
  };

  const addTask = (taskToDo) => {
    if (taskToDo.length > 0) {
      const objectToSend = {
        name: taskToDo,
        stage: 0,
      };
      tasks.push(objectToSend);
      setSearchInput("");
    }
  };

  const changeStageTaskMinus = (taskToDo) => {
    tasks[taskToDo].stage = tasks[taskToDo].stage - 1;
    setTasks(() => [...tasks]);
  };

  const deleteTask = (taskToDoId) => {
    tasks.splice(taskToDoId, 1);
    setTasks(() => [...tasks]);
  };

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input
          id="create-task-input"
          type="text"
          className="large"
          placeholder="New task name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          data-testid="create-task-input"
        />
        <button
          type="submit"
          className="ml-30"
          onClick={() => addTask(searchInput)}
          data-testid="create-task-button"
        >
          Create task
        </button>
      </section>

      <div className="mt-50 layout-row">
        {stagesTasks.map((tasks, i) => {
          return (
            <div className="card outlined ml-20 mt-0" key={`${i}`}>
              <div className="card-text">
                <h4>{stagesNames[i]}</h4>
                <ul className="styled mt-50" data-testid={`stage-${i}`}>
                  {tasks.map((task, index) => {
                    return (
                      <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span
                            data-testid={`${task.name
                              .split(" ")
                              .join("-")}-name`}
                          >
                            {task.name}
                          </span>
                          <div className="icons">
                            <button
                              className="icon-only x-small mx-2 d-flex arrow_back"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-back`}
                              onClick={() => changeStageTaskMinus(index)}
                              disabled={!isActiveBtnBack}
                            >
                              <i className="material-icons">arrow_back</i>
                            </button>
                            <button
                              className="icon-only x-small mx-2 d-flex arrow_forward"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-forward`}
                              onClick={() => changeStageTaskPlus(index)}
                              disabled={!isActiveBtnForward}
                            >
                              <i className="material-icons">arrow_forward</i>
                            </button>
                            <button
                              className="icon-only danger x-small mx-2 d-flex delete"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-delete`}
                              onClick={() => deleteTask(index)}
                            >
                              <i className="material-icons">delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
