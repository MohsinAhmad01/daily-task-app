 let containers = document.querySelectorAll('.custom-container');
let errorLabel = document.querySelector('.error-label');
let progressValue = document.querySelector('.progress-value p');
let progressBar = document.querySelector('.progress-value');
let progresslabel=document.querySelector('.paragraph')

const allgoals=JSON.parse(localStorage.getItem('allgoals')) || {
    first:{
        name:'',
        completed:false,
    },
    second:{
        name:'',
        completed:false,
    },
    third:{
        name:'',
        completed:false,
    }
};

const allQuotes=[
    'Raise the bar by completing your goals',
    'You are one step closer to your dreams',
    'just a step away, keep going!',
    'wohoo! you just completed all the goals, time for chill ',
]
let completedCount;
progresslabel.innerText=allQuotes[completedCount]
containers.forEach((container) => {
    let input = container.nextElementSibling;
   input.value=allgoals[input.id].name

   if (allgoals[input.id].completed) {
    container.classList.add('Completed');
    
   }
    // Add event listeners
    input.addEventListener('input', (e) => {
if(allgoals[input.id].completed){
    input.value=allgoals[input.id].name
return
}

        allgoals[input.id] = {
            name: input.value,
            completed: false
        };
        localStorage.setItem('allgoals', JSON.stringify(allgoals));
       })


    container.addEventListener('click', (e) => {
        if (input.value.trim() === '') {
            errorLabel.style.display = 'block';
            errorLabel.textContent = 'Please fill in the required field.';
        } else {
            container.classList.toggle('Completed');
            const inputid=container.nextElementSibling.id
            allgoals[inputid].completed= !allgoals[inputid].completed;
            // console.log(inputid)
            localStorage.setItem('allgoals', JSON.stringify(allgoals));
            errorLabel.style.display = 'none';
            
            let img = container.querySelector('img');

            if (container.classList.contains('Completed')) {
                img.style.display = 'block';
                input.style.textDecoration = 'line-through';
                input.style.fontWeight = '600';
                input.style.color = 'green';
            } else {
                img.style.display = 'none';
                input.style.textDecoration = 'none';
                input.style.fontWeight = '400';
                input.style.color = 'initial';
            }

            
            
           updateProgressBar();
        }
    });
});

function updateProgressBar() {
    let completedCount = document.querySelectorAll('.custom-container.Completed').length;
    let totalCount = containers.length;

    let progressPercentage = (completedCount / totalCount) * 100;
    progressBar.style.width = progressPercentage + '%';
    progressValue.textContent = `${completedCount}/${totalCount} Completed`;
    progresslabel.innerText=allQuotes[completedCount]

    if (completedCount === totalCount) {
        progressValue.style.fontWeight = '800';
        progressValue.style.color = '#FFD700'; 
    } else {
        progressValue.style.fontWeight = '500';
        progressValue.style.color = '#EEFFE0'; 
    }
}
updateProgressBar();
