let taskInput = document.getElementById("taskInput")
let addBtn = document.getElementById("addBtn")
let sections = document.querySelectorAll(".taskList")
let progressBar = document.getElementById("progressBar")
let progressText = document.getElementById("progressText")
let congratsMsg = document.getElementById("congratsMsg")
let moodSelect = document.getElementById("moodSelect")
let draggedTask = null

function updateProgress() {
    let allTasks = document.querySelectorAll(".task")
    let completedTasks = document.querySelectorAll(".task.completed")
    let percent = allTasks.length ? (completedTasks.length / allTasks.length) * 100 : 0
    progressBar.style.width = percent + "%"
    progressText.innerText = completedTasks.length + " / " + allTasks.length

    if(allTasks.length && completedTasks.length === allTasks.length) {
        congratsMsg.style.display = "block"
    } else {
        congratsMsg.style.display = "none"
    }
}

function addTaskToSection(text, section=sections[0]) {
    let task = document.createElement("div")
    task.className = "task"
    task.draggable = true

    let span = document.createElement("span")
    span.innerText = text
    let btn = document.createElement("button")
    btn.innerText = "Done"

    btn.onclick = function() {
        task.classList.toggle("completed")
        updateProgress()
    }

    task.appendChild(span)
    task.appendChild(btn)

    task.ondragstart = function() { draggedTask = task }
    task.ondragend = function() { draggedTask = null }

    section.appendChild(task)
    updateProgress()
}

addBtn.onclick = function() {
    if(!taskInput.value) return
    addTaskToSection(taskInput.value)
    taskInput.value = ""
}

sections.forEach(section => {
    section.ondragover = function(e) { e.preventDefault() }
    section.ondrop = function(e) {
        e.preventDefault()
        if(draggedTask) section.appendChild(draggedTask)
    }
})

moodSelect.onchange = function() {
    let mood = moodSelect.value
    if(mood=="calm") document.documentElement.style.setProperty('--primary','#a0c4ff'), document.documentElement.style.setProperty('--secondary','#caf0f8')
    if(mood=="focused") document.documentElement.style.setProperty('--primary','#667eea'), document.documentElement.style.setProperty('--secondary','#764ba2')
    if(mood=="energetic") document.documentElement.style.setProperty('--primary','#ffbe0b'), document.documentElement.style.setProperty('--secondary','#fb5607')
}

document.addEventListener("keydown", function(e){
    if(e.key=="N") taskInput.focus()
    if(e.key=="Enter") addBtn.click()
    if(e.key==" ") {
        let task = document.querySelector(".task:hover")
        if(task) { task.classList.toggle("completed"); updateProgress() }
    }
})
