import React, { useEffect, useState } from 'react'
import { BiSolidPencil } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import 'aos/dist/aos.css'
import Aos from 'aos';


const Todo = () => {
   useEffect(() => {
        Aos.init({
            duration: 1,
        });
    }, []);

  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");

  const handleTaskAdding = () => {
    if (taskName.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), name: taskName }]);
      setTaskName("");
    } else {
      alert("Please enter a task name");
    }
  };

  const handleTaskDelete = (id, taskNumber) => {
    const newList = tasks.filter((task) => task.id !== id);
    setTasks(newList);
    alert(`The item number ${taskNumber} will be deleted`);
  };

  const handleEdit = (id, newName) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, name: newName } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditedTaskName("");
  };

  return (
    <>
      <h1 className="p-3 text-center font-bold text-2xl text-[#0A174E]" data-aos="zoom-in">
        THIS IS TODO LIST PAGE
      </h1>
      <div className="flex flex-col justify-normal gap-4 m-auto mt-10 p-7 bg-[#0A174E] w-fit" data-aos="fade-up">
        <div className="flex justify-normal gap-4">
          <input
            type="text"
            className="border border-solid border-[#0A174E] outline-none p-3"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task Name"
          />
          <button
            className="border border-solid border-[#F5D042] bg-[#F5D042] font-extrabold text-[#0A174E] rounded-sm p-3"
            onClick={handleTaskAdding}
          >
            SUBMIT
          </button>
        </div>

        <div>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='border border-[#F5D042] text-[#F5D042] px-4 py-2'>Task</th>
                <th className='border border-[#F5D042] text-[#F5D042] px-4 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td className='border border-[#F5D042] p-3 text-[#F5D042] font-medium'>
                    {editingTask === task.id ? (
                      <input
                        type="text"
                        value={editedTaskName}
                        className='text-[#0A174E]'
                        onChange={(e) => setEditedTaskName(e.target.value)}
                      />
                    ) : (
                      task.name
                    )}
                  </td>

                  <td className='border border-[#F5D042] p-3'>
                    <div className='flex gap-5'>
                      <BsTrash
                        color="red"
                        size={25}
                        className="cursor-pointer ml-3"
                        onClick={() => handleTaskDelete(task.id, index + 1)}
                      />
                      {editingTask === task.id ? (
                        <button
                          className="text-xs text-[#F5D042] font-bold"
                          onClick={() => handleEdit(task.id, editedTaskName)}
                        >
                          Save
                        </button>
                      ) : (
                        <BiSolidPencil
                          color="red"
                          size={25}
                          className="cursor-pointer ml-3 text-[#0A174E}"
                          onClick={() => {
                            setEditingTask(task.id);
                            setEditedTaskName(task.name);
                          }}
                        />
                      )}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table >
        </div >
      </div>
    </>
  )
};

export default Todo