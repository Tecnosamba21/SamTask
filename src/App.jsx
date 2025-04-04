import './App.css'

let submit_src
let trash_src = './assets/trash.svg'

function createTask(text) {
  const container = document.getElementById('tasks')

  const task_div = document.createElement('div')
  task_div.classList.add('task')
  const h3 = document.createElement('h3')
  h3.textContent = text
  h3.contentEditable = true
  h3.onkeydown = (key) => {
    if (key.key === 'Enter') {
      key.preventDefault()
    }
  }
  const text_container = document.createElement('div')
  text_container.classList.add('text-container')
  text_container.appendChild(h3)
  task_div.appendChild(text_container)
  const button = document.createElement('button')
  button.addEventListener('click', () => {
    button.parentElement.remove()
    let tasks = []

    Array.from(container.children).forEach(child => {
      const text = child.querySelector('h3').textContent
      tasks.push(text)
    })


    localStorage.setItem('tasks', tasks)
  })
  const trash_icon = document.createElement('img')
  trash_icon.src = trash_src
  button.appendChild(trash_icon)
  task_div.appendChild(button)
  container.appendChild(task_div)
}

function addTask() {
  const input = document.getElementById('submit-input')
  const container = document.getElementById('tasks')

  if (input.value.trim().length === 0 || input.value.trim().length <= 1) return

  createTask(input.value)

  input.value = ''

  let tasks = []

  Array.from(container.children).forEach(child => {
    const text = child.querySelector('h3').textContent
    tasks.push(text)
  })


  localStorage.setItem('tasks', tasks)
}

function keyDown(e) {
  if (e.key === 'Enter') {
    addTask()
  }
}



function App() {

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    submit_src = './assets/submit-dark.svg'
  } else {
    submit_src = './assets/submit-light.svg'
  }


  return (
    <>
      <title>SamTask - Never forget anything!</title>
      <link rel="icon" type="image/x-icon" href="./assets/favicon-48x48.ico" sizes='48x48' />
      <link rel="icon" type="image/x-icon" href="./assets/favicon-64x64.ico" sizes='64x64' />
      <link rel="icon" type="image/x-icon" href="./assets/favicon-128x128.ico" sizes='128x128' />
      <link rel="icon" type="image/x-icon" href="./assets/favicon-256x256.ico" sizes='256x256' />
      <div className="app">
        <header>
          <div className="title">
            <h1>SamTask</h1>
            <span>Write down your tasks to never forget them!</span>
          </div>
          <div className="input">
            <input type="text" autoFocus id='submit-input' onKeyDown={keyDown} aria-label='Write your tasks here and then, press Enter' />
            <img src={
              submit_src
            } alt="submit" id="submit" onClick={addTask} />
          </div>
        </header>
        <div id="tasks">

        </div>
      </div>
    </>
  )
}

export default App
