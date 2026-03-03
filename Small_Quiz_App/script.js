document.addEventListener("DOMContentLoaded", () =>{
    const QuestionContainer = document.getElementById('question-container');
    const QuestionText = document.getElementById('question-text');
    const choiceList = document.getElementById('choices-list');
    const nextbtn = document.getElementById('next-btn');
    const resultContainer = document.getElementById('result-container');
    const Scoretext = document.getElementById('score');
    const restartbtn = document.getElementById('restart-btn');
    const startbtn = document.getElementById('start-btn');

    // all the questions are stored in the form of objects 

    const Questions =[
        {
            question:"What is the capital of France?",
            choices:["Paris", "London", "Berlin", "Madrid"],
            answer:"Paris",
        },

        {
            question:"Which planet is known as the Red Planet?",
            choices:["Venus", "Mars", "Jupiter", "Saturn"],
            answer:"Mars",
        },

        {
            question:"What is the largest mammal?",
            choices:["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
            answer:"Blue Whale",
        },

        {
            question:"What is the fastest land animal?",
            choices:["Cheetah", "Lion", "Leopard", "Gazelle"],
            answer:"Cheetah",
        },
        {
            question:"What is the hardest natural substance on Earth?",
            choices:["Gold", "Iron", "Diamond", "Platinum"],
            answer:"Diamond",
        }
    ]
    // to keep track of the current Question index
    let currentQuestionIndex = 0;
    let score = 0;
    startbtn.addEventListener('click',StartQuiz);

    function StartQuiz(){
        // first of all we need to hide the start btn 
        startbtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        QuestionContainer.classList.remove('hidden');

        renderQuestion();
    }
    function renderQuestion(){
        // make sure that nextbtn is hidden only after answering the question the nextbtn is shown
        nextbtn.classList.add('hidden');
        QuestionText.textContent = Questions[currentQuestionIndex].question;
        choiceList.innerHTML = ""; // clear the previous choices so that new choices for new question render without any errors
        Questions[currentQuestionIndex].choices.forEach(choice =>{
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click',()=>SelectAnswer(choice)); // here why we does that because we dont want that our function get called immediately when the page load so we need to wrap it in a function and then call it using call back and also if we just write function name that also works but here the function has a parameter so we will not call it without parameter and so we done calling by call back then it will not immidenatly run 
            choiceList.appendChild(li);
            
        })
    }
    function SelectAnswer(choice){
        if(choice === Questions[currentQuestionIndex].answer){
            score++;
        }
        // now we can show the nextbtn
        nextbtn.classList.remove('hidden');
    }

    nextbtn.addEventListener('click',()=>{
        currentQuestionIndex++;
        // to make sure that we dont go out of the bound of the array
        if(currentQuestionIndex < Questions.length){
            renderQuestion();
        } else {
            showResults();
        }
    })

    function showResults(){
        Scoretext.textContent = score;
        // now make sure that result container is visible
        resultContainer.classList.remove('hidden');
        // now show the restart btn 
        restartbtn.classList.remove('hidden');
        // questin container ko hide karo 
        QuestionContainer.classList.add('hidden');
        nextbtn.classList.add('hidden');

    }
    restartbtn.addEventListener('click',()=>{
        // reset the quiz
        // hide the result container and restart btn
        resultContainer.classList.add('hidden');
        restartbtn.classList.add('hidden');

        score =0;
        currentQuestionIndex = 0;
        // show the start btn again
        startbtn.classList.remove('hidden');
    })

});