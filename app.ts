#! /usr/bin/env node
// sSHABANG

import inquirer from "inquirer";

let todos: any[] = [];
let condition = true;

async function main() {
  while (condition) {
    let choice = await inquirer.prompt([
      {
        name: "option",
        type: "list",
        message: "CHOOSE AN OPTIONS :",
        choices: [
          "Add Task",
          "Read Tasks",
          "Update Task",
          "Delete Task",
          "Exit",
        ],
      },
    ]);

    switch (choice.option) {
      case "Add Task":
        await addTask();
        break;
      case "Read Tasks":
        readTasks();
        break;
      case "Update Task":
        await updateTask();
        break;
      case "Delete Task":
        await deleteTask();
        break;
      case "Exit":
        condition = false;
        console.log("Exit...");
        break;
    }
  }
}

async function addTask() {
  let addTask = await inquirer.prompt([
    {
      name: "todo",
      type: "input",
      message: "What you want to add in your Todo list?",
    },
  ]);
  todos.push(addTask.todo);
  console.log(` \t${addTask.todo} task added to todo list.`);
}

function readTasks() {
  console.log(" Your Todo List:");
  todos.forEach((task, index) => {
    console.log(`\n  ${index + 1}. ${task}\n`);
  });
}

async function updateTask() {
  if (todos.length === 0) {
    console.log("No tasks to update.");
    return;
  }

  let updateChoice = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "Enter the index of the task you want to update.",
      validate: (input) =>
        (input > 0 && input <= todos.length) || "Invalid index ",
    },
    {
      name: "updatedTask",
      type: "input",
      message: "Enter the updated task:",
    },
  ]);

  todos[updateChoice.index - 1] = updateChoice.updatedTask;
  console.log("\n \t Task updated successfully \n");
}

async function deleteTask() {
  if (todos.length === 0) {
    console.log("No tasks to delete")
    return;
  }

  let deleteChoice = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "Enter the Index  of the task you want to delete:",
      validate: (input) =>
        (input > 0 && input <= todos.length) || "Invalid index"
    },
  ]);

  todos.splice(deleteChoice.index - 1, 1);
  console.log(" Task deleted successfully.");
}

main();