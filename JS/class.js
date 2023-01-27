class Quizz {
    constructor(name,solutions) {
        this.name = name
        this.solutions = solutions
        this.answers = []
        this.currentIndex = 0
        this.init()
        this.timer = new Chronometer(document.getElementById("timer"))
        this.timer.start()
        this.nextQuestion = document.getElementById("next-button").addEventListener("click", () => {this.next()})
        this.quit = document.getElementById("quit-button").addEventListener("click", () => {this.quit()})
        this.toggleTimer = document.getElementById("timer").addEventListener("click", () => {this.timer.toggle()})
        this.resetTimer = document.getElementById("timer").addEventListener("dblclick", () => {this.timer.reset()})
        
    }
    // Init method that starts the game
    init () {
        document.body.innerHTML = `
            <div class="image_container">
            <img src="/${this.name}/${this.name}-${this.currentIndex + 1}.JPG" id="image" alt="">
            </div>
            <div class="side_bar">
                <div class="answers">
                        <div class="options">
                            <div class="choice1">
                                <input type="checkbox" name="choice" value="A">
                            </div>
                            <label for="choice1">A</label>
                        </div>
                        <div class="options">
                            <div class="choice2">
                                <input type="checkbox" name="choice" value="B">
                            </div>
                            <label for="choice2">B</label>
                        </div>
                        <div class="options">
                            <div class="choice3">
                                <input type="checkbox" name="choice" value="C">
                            </div>
                            <label for="choice3">C</label>
                        </div>
                        <div class="options">
                            <div class="choice4">
                                <input type="checkbox" name="choice" value="D">
                            </div>
                            <label for="choice4">D</label>
                        </div>
                        <div class="buttons">
                            <button id="quit-button">QUIT</button>
                            <button id="next-button">NEXT</button>
                        </div>
                    
                </div>
                <div class="line"></div>
                <div id="timer">00:00</div>
                <audio src="/time.mp3#t=0,0.13" controls style="visibility:hidden" id="sound"></audio>
            </div>
        `
    }
    // next method to pass to the next question
    next() {
            let image = document.getElementById("image")
            let choices = document.getElementsByName("choice")

            let currentChoice = ''
            choices.forEach ( e => {
                if (e.checked){
                    currentChoice = currentChoice + e.value
                }
            })
            this.answers.push(currentChoice)
            //console.log(this.answers)
            
            choices.forEach ( e => {
                if (e.checked){
                    e.checked = false
                }
            })
            this.currentIndex++

            if (this.currentIndex > 24) {
                this.timer.stop()
                this.validate()
            }
            else image.src = `/${this.name}/${this.name}-${this.currentIndex + 1}.JPG`
    }
    // quit method to return home
    quit() {
        document.body.innerHTML = `
        <div class="container">
            <h1>DRIVING EXAM TEST</h1>
            <div class="description">
                <p class="read_me">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab ratione eveniet ad facere, voluptatum aperiam nam illum iure a sint? Ad provident aliquam natus ea eaque et, quidem ut fugiat?</p>
            </div>
            <div  class="form1" >
                <div class="options">
                    <select name="option_choice" id="option_choice">
                        <option class="option" value="">Choose an option</option>
                        <option class="option" value="B01">Série B1</option>
                        <option class="option" value="B02">Série B2</option>
                        <option class="option" value="B03">Série B3</option>
                        <option class="option" value="B04">Série B4</option>
                        <option class="option" value="B05">Série B5</option>
                        <option class="option" value="B06">Série B6</option>
                        <option class="option" value="B07">Série B7</option>
                        <option class="option" value="B08">Série B8</option>
                        <option class="option" value="B09">Série B9</option>
                        <option class="option" value="B10">Série B10</option>
                        <option class="option" value="B11">Série B11</option>
                        <option class="option" value="B12">Série B12</option>
                    </select>
                </div>
                <button id="form1" class="button">START</button>

            </div>
        </div>
        `
    }
    // validate method that display the final result
    validate() {
        this.currentIndex = 0
        document.body.innerHTML = `
        <div class="image_container">
        <img src="/${this.name}/${this.name}-${this.currentIndex+1}.JPG" id="image" alt="">
        </div>
        <div class="side_bar">
            <div class="answers bis">
                    <div class="option">A</div>
                    <div class="option">B</div>
                    <div class="option">C </div>
                    <div class="option">D</div>
            </div>
            <div id="results">
                <div class="score-hero">Nombre de questions faussées sur 25 : <span id="falses-answers"></span></div>
                <div class="score-hero">Temps mis : <span>${this.timer.pad2(Math.floor(this.timer.elapsedTime/60))} : ${this.timer.pad2(this.timer.elapsedTime%60)}</span></div>
                <table id="result"></table>
            </div>
        </div>
        `
       let totalFalseAnswers = 0
        const table = document.getElementById("result")
        let answersCheck = document.querySelectorAll(".option")
        answersCheck.forEach((answer) => {
            if (this.solutions[0].search(answer.innerText) !== -1) {
                if (this.answers[0].search(answer.innerText) !== -1) {
                    answer.className = "option b"
                } else {
                    answer.className = "option v"
                }
            } else {
                answer.className = "option f"
            }
        })
        for (let i = 0; i < 5; i++) {
            let row = document.createElement("tr")
            for (let j = 0; j < 5; j++) {
                let cell = document.createElement("td")
                cell.innerHTML = i*5+j+1
                cell.className = "cell"
                
                if( this.answers[i*5+j] != this.solutions[i*5+j]) {
                    cell.style.backgroundColor = "rgba(255, 161, 151, 0.936)"
                    totalFalseAnswers++
                } else {
                    cell.style.backgroundColor = "rgb(189, 185, 185)"
                }
                
                cell.addEventListener("click", ()=> {
                    let image = document.getElementById("image")
                    image.src = `/${this.name}/${this.name}-${i*5+j+1}.JPG`
                    let answersCheck = document.querySelectorAll(".option")

                    answersCheck.forEach((answer) => {
                        if (this.solutions[i*5+j].search(answer.innerText) !== -1) {
                            if (this.answers[i*5+j].search(answer.innerText) !== -1) {
                                answer.className = "option b"
                            } else {
                                answer.className = "option v"
                            }
                        } else {
                            answer.className = "option f"
                        }
                    })    
                })
                row.appendChild(cell)
            }
            table.appendChild(row)
        }
        document.getElementById("falses-answers").innerHTML = totalFalseAnswers
    }
}

// Chronometer class for the timer
class Chronometer {
    constructor(element) {
        this.running = true;
        this.interval = null;
        this.elapsedTime = 0;
        this.element = element;
    }
    // toggle method to start/ stop the timer
    toggle() {
        if (this.running) {
        this.stop();
        } else {
        this.start();
        }
    }
    // start method to start the timer
    start() {
        this.interval = setInterval(() => {
            this.elapsedTime++;
            let minutes = Math.floor(this.elapsedTime / 60);
            let seconds = this.elapsedTime % 60;
            this.element.textContent = `${this.pad2(minutes)}:${this.pad2(seconds)}`;
            if (this.elapsedTime >= 600) {
                this.element.style.color = 'red';
            } else if (this.elapsedTime >= 420) {
                this.element.style.color = 'orange';
            }
            if (this.elapsedTime == 420) {
                document.getElementById("sound").play()
            }
        }, 1000);
        this.running = true;
    }
    // stop method to stop the timer
    stop() {
        clearInterval(this.interval);
        this.running = false;
    }
    // reset method to reset the timer
    reset() {
        clearInterval(this.interval);
            this.elapsedTime = 0;
            this.element.textContent = '00:00';
            this.element.style.color = 'black';
            this.running = false;
            this.start()
    }
    // pad method to display pin front of minutes or seconds 
    // in case of single digit
    pad2(nb){
        return (nb < 10) ? "0" + nb : nb;
    }
}